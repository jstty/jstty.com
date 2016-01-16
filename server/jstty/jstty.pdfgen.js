var PdfPrinter = require('pdfmake');
var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');

module.exports = PdfGen;

var logger = null;

function PdfGen($logger){
  logger = $logger;
}

PdfGen.prototype.$init = function() {
  this._resume_template = require('./data/resume-template');
  this._printer = new PdfPrinter(this._resume_template.fonts);
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
  content.push( this.processTemplate('computer', {list: projects.computer} ) );

  //content.push(this._resume_template.line);
  content.push( this.processTemplate('education', {list: projects.education} ) );

  var dd = {
    content: content,
    styles: this._resume_template.styles,
    defaultStyle: this._resume_template.defaultStyle
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
