const pdfLib = require('pdf-parse');
const pdf = typeof pdfLib === 'function' ? pdfLib : pdfLib.default;
const fs = require('fs');
const buf = fs.readFileSync('aulas/Projeto SPODWE2.pdf');
pdf(buf).then(d => { 
  console.log(d.text);
}).catch(e => console.error(e.message));
