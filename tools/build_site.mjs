import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {marked}=require('marked');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out=path.join(root,'site');
await fs.mkdir(out,{recursive:true});
async function walk(dir){
 const found=[];
 for(const e of await fs.readdir(dir,{withFileTypes:true})){
  const p=path.join(dir,e.name);
  if(e.isDirectory())found.push(...await walk(p));
  else if(e.name.endsWith('.md'))found.push(p);
 }
 return found;
}
const files=[...await walk(path.join(root,'notes')), ...await walk(path.join(root,'assets'))];
const names=new Map(files.map(p=>[path.resolve(p),path.relative(root,p)==='README.md'?'index.html':path.relative(root,p).replaceAll(path.sep,'--').replace(/\.md$/,'.html')]));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const css=`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f5f5f3;color:#24292f;font:16px/1.85 'Malgun Gothic',sans-serif}article{max-width:960px;margin:32px auto;padding:42px 52px;background:white;border:1px solid #dce1e5;border-radius:8px;overflow-wrap:anywhere}h1{font-size:29px;line-height:1.5;letter-spacing:-.8px}h2{font-size:23px;margin-top:52px;padding-top:20px;border-top:1px solid #d8dee4;scroll-margin-top:22px}h3{font-size:20px;margin-top:30px}p{margin:16px 0}a{color:#15569a;text-underline-offset:3px}img{display:block;max-width:100%;height:auto;border:1px solid #ddd;margin-top:24px}code{font:14px/1.7 Consolas,'Malgun Gothic',monospace;background:#f0f2f4;padding:2px 4px;border-radius:4px}pre{padding:18px;background:#f4f6f8;border-radius:6px;overflow-x:auto;overflow-wrap:normal}pre code{padding:0;background:none}table{border-collapse:collapse;width:100%;font-size:15px}td,th{border:1px solid #d5dae0;padding:9px 12px;text-align:left}th{background:#f4f6f8}.table-wrap{overflow-x:auto;margin:20px 0}li{margin:6px 0}.equation{font:22px/1.6 Cambria,serif;text-align:center;padding:22px;background:#f4f6f8;overflow-x:auto}details{background:#f4f6f8;padding:10px 18px;border-radius:6px;margin:22px 0}summary{cursor:pointer}nav a{display:block;padding:3px 0;text-decoration:none}.top{font-size:13px;color:#63717b}.top a{margin-right:14px}footer{margin-top:50px;padding-top:16px;border-top:1px solid #ddd;font-size:14px}@media(max-width:700px){article{margin:0;padding:24px 18px;border:0;border-radius:0}body{font-size:15px}h1{font-size:25px}h2{font-size:21px}td,th{padding:7px}table{font-size:13px}.equation{font-size:18px;padding:14px}}`;
for(const file of files){
 let md=await fs.readFile(file,'utf8');
 md=md.replace(/\[([^\]]+)\]\((cme\d+\/\d+\/)\)/g,'$1');
 // Only the two existing attention notes contain this known display formula.
 if(['01-transformer-basics.md','01-attention-qkv.md'].includes(path.basename(file)))md=md.replace(/\$\$[\s\S]*?\$\$/g,'<div class="equation">Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>)V</div>');
 let body=marked.parse(md);
 for(const match of [...body.matchAll(/src="([^"]+)"/g)]){
  const imagePath=path.resolve(path.dirname(file),match[1]);
  await fs.access(imagePath);
  const relative=path.relative(out,imagePath).replaceAll(path.sep,'/');
  body=body.replace(match[0],`src="${relative}"`);
 }
 body=body.replace(/href="(?!https?:|#)([^"]+)"/g,(_,target)=>{
  const [base,anchor]=target.split('#');
  const resolved=path.resolve(path.dirname(file),base);
  const dest=names.get(resolved)??path.relative(out,resolved).replaceAll(path.sep,'/');
  return `href="${dest}${anchor?'#'+anchor:''}"`;
 });
 const headings=[];
 body=body.replace(/<h2>(.*?)<\/h2>/g,(_,title)=>{const id=`part-${headings.length+1}`;headings.push({id,title});return `<h2 id="${id}">${title}</h2>`;});
 body=body.replaceAll('<table>','<div class="table-wrap"><table>').replaceAll('</table>','</table></div>');
 const title=(md.match(/^# (.+)/m)||[])[1]||'학습 노트';
 const relative=path.relative(root,file).replaceAll(path.sep,'/');
 const course=relative.startsWith('notes/cme296/')?'CME 296':relative.startsWith('notes/')?'CME 295':'STANFORD STUDY NOTES';
 const isIndex=names.get(path.resolve(file))==='index.html';
 const nav=headings.map(({id,title})=>`<a href="#${id}">${title}</a>`).join('');
 const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><style>${css}</style></head><body><article><div class="top">${isIndex?'':`<a href="../index.html">전체 목차</a>`}${course}</div>${isIndex?'':`<details><summary>이 노트의 목차</summary><nav>${nav}</nav></details>`}${body}${isIndex?'':`<footer><a href="../index.html">전체 목차로 돌아가기</a></footer>`}</article></body></html>`;
 await fs.writeFile(path.join(out,names.get(path.resolve(file))),html);
}
console.log(`Built ${files.length} reading pages in site/.`);
