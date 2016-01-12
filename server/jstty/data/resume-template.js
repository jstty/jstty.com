var fs = require('fs');

var vars = {
    leftColumnWidth: 70,
    linePadding: 10,
    pageWidth: 515
};

var header = {
    text: '<%= text %>',
    style: 'header'
};

var contact = {
    width: '100%',
    table: {
        widths: [30, 5, 'auto', '*', 40, 5, 'auto'],
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
            lineWidth: 1
        }
    ],
    margin: [0, vars.linePadding]
};

var computer = {
    columns: [
        {
            // auto-sized columns have their widths based on their content
            width: vars.leftColumnWidth,
            text: 'Computer Experience',
            style: 'columnHeader'
        }
    ]
};

var styles = {
    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center'
    },
    columnHeader: {
        fontSize: 14,
        bold: true
    },
    subheader: {
        fontSize: 14,
        bold: true
    },
    quote: {
        italics: true
    },
    small: {
        fontSize: 8
    }
};

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
    projects: fs.readFileSync(__dirname+'/resume-projects.ejs', 'utf8'),
    computer: computer,
    line:     line,
    styles:   styles
};
