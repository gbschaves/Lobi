import {PDFParse} from 'pdf-parse';
import {readFileSync, writeFileSync} from 'fs';
const files = ['7','8','9','10','11','12'].map(n => `aulas/${n}-Single Page Applications com React.pdf`);
let all = '';
for (const f of files) {
  const buf = readFileSync(f);
  const r = await new PDFParse({data:buf}).getText();
  all += '\n\n===== ' + f + ' =====\n\n' + r.text;
}
writeFileSync('_pdf_aulas_react.txt', all);
console.log('done', all.length);
