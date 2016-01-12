var PdfPrinter = require('pdfmake');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var moment = require('moment');

module.exports = PdfGen;

var logger = null;

function PdfGen($logger){
  logger = $logger;
}

PdfGen.prototype.$init = function() {
  var fontsDir = path.resolve("./jstty/pdf-fonts");
  var fonts = {
    Roboto: {
      normal: fontsDir+'/Roboto-Regular.ttf',
      bold: fontsDir+'/Roboto-Medium.ttf',
      italics: fontsDir+'/Roboto-Italic.ttf',
      bolditalics: fontsDir+'/Roboto-Italic.ttf'
    }
  };

  this._resume_template = require('./data/resume-template');
  this._printer = new PdfPrinter(fonts);
};

PdfGen.prototype.processTemplate = function(templateName, data) {
  var temp = this._resume_template[templateName];
  data = data || {};

  try {
    if(_.isString(temp)) {
      temp = ejs.render(temp, _.merge(data, this._resume_template.vars));
      temp = JSON.parse( temp );
    }
    else if(_.isObject(temp)) {
      temp = ejs.render(JSON.stringify(temp), data);
      temp = JSON.parse( temp );
    } else {
      // error
      logger.error("Not String or Object:", temp);
    }

  } catch(err) {
    logger.error("processTemplate Error:", err);
  }

  return temp;
};

PdfGen.prototype.processProjects = function(projectList)
{
  var list = _.filter(projectList, {'Category': 'Industry', 'Showcase': true } );
  // sort list
  list.sort(function(a, b){
    return moment(b.StartDate, 'MM/YYYY').diff(moment(a.StartDate, 'MM/YYYY'));
  });
  _.forEach(list, function(item){
      item.Projects = _.filter(item.Projects, { 'Showcase': true } );
  });
  //

  return {list: list};
};

PdfGen.prototype.resume = function(projects)
{
  //logger.log("projects:", projects);

  var content = [];
  content.push( this.processTemplate('header', projects.header) );
  content.push( this.processTemplate('contact', projects.contact) );
  content.push( this._resume_template.line );

  content.push( this.processTemplate('projects', this.processProjects(projects.list) ) );

  //content.push(this._resume_template.line);
  //content.push(this._resume_template.computer);

  var dd = {
    content: content,
    styles: this._resume_template.styles
  };

  try {
    var pdfDoc = this._printer.createPdfKitDocument(dd);
    pdfDoc.pipe(fs.createWriteStream('test.pdf'));
    pdfDoc.end();
  } catch(err) {
    logger.error("PDF Error:", err);
  }

  return {};
};
