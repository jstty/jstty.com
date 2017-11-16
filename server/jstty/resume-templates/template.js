var fs = require('fs');

var vars = {
    leftColumnWidth: 70,
    linePadding: 5,
    pageWidth: 515
};

var header = {
    text: '<%= text %>',
    style: 'header',
    margin: [vars.leftColumnWidth+vars.linePadding, 0, 0, 0]
};

var contact = {
    width: '100%',
    table: {
        widths: [25, 1, 'auto', '*', 35, 2, 'auto'],
        body: [
            ['phone', ':', '<%= phone %>'         ,'', 'webfolio', ':', { text: '<%= webfolio %>'} ],
            ['email', ':', { text:'<%= email %>'} ,'', 'github', ':', {text: '<%= github %>'} ]
        ]
    },
    margin: [vars.leftColumnWidth+vars.linePadding, 0, 0, 0]
    ,layout: 'noBorders'
};

var line = {
    canvas: [
        {
            type: 'line',
            x1: vars.leftColumnWidth+vars.linePadding, y1: 0,
            x2: vars.pageWidth, y2: 0,
            lineWidth: 0.25
        }
    ],
    margin: [0, vars.linePadding]
};

var defaultStyle = {
    fontSize: 9,
    font: 'Roboto'
};
var styles = {
    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center'
    },
    thinTableRow: {
        "margin": [0, -1, 0, 0]
    },
    columnHeader: {
      fontSize: 12,
      bold: true
    },
    companyHeader: {
      fontSize: 11,
      bold: true
    },
    companySubHeader: {
      fontSize: 9,
      bold: false
    },
    educationHeader: {
      fontSize: 12,
      bold: true
    },
    publicationHeader: {
      fontSize: 11,
      bold: true
    },
    publicationTitle: {
      fontSize: 9,
      bold: true
    },
    patentHeader: {
      fontSize: 11,
      bold: true
    },
    patentTitle: {
      fontSize: 9,
      bold: true
    },
    quote: {
        italics: true
    },
    small: {
        fontSize: 8
    }
};

var path = require('path');
var fontsDir = path.resolve("./jstty/pdf-fonts");
var fonts = {
  Roboto: {
    normal: fontsDir+'/Roboto-Regular.ttf',
    bold: fontsDir+'/Roboto-Medium.ttf',
    italics: fontsDir+'/Roboto-Italic.ttf',
    bolditalics: fontsDir+'/Roboto-Italic.ttf'
  }
};

//defaultStyle = {
//  fontSize: 12,
//  bold: false,
//  font: 'Helvetica'
//};

/*
 [
 'font',
 'fontSize',
 'bold',
 'italics',
 'alignment',
 'color',
 'columnGap',
 'fillColor',
 'decoration',
 'decorationStyle',
 'decorationColor',
 'background',
 'lineHeight',
 'noWrap'
 //'tableCellPadding'
 // 'cellBorder',
 // 'headerCellBorder',
 // 'oddRowCellBorder',
 // 'evenRowCellBorder',
 // 'tableBorder'
 ]
 */


module.exports = {
    vars:     vars,
    header:   header,
    contact:  contact,
    projects: fs.readFileSync(__dirname+'/projects.ejs', 'utf8'),
    computer: fs.readFileSync(__dirname+'/computer.ejs', 'utf8'),
    education: fs.readFileSync(__dirname+'/education.ejs', 'utf8'),

    research:    fs.readFileSync(__dirname+'/research.ejs', 'utf8'),
    publication: fs.readFileSync(__dirname+'/publication.ejs', 'utf8'),
    patents:     fs.readFileSync(__dirname+'/patents.ejs', 'utf8'),
    teaching:    fs.readFileSync(__dirname+'/teaching.ejs', 'utf8'),

    line:     line,
    styles:   styles,
    defaultStyle: defaultStyle,
    fonts: fonts
};
