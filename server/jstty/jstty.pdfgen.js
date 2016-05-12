var PdfPrinter = require('pdfmake');
var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var Q = null;

module.exports = PdfGen;

var logger = null;

function PdfGen($logger){
  logger = $logger;
}

PdfGen.prototype.$init = function($q) {
  Q = $q;
  this._resume_template = require('./resume-templates/template.js');
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
    logger.error('processTemplate Error Temp Data:', temp);
  }

  return temp;
};

//PdfGen.prototype.processProjects = function(projectList)
//{
//  var list = _.filter(projectList, function(project) {
//    return (project.Category === 'Industry' && !project.Archive);
//  });
//  // sort list
//  list.sort(function(a, b){
//    return moment(b.StartDate, 'MM/YYYY').diff(moment(a.StartDate, 'MM/YYYY'));
//  });
//  _.forEach(list, function(item){
//      item.Projects = _.filter(item.Projects, function(project){
//        return (!project.Archive);
//      } );
//  });
//  //
//
//  return list;
//};

PdfGen.prototype.filterProjects = function(category, projectList)
{
  var list = _.filter(projectList, function(project) {
    return (project.Category === category && !project.Archive);
  });
  // sort list
  list.sort(function(a, b){
    return moment(b.StartDate, 'MM/YYYY').diff(moment(a.StartDate, 'MM/YYYY'));
  });
  _.forEach(list, function(item){
    item.Projects = _.filter(item.Projects, function(project){
      return (!project.Archive);
    } );
  });
  //

  return list;
};

PdfGen.prototype.resume = function(cv, type)
{
  return Q.promise(function(resolve, reject, notify) {

    //logger.log("cv:", cv);

    var content = [];
    content.push( this.processTemplate('header', cv.header) );
    content.push( this.processTemplate('contact', cv.contact) );

    content.push( _.cloneDeep(this._resume_template.line) );
    content.push( this.processTemplate('projects', { list: this.filterProjects('Industry', cv.projects) } ) );

    if(type === 'full') {
      // TODO
      //content.push( _.cloneDeep(this._resume_template.line) );
      //content.push( this.processTemplate('publications', { list: this.getPublications('Publications', cv.projects) } ) );

      content.push( _.cloneDeep(this._resume_template.line) );
      content.push( this.processTemplate('research', { list: this.filterProjects('Research', cv.projects) } ) );

      content.push( _.cloneDeep(this._resume_template.line) );
      content.push( this.processTemplate('teaching', { list: this.filterProjects('Teaching', cv.projects) } ) );
    }

    content.push( _.cloneDeep(this._resume_template.line) );
    content.push( this.processTemplate('computer', { list: cv.computer } ) );

    content.push( _.cloneDeep(this._resume_template.line) );
    content.push( this.processTemplate('education', { list: cv.education } ) );

    //logger.info("cv pdf json:", JSON.stringify(content));

    var dd = {
      content: content,
      styles: this._resume_template.styles,
      defaultStyle: this._resume_template.defaultStyle
    };

    try {
      var pdfDocChunks = [];
      var pdfDoc = this._printer.createPdfKitDocument(dd);

      pdfDoc.on('data', function (chunk) {
        pdfDocChunks.push(chunk);
      });

      pdfDoc.on('end', function () {
        var result = Buffer.concat(pdfDocChunks);
        resolve({data: result, filename: "jsutton_resume_"+type+".pdf" });
      });

      pdfDoc.end();
    } catch(err) {
      logger.error("PDF Error:", err);
      reject(err);
    }

  }.bind(this))
};

PdfGen.prototype.writeToFile = function(cvFile) {
  fs.writeFileSync(cvFile.filename, cvFile.data);
};
