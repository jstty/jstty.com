var PdfPrinter = require('pdfmake');
var fs = require('fs');
var path = require('path');

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

  this._printer = new PdfPrinter(fonts);
};

PdfGen.prototype.resume = function(projects)
{
  var docDefinition = {
    content: [
      'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'First column'
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Second column'
          },
          {
            // fixed width
            width: 100,
            text: 'Third column'
          },
          {
            // percentage width
            width: '10%',
            text: 'Last column'
          }
        ],
        // optional space between columns
        columnGap: 10
      },
      'This paragraph goes below all columns and has full width'
    ]
  };

  logger.log("projects:", projects);
  logger.log("docDefinition:", docDefinition);

  // download the PDF (temporarily Chrome-only)
  try {
    var pdfDoc = this._printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('test.pdf'));
    pdfDoc.end();
  } catch(err) {
    logger.error("PDF Error:", err);
  }

  return {};
};
