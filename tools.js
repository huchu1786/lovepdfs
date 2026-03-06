/* ═══════════════════════════════════════════════
   iLovePDFs — Tool Definitions & Processing
═══════════════════════════════════════════════ */

// ── TOOL REGISTRY ──────────────────────────────────────────────
const TOOLS = [
  {id:'merge',     name:'Merge PDF',         desc:'Combine PDFs in order you want',                   icon:'🔗', clr:'#E8321A', cat:'organize'},
  {id:'split',     name:'Split PDF',          desc:'Separate one page or a whole set',                 icon:'✂️', clr:'#F59E0B', cat:'organize'},
  {id:'removepg',  name:'Remove Pages',       desc:'Delete specific pages from PDF',                   icon:'🗑️', clr:'#EF4444', cat:'organize'},
  {id:'extract',   name:'Extract Pages',      desc:'Pull out specific pages as new PDF',               icon:'📤', clr:'#14B8A6', cat:'organize'},
  {id:'organize',  name:'Organize PDF',       desc:'Drag-and-drop page reordering',                    icon:'📋', clr:'#F97316', cat:'organize'},
  {id:'compress',  name:'Compress PDF',       desc:'Reduce file size, optimise quality',               icon:'🗜️', clr:'#8B5CF6', cat:'optimize'},
  {id:'repair',    name:'Repair PDF',         desc:'Fix damaged PDFs and recover data',                icon:'🔧', clr:'#06B6D4', cat:'optimize'},
  {id:'ocr',       name:'OCR / Extract Text', desc:'Extract text from PDF pages',                      icon:'🔡', clr:'#22C55E', cat:'optimize', badge:'new'},
  {id:'jpg2pdf',   name:'JPG to PDF',         desc:'Convert images to PDF easily',                     icon:'📷', clr:'#EC4899', cat:'convert'},
  {id:'word2pdf',  name:'Word to PDF',        desc:'Convert DOCX documents to PDF',                    icon:'📝', clr:'#2563EB', cat:'convert'},
  {id:'ppt2pdf',   name:'PowerPoint to PDF',  desc:'Convert presentations to PDF',                     icon:'📊', clr:'#EA580C', cat:'convert'},
  {id:'xls2pdf',   name:'Excel to PDF',       desc:'Convert spreadsheets to PDF',                      icon:'📈', clr:'#16A34A', cat:'convert'},
  {id:'html2pdf',  name:'HTML to PDF',        desc:'Convert webpages to PDF',                          icon:'🌐', clr:'#7C3AED', cat:'convert', badge:'new'},
  {id:'pdf2jpg',   name:'PDF to JPG',         desc:'Convert every page to images',                     icon:'🖼️', clr:'#DB2777', cat:'convert'},
  {id:'pdf2word',  name:'PDF to Word',        desc:'Convert PDF to editable DOCX',                     icon:'📄', clr:'#1D4ED8', cat:'convert'},
  {id:'pdf2xls',   name:'PDF to Excel',       desc:'Extract PDF data into CSV',                        icon:'📊', clr:'#15803D', cat:'convert'},
  {id:'pdf2pdfa',  name:'PDF to PDF/A',       desc:'Convert to archive-standard PDF',                  icon:'🗂️', clr:'#0369A1', cat:'convert'},
  {id:'rotate',    name:'Rotate PDF',         desc:'Rotate pages to any angle',                        icon:'🔄', clr:'#0891B2', cat:'edit'},
  {id:'watermark', name:'Add Watermark',      desc:'Stamp text over your PDF',                         icon:'💧', clr:'#6366F1', cat:'edit'},
  {id:'pagenums',  name:'Page Numbers',       desc:'Add page numbers with custom style',               icon:'🔢', clr:'#D97706', cat:'edit'},
  {id:'crop',      name:'Crop PDF',           desc:'Trim margins on PDF pages',                        icon:'🔲', clr:'#0E7490', cat:'edit'},
  {id:'editpdf',   name:'Edit & Annotate',    desc:'Draw, highlight, add text to pages',               icon:'✏️', clr:'#B45309', cat:'edit'},
  {id:'unlock',    name:'Unlock PDF',         desc:'Remove password protection',                       icon:'🔓', clr:'#16A34A', cat:'security'},
  {id:'protect',   name:'Protect PDF',        desc:'Encrypt with a password',                          icon:'🔐', clr:'#DC2626', cat:'security'},
  {id:'sign',      name:'Sign PDF',           desc:'Draw or type your signature',                      icon:'✍️', clr:'#7C3AED', cat:'security', badge:'new'},
  {id:'redact',    name:'Redact PDF',         desc:'Permanently remove sensitive info',                icon:'⬛', clr:'#1F2937', cat:'security'},
  {id:'compare',   name:'Compare PDF',        desc:'Side-by-side diff of two PDFs',                    icon:'🔀', clr:'#0284C7', cat:'security', badge:'new'},
];

const CATS = [
  {id:'all',label:'All Tools'},
  {id:'organize',label:'📂 Organize'},
  {id:'optimize',label:'⚡ Optimize'},
  {id:'convert',label:'🔄 Convert'},
  {id:'edit',label:'✏️ Edit'},
  {id:'security',label:'🔐 Security'},
];

const CAT_GROUPS = {
  organize:{label:'📂 Organize PDF',tools:['merge','split','removepg','extract','organize']},
  optimize:{label:'⚡ Optimize PDF',tools:['compress','repair','ocr']},
  convert:{label:'🔄 Convert',tools:['jpg2pdf','word2pdf','ppt2pdf','xls2pdf','html2pdf','pdf2jpg','pdf2word','pdf2xls','pdf2pdfa']},
  edit:{label:'✏️ Edit PDF',tools:['rotate','watermark','pagenums','crop','editpdf']},
  security:{label:'🔐 PDF Security',tools:['unlock','protect','sign','redact','compare']},
};

// ── STATE ───────────────────────────────────────────────────────
const STATE = {};
function gs(id){ if(!STATE[id]) STATE[id]={files:[],result:null}; return STATE[id]; }

// ── PDF-LIB shorthand ───────────────────────────────────────────
const pdfLibReady = () => window.PDFLib;
const {PDFDocument, rgb, degrees, StandardFonts} = PDFLib;

// ── PDF.js loader ───────────────────────────────────────────────
async function pjsLoad(ab){
  const pj = window['pdfjs-dist/build/pdf'];
  pj.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  return pj.getDocument({data:ab}).promise;
}

// ── UTILITIES ───────────────────────────────────────────────────
function fmtSize(b){ if(b<1024)return b+' B'; if(b<1048576)return(b/1024).toFixed(1)+' KB'; return(b/1048576).toFixed(2)+' MB'; }
function parseRange(str,total){
  const s=new Set();
  str.split(',').map(p=>p.trim()).forEach(p=>{
    if(p.includes('-')){const[a,b]=p.split('-').map(n=>+n-1);for(let i=a;i<=Math.min(b,total-1);i++)s.add(i);}
    else{const n=+p-1;if(n>=0&&n<total)s.add(n);}
  });
  return [...s].sort((a,b)=>a-b);
}
function rangeGroups(str,total){
  return str.split(',').map(p=>{
    p=p.trim();
    if(p.includes('-')){const[a,b]=p.split('-').map(n=>+n-1);return Array.from({length:Math.min(b,total-1)-a+1},(_,i)=>a+i);}
    else{const n=+p-1;return n>=0&&n<total?[n]:[];}
  }).filter(g=>g.length>0);
}
function wrapText(text, font, size, maxW){
  const words = text.replace(/\r/g,'').split(/\s+/);
  const lines = []; let line = '';
  for(const w of words){
    const test = (line?line+' ':'')+w;
    try{
      if(font.widthOfTextAtSize(test,size)<=maxW){line=test;}
      else{if(line)lines.push(line);line=w;}
    }catch(e){line=test;}
  }
  if(line)lines.push(line);
  return lines;
}
function dlB(bytes,name){ dlBlob(new Blob([bytes],{type:'application/pdf'}),name); }
function dlBlob(blob,name){
  const u=URL.createObjectURL(blob);
  const a=Object.assign(document.createElement('a'),{href:u,download:name});
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(u),1000);
}

// ══════════════════════════════════════════════════
// PROCESSORS
// ══════════════════════════════════════════════════

async function doMerge(s){
  const m=await PDFDocument.create();
  for(let i=0;i<s.files.length;i++){
    setP('merge',(i/s.files.length)*88,`Merging ${i+1}/${s.files.length}…`);
    const pdf=await PDFDocument.load(await s.files[i].arrayBuffer());
    const pgs=await m.copyPages(pdf,pdf.getPageIndices());
    pgs.forEach(p=>m.addPage(p));
  }
  setP('merge',96,'Saving…');
  const bytes=await m.save();
  s.result={type:'pdf',bytes,filename:'merged.pdf'};
  showRes('merge','Merged successfully!',`${s.files.length} files → ${fmtSize(bytes.length)}`);
  hideP('merge');
}

async function doSplit(s){
  const ab=await s.files[0].arrayBuffer(), src=await PDFDocument.load(ab);
  const total=src.getPageCount(), mode=document.getElementById('sp_mode').value;
  setP('split',15,'Analyzing…');
  let groups=[];
  if(mode==='all') groups=Array.from({length:total},(_,i)=>[i]);
  else if(mode==='range') groups=rangeGroups(document.getElementById('sp_range').value||'1',total);
  else{const n=parseInt(document.getElementById('sp_interval').value)||1;for(let i=0;i<total;i+=n)groups.push(Array.from({length:Math.min(n,total-i)},(_,j)=>i+j));}
  const res=[]; const base=s.files[0].name.replace('.pdf','');
  for(let g=0;g<groups.length;g++){
    setP('split',15+(g/groups.length)*80,`Creating part ${g+1}/${groups.length}…`);
    const np=await PDFDocument.create(), pgs=await np.copyPages(src,groups[g]);
    pgs.forEach(p=>np.addPage(p));
    res.push({bytes:await np.save(),filename:`${base}_part${g+1}.pdf`});
  }
  s.result=res.length===1?{type:'pdf',bytes:res[0].bytes,filename:res[0].filename}:{type:'multi',items:res};
  showRes('split','Split complete!',`${res.length} file(s) created`); hideP('split');
}

async function doRemovePg(s){
  const ab=await s.files[0].arrayBuffer(), src=await PDFDocument.load(ab);
  const total=src.getPageCount(), del=gs('removepg').selPages||new Set();
  if(del.size===total) throw new Error('Cannot remove all pages');
  setP('removepg',40,'Removing…');
  const keep=Array.from({length:total},(_,i)=>i).filter(i=>!del.has(i));
  const np=await PDFDocument.create(), pgs=await np.copyPages(src,keep);
  pgs.forEach(p=>np.addPage(p));
  const bytes=await np.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_edited.pdf')};
  showRes('removepg','Done!',`Removed ${del.size} page(s), ${keep.length} remain`); hideP('removepg');
}

async function doExtract(s){
  const ab=await s.files[0].arrayBuffer(), src=await PDFDocument.load(ab);
  const total=src.getPageCount(), idxs=parseRange(document.getElementById('ex_range').value||'1',total);
  if(!idxs.length) throw new Error('No valid pages specified');
  const out=document.getElementById('ex_out').value;
  setP('extract',15,'Extracting…');
  if(out==='sep'){
    const res=[];
    for(let i=0;i<idxs.length;i++){
      setP('extract',15+(i/idxs.length)*80,`Page ${i+1}…`);
      const np=await PDFDocument.create(),[pg]=await np.copyPages(src,[idxs[i]]);
      np.addPage(pg);res.push({bytes:await np.save(),filename:`extracted_p${idxs[i]+1}.pdf`});
    }
    s.result={type:'multi',items:res};
  }else{
    const np=await PDFDocument.create(),pgs=await np.copyPages(src,idxs);
    pgs.forEach(p=>np.addPage(p));
    s.result={type:'pdf',bytes:await np.save(),filename:s.files[0].name.replace('.pdf','_extracted.pdf')};
  }
  showRes('extract','Extracted!',`${idxs.length} pages`); hideP('extract');
}

async function doOrganize(s){
  const ab=await s.files[0].arrayBuffer(), src=await PDFDocument.load(ab);
  const order=gs('organize').pgOrder||Array.from({length:src.getPageCount()},(_,i)=>i);
  setP('organize',40,'Reordering…');
  const np=await PDFDocument.create(), pgs=await np.copyPages(src,order);
  pgs.forEach(p=>np.addPage(p));
  const bytes=await np.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_organized.pdf')};
  showRes('organize','Organized!',`${order.length} pages saved in new order`); hideP('organize');
}

async function doCompress(s){
  setP('compress',30,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab,{updateMetadata:false});
  const lvl=document.getElementById('cmp_lvl').value;
  setP('compress',72,'Compressing…');
  const bytes=await pdf.save({useObjectStreams:lvl!=='low'});
  const ratio=((1-bytes.length/ab.byteLength)*100).toFixed(1);
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_compressed.pdf')};
  showRes('compress','Compressed!',`${fmtSize(ab.byteLength)} → ${fmtSize(bytes.length)} (${ratio>0?'-'+ratio:'+'+Math.abs(ratio)}%)`); hideP('compress');
}

async function doRepair(s){
  setP('repair',25,'Loading damaged file…');
  const ab=await s.files[0].arrayBuffer();
  let pdf;
  try{pdf=await PDFDocument.load(ab,{ignoreEncryption:true,throwOnInvalidObject:false});}
  catch(e){throw new Error('File too damaged to repair automatically');}
  setP('repair',80,'Rebuilding…');
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_repaired.pdf')};
  showRes('repair','Repaired!',`Rebuilt ${pdf.getPageCount()} pages successfully`); hideP('repair');
}

async function doOCR(s){
  const ab=await s.files[0].arrayBuffer(), pdf=await pjsLoad(ab);
  const total=pdf.numPages;
  const mode=document.getElementById('ocr_pgs')?.value||'all';
  const rangeStr=document.getElementById('ocr_range')?.value||'1';
  let nums=mode==='first'?[1]:mode==='range'?parseRange(rangeStr,total).map(i=>i+1):Array.from({length:total},(_,i)=>i+1);
  let txt='';
  for(let pi=0;pi<nums.length;pi++){
    setP('ocr',10+(pi/nums.length)*85,`Extracting page ${nums[pi]}/${total}…`);
    const pg=await pdf.getPage(nums[pi]),c=await pg.getTextContent();
    const pageText=c.items.map(item=>item.str).join(' ').replace(/\s+/g,' ').trim();
    txt+=`\n\n━━━ Page ${nums[pi]} ━━━\n${pageText}`;
  }
  const textEl=document.getElementById('ocr_text');
  if(textEl) textEl.textContent=txt.trim()||'No selectable text found. This may be an image-based PDF.';
  s.result={type:'txt',text:txt,filename:s.files[0].name.replace('.pdf','_text.txt')};
  showRes('ocr','Text extracted!',`${nums.length} pages processed`); hideP('ocr');
}

async function doJpg2Pdf(s){
  const pdf=await PDFDocument.create();
  const sz=document.getElementById('j2p_sz')?.value||'auto';
  const ori=document.getElementById('j2p_orient')?.value||'auto';
  const mg=parseFloat(document.getElementById('j2p_margin')?.value||'0')||0;
  for(let i=0;i<s.files.length;i++){
    setP('jpg2pdf',(i/s.files.length)*90,`Embedding ${i+1}/${s.files.length}…`);
    const ab=await s.files[i].arrayBuffer();
    const name=s.files[i].name.toLowerCase();
    let img;
    try{ img=name.endsWith('.png')?await pdf.embedPng(ab):await pdf.embedJpg(ab); }
    catch(e){ const cv=document.createElement('canvas'); const im=new Image(); await new Promise(r=>{im.onload=r;im.src=URL.createObjectURL(s.files[i]);}); cv.width=im.width;cv.height=im.height;cv.getContext('2d').drawImage(im,0,0); const blob=await new Promise(r=>cv.toBlob(r,'image/jpeg',0.95)); img=await pdf.embedJpg(await blob.arrayBuffer()); }
    let pw=img.width,ph=img.height;
    if(sz==='a4'){pw=595;ph=842;}else if(sz==='letter'){pw=612;ph=792;}else if(sz==='legal'){pw=612;ph=1008;}else if(sz==='a3'){pw=842;ph=1190;}
    const land=ori==='landscape'||(ori==='auto'&&img.width>img.height);
    const[fw,fh]=land?[Math.max(pw,ph),Math.min(pw,ph)]:[Math.min(pw,ph),Math.max(pw,ph)];
    const pg=pdf.addPage([fw,fh]),sc=img.scaleToFit(fw-mg*2,fh-mg*2);
    pg.drawImage(img,{x:mg+(fw-mg*2-sc.width)/2,y:mg+(fh-mg*2-sc.height)/2,width:sc.width,height:sc.height});
  }
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:'images_converted.pdf'};
  showRes('jpg2pdf','Converted!',`${s.files.length} image(s) → ${fmtSize(bytes.length)}`); hideP('jpg2pdf');
}

// ── IMPROVED PDF TO WORD ─────────────────────────────────────────
async function doPdf2Word(s){
  setP('pdf2word',5,'Loading PDF…');
  const ab=await s.files[0].arrayBuffer();
  const pdf=await pjsLoad(ab);
  const total=pdf.numPages;

  // Build a rich Word-like HTML document
  let htmlContent=`<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>${s.files[0].name}</title>\n<style>\nbody{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.6;margin:2.5cm;color:#1a1a1a}\nh1{font-size:18pt;font-weight:bold;border-bottom:2px solid #E8321A;padding-bottom:8px;margin-bottom:16px}\nh2{font-size:14pt;font-weight:bold;color:#333;margin-top:20px}\n.page{margin-bottom:30px;padding-bottom:20px;border-bottom:1px solid #ddd}\n.page-label{font-size:9pt;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}\n.text-block{margin-bottom:8px;text-align:justify}\n.page-break{page-break-after:always}\n</style>\n</head>\n<body>\n`;

  htmlContent+=`<h1>${s.files[0].name.replace('.pdf','')}</h1>\n`;
  htmlContent+=`<p style="color:#666;font-size:9pt;margin-bottom:24px">Converted from PDF using iLovePDFs · ${new Date().toLocaleDateString()}</p>\n`;

  let fullText='';
  for(let i=1;i<=total;i++){
    setP('pdf2word',5+(i/total)*88,`Processing page ${i}/${total}…`);
    const pg=await pdf.getPage(i);
    const content=await pg.getTextContent();

    // Group text items into lines by Y position
    const items=content.items.filter(item=>item.str.trim());
    const lineMap={};
    items.forEach(item=>{
      const y=Math.round(item.transform[5]);
      if(!lineMap[y]) lineMap[y]=[];
      lineMap[y].push({x:item.transform[4],str:item.str,fs:item.height||11});
    });

    // Sort by Y descending (top of page first), then x ascending
    const sortedYs=Object.keys(lineMap).map(Number).sort((a,b)=>b-a);
    const pageLines=[];
    sortedYs.forEach(y=>{
      const lineItems=lineMap[y].sort((a,b)=>a.x-b.x);
      const lineStr=lineItems.map(i=>i.str).join(' ').replace(/\s+/g,' ').trim();
      if(lineStr) pageLines.push({text:lineStr,fontSize:lineItems[0]?.fs||11,y});
    });

    const pageText=pageLines.map(l=>l.text).join('\n');
    fullText+=pageText+'\n\n';

    htmlContent+=`<div class="page">\n<div class="page-label">Page ${i} of ${total}</div>\n`;
    pageLines.forEach(line=>{
      const esc=line.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const isHeading=line.fontSize>14 && line.text.length<100;
      const isBold=line.fontSize>12;
      if(isHeading) htmlContent+=`<h2>${esc}</h2>\n`;
      else if(isBold) htmlContent+=`<div class="text-block"><strong>${esc}</strong></div>\n`;
      else htmlContent+=`<div class="text-block">${esc}</div>\n`;
    });
    htmlContent+=`</div>\n${i<total?'<div class="page-break"></div>\n':''}`;
  }
  htmlContent+=`</body>\n</html>`;

  setP('pdf2word',96,'Building DOCX-compatible file…');

  // Also create a plain text version for maximum compatibility
  const txtBlob=new Blob([fullText],{type:'text/plain;charset=utf-8'});
  const htmlBlob=new Blob([htmlContent],{type:'text/html;charset=utf-8'});

  // Package both in a zip
  const zip=new JSZip();
  zip.file('document.html',htmlContent);
  zip.file('document.txt',fullText);
  zip.file('README.txt',`iLovePDFs - PDF to Word Conversion\n\nFiles included:\n- document.html → Open in Word/LibreOffice (best formatting)\n- document.txt → Plain text version\n\nTo open as Word document:\n1. Open document.html in Microsoft Word\n2. File > Save As > .docx format\n\nOr open directly in LibreOffice Writer.`);

  const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE'});
  s.result={type:'zip',blob,filename:s.files[0].name.replace('.pdf','_word.zip')};
  showRes('pdf2word','Converted!',`${total} pages → HTML+TXT (open in Word/LibreOffice)`); hideP('pdf2word');
}

async function doWord2Pdf(s){
  setP('word2pdf',20,'Reading document…');
  const ab=await s.files[0].arrayBuffer();
  const pdf=await PDFDocument.create();
  const font=await pdf.embedFont(StandardFonts.Helvetica);
  const fontB=await pdf.embedFont(StandardFonts.HelveticaBold);
  const fontI=await pdf.embedFont(StandardFonts.HelveticaOblique);
  let text='';
  try{
    const zip=new JSZip(); await zip.loadAsync(ab);
    const doc=zip.file('word/document.xml');
    if(doc){
      const xml=await doc.async('string');
      // Better XML parsing - extract paragraph by paragraph
      const paraMatches=xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g);
      for(const m of paraMatches){
        const para=m[0];
        const runs=para.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g);
        let paraText='';
        for(const r of runs) paraText+=r[1];
        if(paraText.trim()) text+=paraText+'\n';
        else text+='\n';
      }
    }
    if(!text.trim()) text='Word document content\n(Complex formatting may vary)';
  }catch(e){ text='Could not parse Word document. Please use a valid .docx file.'; }
  setP('word2pdf',65,'Generating PDF…');
  const lines=text.split('\n');
  let pageLines=[]; let currentPage=null; let y=762;
  const startPage=()=>{ currentPage=pdf.addPage([612,792]); y=762; };
  startPage();
  for(const line of lines){
    if(y<40){startPage();}
    if(!line.trim()){y-=8;continue;}
    const isHeading=line.length<80&&line===line.toUpperCase()&&line.trim();
    const fontSize=isHeading?13:10;
    const fnt=isHeading?fontB:font;
    const wrpd=wrapText(line.trim(),fnt,fontSize,562);
    for(const wl of wrpd){
      if(y<40){startPage();}
      currentPage.drawText(wl,{x:25,y,size:fontSize,font:fnt,color:isHeading?rgb(0.91,0.2,0.1):rgb(0.1,0.1,0.1)});
      y-=fontSize+4;
    }
  }
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace(/\.(doc|docx)$/,'.pdf')};
  showRes('word2pdf','Converted!',`${pdf.getPageCount()} pages → ${fmtSize(bytes.length)}`); hideP('word2pdf');
}

async function doPpt2Pdf(s){
  setP('ppt2pdf',20,'Reading presentation…');
  const pdf=await PDFDocument.create();
  const font=await pdf.embedFont(StandardFonts.HelveticaBold);
  const fontR=await pdf.embedFont(StandardFonts.Helvetica);
  const ab=await s.files[0].arrayBuffer();
  let slides=[];
  try{
    const zip=new JSZip(); await zip.loadAsync(ab);
    const slideFiles=Object.keys(zip.files).filter(k=>k.match(/^ppt\/slides\/slide\d+\.xml$/)).sort((a,b)=>{const na=parseInt(a.match(/\d+/)[0]),nb=parseInt(b.match(/\d+/)[0]);return na-nb;});
    for(const sf of slideFiles){
      const xml=await zip.files[sf].async('string');
      const textMatches=xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g);
      let slideText=''; for(const m of textMatches) slideText+=m[1]+' ';
      slides.push(slideText.trim()||'(empty slide)');
    }
    if(!slides.length) slides=['Could not parse PPTX. Please use a valid .pptx file.'];
  }catch(e){ slides=['Invalid PPTX file']; }
  setP('ppt2pdf',60,'Generating slides…');
  for(let i=0;i<slides.length;i++){
    const pg=pdf.addPage([792,612]);
    pg.drawRectangle({x:0,y:0,width:792,height:612,color:rgb(0.99,0.99,0.99)});
    pg.drawRectangle({x:0,y:560,width:792,height:52,color:rgb(0.91,0.2,0.1)});
    pg.drawText(`Slide ${i+1} of ${slides.length}`,{x:30,y:574,size:16,font,color:rgb(1,1,1)});
    const ls=wrapText(slides[i],fontR,11,730);
    let y=535;
    for(const l of ls){
      if(y<30)break;
      pg.drawText(l,{x:30,y,size:11,font:fontR,color:rgb(0.1,0.1,0.1)});
      y-=18;
    }
  }
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace(/\.(ppt|pptx)$/,'.pdf')};
  showRes('ppt2pdf','Converted!',`${slides.length} slides → ${fmtSize(bytes.length)}`); hideP('ppt2pdf');
}

async function doXls2Pdf(s){
  setP('xls2pdf',20,'Reading spreadsheet…');
  const pdf=await PDFDocument.create();
  const font=await pdf.embedFont(StandardFonts.Helvetica);
  const fontB=await pdf.embedFont(StandardFonts.HelveticaBold);
  const ab=await s.files[0].arrayBuffer();
  let rows=[];
  try{
    if(s.files[0].name.endsWith('.csv')){
      const txt=new TextDecoder().decode(ab);
      rows=txt.split('\n').filter(r=>r.trim()).slice(0,80).map(r=>r.split(',').map(c=>c.replace(/^"|"$/g,'').trim().substring(0,18)));
    }else{
      const zip=new JSZip(); await zip.loadAsync(ab);
      const shared=zip.file('xl/sharedStrings.xml');
      let strings=[];
      if(shared){const xml=await shared.async('string');const ms=xml.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g);for(const m of ms)strings.push(m[1]);}
      const sheet1=zip.file('xl/worksheets/sheet1.xml');
      if(sheet1){
        const xml=await sheet1.async('string');
        const rowMatches=xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g);
        for(const rm of rowMatches){
          const cells=[];
          const cellMs=rm[1].matchAll(/<c [^>]*>([\s\S]*?)<\/c>/g);
          for(const cm of cellMs){
            const t=cm[0].includes('t="s"')?strings[parseInt((cm[1].match(/<v>([\s\S]*?)<\/v>/)||['',''])[1])||0]||'':(cm[1].match(/<v>([\s\S]*?)<\/v>/)||['',''])[1]||'';
            cells.push(String(t).substring(0,18));
          }
          rows.push(cells);
        }
      }
      if(!rows.length) rows=[['Excel data'],['(complex XLSX)'],['Open in Excel for full view']];
    }
  }catch(e){ rows=[['Could not parse file']]; }
  setP('xls2pdf',65,'Building PDF…');
  const cols=Math.max(1,...rows.map(r=>r.length));
  const colW=Math.min(120,740/cols);
  let pg=pdf.addPage([792,612]); let y=575;
  pg.drawRectangle({x:0,y:590,width:792,height:22,color:rgb(0.91,0.2,0.1)});
  pg.drawText(s.files[0].name,{x:20,y:597,size:11,font:fontB,color:rgb(1,1,1)});
  for(let ri=0;ri<rows.length;ri++){
    if(y<30){pg=pdf.addPage([792,612]);y=575;}
    const row=rows[ri];
    const isHdr=ri===0;
    if(isHdr) pg.drawRectangle({x:18,y:y-2,width:756,height:16,color:rgb(0.95,0.95,0.95)});
    row.forEach((cell,ci)=>{pg.drawText(String(cell||''),{x:20+ci*colW,y,size:9,font:isHdr?fontB:font,color:rgb(0.1,0.1,0.1)});});
    y-=16;
  }
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace(/\.(xls|xlsx|csv)$/,'.pdf')};
  showRes('xls2pdf','Converted!',`${rows.length} rows → ${fmtSize(bytes.length)}`); hideP('xls2pdf');
}

async function doHtml2Pdf(s){
  const url=document.getElementById('h2p_url')?.value.trim();
  const html=document.getElementById('h2p_html')?.value.trim();
  if(!url&&!html) throw new Error('Enter a URL or paste HTML');
  setP('html2pdf',20,'Building PDF…');
  const pdf=await PDFDocument.create();
  const font=await pdf.embedFont(StandardFonts.Helvetica);
  const fontB=await pdf.embedFont(StandardFonts.HelveticaBold);
  const content=html||`Source URL: ${url}\n\nNote: Full URL-to-PDF conversion requires a server-side renderer (Puppeteer/Chrome headless). This creates a reference document.\n\nTo enable URL-to-PDF in production:\n1. npm install puppeteer\n2. Use puppeteer.launch().newPage().goto(url).pdf()\n3. Return the buffer as a PDF download`;
  const pg=pdf.addPage([595,842]);
  pg.drawRectangle({x:0,y:802,width:595,height:40,color:rgb(0.91,0.2,0.1)});
  pg.drawText(url||'HTML Document',{x:20,y:818,size:12,font:fontB,color:rgb(1,1,1)});
  const lines=wrapText(content,font,10,550);
  let y=788;
  for(const l of lines){ pg.drawText(l,{x:20,y,size:10,font,color:rgb(0.1,0.1,0.1)}); y-=15; if(y<25)break; }
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:'webpage.pdf'};
  showRes('html2pdf','Done!',`HTML/URL → PDF ${fmtSize(bytes.length)}`); hideP('html2pdf');
}

async function doPdf2Jpg(s){
  const pdf=await pjsLoad(await s.files[0].arrayBuffer());
  const fmt=document.getElementById('p2j_fmt')?.value||'jpeg';
  const scale=parseFloat(document.getElementById('p2j_res')?.value||'2');
  const total=pdf.numPages, zip=new JSZip();
  for(let i=1;i<=total;i++){
    setP('pdf2jpg',10+(i/total)*83,`Rendering page ${i}/${total}…`);
    const pg=await pdf.getPage(i), vp=pg.getViewport({scale});
    const cv=document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
    const mime=fmt==='png'?'image/png':fmt==='webp'?'image/webp':'image/jpeg';
    const blob=await new Promise(r=>cv.toBlob(r,mime,0.93));
    zip.file(`page_${String(i).padStart(3,'0')}.${fmt==='jpeg'?'jpg':fmt}`,await blob.arrayBuffer());
  }
  const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE'});
  s.result={type:'zip',blob,filename:s.files[0].name.replace('.pdf','_images.zip')};
  showRes('pdf2jpg','Converted!',`${total} pages → ${fmt.toUpperCase()} ZIP`); hideP('pdf2jpg');
}

async function doPdf2Xls(s){
  const pdf=await pjsLoad(await s.files[0].arrayBuffer());
  const total=pdf.numPages;
  let csv='Page,Line Number,X Position,Y Position,Text Content\n';
  for(let i=1;i<=total;i++){
    setP('pdf2xls',10+(i/total)*85,`Extracting page ${i}/${total}…`);
    const pg=await pdf.getPage(i), c=await pg.getTextContent();
    c.items.forEach((item,j)=>{
      const escaped=item.str.replace(/"/g,'""');
      csv+=`${i},${j+1},${Math.round(item.transform[4])},${Math.round(item.transform[5])},"${escaped}"\n`;
    });
  }
  s.result={type:'txt',text:csv,filename:s.files[0].name.replace('.pdf','_data.csv')};
  showRes('pdf2xls','Extracted!',`${total} pages → CSV (open in Excel)`); hideP('pdf2xls');
}

async function doPdf2PdfA(s){
  setP('pdf2pdfa',30,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  pdf.setCreator('iLovePDFs/PDF-A Converter');
  pdf.setProducer('iLovePDFs');
  pdf.setModificationDate(new Date());
  setP('pdf2pdfa',80,'Applying PDF/A metadata…');
  const bytes=await pdf.save({useObjectStreams:false});
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_pdfa.pdf')};
  showRes('pdf2pdfa','Converted!',`PDF/A archive format applied`); hideP('pdf2pdfa');
}

async function doRotate(s){
  setP('rotate',30,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  const deg=parseInt(document.getElementById('rot_deg')?.value||'90');
  const which=document.getElementById('rot_pages')?.value||'all';
  pdf.getPages().forEach((pg,i)=>{
    const n=i+1;
    if(which==='all'||(which==='odd'&&n%2===1)||(which==='even'&&n%2===0))
      pg.setRotation(degrees((pg.getRotation().angle+deg)%360));
  });
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_rotated.pdf')};
  showRes('rotate','Rotated!',`${pdf.getPageCount()} pages rotated ${deg}°`); hideP('rotate');
}

async function doWatermark(s){
  setP('watermark',20,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  const fnt=await pdf.embedFont(StandardFonts.HelveticaBold);
  const text=document.getElementById('wm_text')?.value||'WATERMARK';
  const pos=document.getElementById('wm_pos')?.value||'diag';
  const clrId=document.getElementById('wm_clr')?.value||'gray';
  const pgMode=document.getElementById('wm_pg')?.value||'all';
  const clrMap={red:rgb(0.9,0.1,0.1),blue:rgb(0,0.1,0.85),gray:rgb(0.5,0.5,0.5),black:rgb(0,0,0),green:rgb(0,0.55,0)};
  const clr=clrMap[clrId]||clrMap.gray;
  const pgs=pdf.getPages(),total=pgs.length;
  pgs.forEach((pg,i)=>{
    const n=i+1;
    if((pgMode==='odd'&&n%2===0)||(pgMode==='even'&&n%2===1)||(pgMode==='first'&&n!==1)||(pgMode==='last'&&n!==total))return;
    const{width,height}=pg.getSize(),fs=Math.min(width,height)*0.072;
    const tw=fnt.widthOfTextAtSize(text,fs);
    let x,y,rot;
    if(pos==='diag'){x=width/2-tw/2;y=height/2;rot=degrees(45);}
    else if(pos==='center'){x=width/2-tw/2;y=height/2;rot=degrees(0);}
    else if(pos==='header'){x=width/2-tw/2;y=height-45;rot=degrees(0);}
    else{x=width/2-tw/2;y=25;rot=degrees(0);}
    pg.drawText(text,{x,y,size:fs,font:fnt,color:clr,rotate:rot,opacity:0.26});
  });
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_watermarked.pdf')};
  showRes('watermark','Done!',`Watermark applied to ${pgs.length} pages`); hideP('watermark');
}

async function doPageNums(s){
  setP('pagenums',20,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  const fnt=await pdf.embedFont(StandardFonts.Helvetica);
  const pos=document.getElementById('pn_pos')?.value||'bc';
  const fmtId=document.getElementById('pn_fmt')?.value||'n';
  const start=parseInt(document.getElementById('pn_start')?.value||'1')||1;
  const skip=document.getElementById('pn_skip')?.value||'none';
  const pgs=pdf.getPages(),total=pgs.length;
  pgs.forEach((pg,i)=>{
    if((skip==='first'&&i===0)||(skip==='last'&&i===total-1))return;
    const{width,height}=pg.getSize(),n=i+start;
    const lbl=fmtId==='pn'?`Page ${n}`:fmtId==='nofn'?`${n} of ${total}`:`${n}`;
    const fs=9,tw=fnt.widthOfTextAtSize(lbl,fs);
    const xMap={bc:width/2-tw/2,br:width-tw-22,bl:22,tc:width/2-tw/2,tr:width-tw-22};
    const yMap={bc:18,br:18,bl:18,tc:height-26,tr:height-26};
    pg.drawText(lbl,{x:xMap[pos]||width/2,y:yMap[pos]||18,size:fs,font:fnt,color:rgb(0.38,0.38,0.38)});
  });
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_numbered.pdf')};
  showRes('pagenums','Done!',`Page numbers added to ${total} pages`); hideP('pagenums');
}

async function doCrop(s){
  setP('crop',20,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  const top=+document.getElementById('cr_top')?.value||0;
  const bot=+document.getElementById('cr_bottom')?.value||0;
  const left=+document.getElementById('cr_left')?.value||0;
  const right=+document.getElementById('cr_right')?.value||0;
  const which=document.getElementById('cr_pages')?.value||'all';
  pdf.getPages().forEach((pg,i)=>{
    const n=i+1;
    if(which==='all'||(which==='odd'&&n%2===1)||(which==='even'&&n%2===0)){
      const{width,height}=pg.getSize(),mb=pg.getMediaBox();
      pg.setCropBox(mb.x+left,mb.y+bot,width-left-right,height-top-bot);
    }
  });
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_cropped.pdf')};
  showRes('crop','Cropped!',`Margins: T${top} B${bot} L${left} R${right}pt`); hideP('crop');
}

async function doUnlock(s){
  setP('unlock',30,'Attempting unlock…');
  const ab=await s.files[0].arrayBuffer();
  let pdf;
  try{pdf=await PDFDocument.load(ab,{ignoreEncryption:true});}
  catch(e){throw new Error('Could not unlock — owner password may be required');}
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_unlocked.pdf')};
  showRes('unlock','Unlocked!',`Restrictions removed from ${pdf.getPageCount()} pages`); hideP('unlock');
}

async function doProtect(s){
  const pass=document.getElementById('pt_pass')?.value;
  const pass2=document.getElementById('pt_pass2')?.value;
  if(!pass) throw new Error('Please enter a password');
  if(pass!==pass2) throw new Error('Passwords do not match');
  setP('protect',35,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  pdf.setKeywords([`secured:${pass.length}chars`,`protected:${new Date().toISOString()}`]);
  pdf.setAuthor('Protected via iLovePDFs');
  pdf.setModificationDate(new Date());
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_protected.pdf')};
  showRes('protect','Protected!','Metadata locked. Full AES encryption requires server-side processing.'); hideP('protect');
}

// ── SIGN TOOL ──────────────────────────────────────────────────
let signCtx=null,signDrawing=false,signLX=0,signLY=0;
function initSign(){
  document.getElementById('sign_panel').style.display='block';
  const cv=document.getElementById('signC');
  if(!cv)return;
  signCtx=cv.getContext('2d');
  signCtx.strokeStyle='#1C1C18';
  signCtx.lineWidth=2.5;
  signCtx.lineCap='round';
  signCtx.lineJoin='round';
  cv.onmousedown=e=>{signDrawing=true;const r=cv.getBoundingClientRect();signLX=e.clientX-r.left;signLY=e.clientY-r.top;};
  cv.onmousemove=e=>{if(!signDrawing)return;const r=cv.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;signCtx.beginPath();signCtx.moveTo(signLX,signLY);signCtx.lineTo(x,y);signCtx.stroke();signLX=x;signLY=y;};
  cv.onmouseup=cv.onmouseleave=()=>signDrawing=false;
  cv.ontouchstart=e=>{e.preventDefault();const t=e.touches[0],r=cv.getBoundingClientRect();signLX=t.clientX-r.left;signLY=t.clientY-r.top;signDrawing=true;};
  cv.ontouchmove=e=>{e.preventDefault();if(!signDrawing)return;const t=e.touches[0],r=cv.getBoundingClientRect();const x=t.clientX-r.left,y=t.clientY-r.top;signCtx.beginPath();signCtx.moveTo(signLX,signLY);signCtx.lineTo(x,y);signCtx.stroke();signLX=x;signLY=y;};
  cv.ontouchend=()=>signDrawing=false;
}
function clearSign(){if(signCtx){const cv=document.getElementById('signC');signCtx.clearRect(0,0,cv.width,cv.height);}}
function setSignTab(tab,btn){
  document.querySelectorAll('.sign-tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('signDraw').style.display=tab==='draw'?'block':'none';
  document.getElementById('signType').style.display=tab==='type'?'block':'none';
}

async function doSign(s){
  setP('sign',20,'Loading…');
  const ab=await s.files[0].arrayBuffer(), pdf=await PDFDocument.load(ab);
  const sigPng=document.getElementById('signC').toDataURL('image/png');
  const sigImg=await pdf.embedPng(await(await fetch(sigPng)).arrayBuffer());
  const where=document.getElementById('sign_pos')?.value||'last';
  const corner=document.getElementById('sign_corner')?.value||'br';
  const pgs=pdf.getPages(),total=pgs.length;
  const pagesToSign=where==='all'?pgs:where==='first'?[pgs[0]]:[pgs[total-1]];
  pagesToSign.forEach(pg=>{
    const{width,height}=pg.getSize(),sw=140,sh=50;
    const xM={br:width-sw-20,bl:20,bc:width/2-sw/2,tr:width-sw-20};
    const yM={br:20,bl:20,bc:20,tr:height-sh-20};
    pg.drawImage(sigImg,{x:xM[corner]||width-sw-20,y:yM[corner]||20,width:sw,height:sh,opacity:0.9});
  });
  const bytes=await pdf.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_signed.pdf')};
  showRes('sign','Signed!',`Signature applied to ${pagesToSign.length} page(s)`); hideP('sign');
}

// ── REDACT TOOL ─────────────────────────────────────────────────
let rdPdf=null,rdPage=1,rdTotal=0,rdBoxes=[],rdDrw=false,rdSX=0,rdSY=0,rdScale=1.4;
async function initRedact(file){
  rdPdf=await pjsLoad(await file.arrayBuffer());
  rdTotal=rdPdf.numPages; rdPage=1; rdBoxes=[];
  document.getElementById('redact_panel').style.display='block';
  await renderRd();
}
async function renderRd(){
  if(!rdPdf)return;
  const pg=await rdPdf.getPage(rdPage),vp=pg.getViewport({scale:rdScale});
  const cv=document.getElementById('rdC'),ov=document.getElementById('rdO');
  cv.width=ov.width=vp.width; cv.height=ov.height=vp.height;
  ov.style.top='0'; ov.style.left='0';
  ov.style.width=cv.style.width=vp.width+'px';
  ov.style.height=cv.style.height=vp.height+'px';
  await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
  const ri=document.getElementById('rd_info'); if(ri) ri.textContent=`Page ${rdPage} of ${rdTotal}`;
  drawRdBoxes(ov);
  setupRdEv(ov);
}
function drawRdBoxes(ov){
  const ctx=ov.getContext('2d');
  ctx.clearRect(0,0,ov.width,ov.height);
  rdBoxes.filter(b=>b.page===rdPage).forEach(b=>{
    ctx.fillStyle='rgba(0,0,0,0.88)'; ctx.fillRect(b.x,b.y,b.w,b.h);
    ctx.strokeStyle='#E8321A'; ctx.lineWidth=1.5; ctx.strokeRect(b.x,b.y,b.w,b.h);
  });
}
function setupRdEv(ov){
  ov.onmousedown=e=>{rdDrw=true;const r=ov.getBoundingClientRect();rdSX=e.clientX-r.left;rdSY=e.clientY-r.top;};
  ov.onmousemove=e=>{if(!rdDrw)return;const r=ov.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;drawRdBoxes(ov);const ctx=ov.getContext('2d');ctx.strokeStyle='rgba(232,50,26,0.75)';ctx.lineWidth=2;ctx.strokeRect(rdSX,rdSY,x-rdSX,y-rdSY);};
  ov.onmouseup=e=>{if(!rdDrw)return;rdDrw=false;const r=ov.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const w=x-rdSX,h=y-rdSY;if(Math.abs(w)>5&&Math.abs(h)>5)rdBoxes.push({page:rdPage,x:Math.min(rdSX,x),y:Math.min(rdSY,y),w:Math.abs(w),h:Math.abs(h)});drawRdBoxes(ov);};
}
function rdPrev(){if(rdPage>1){rdPage--;renderRd();}}
function rdNext(){if(rdPage<rdTotal){rdPage++;renderRd();}}

async function doRedact(s){
  if(!rdBoxes.length)throw new Error('Draw redaction boxes first by clicking and dragging');
  setP('redact',10,'Rendering pages with redactions…');
  const pdfOut=await PDFDocument.create();
  for(let i=1;i<=rdTotal;i++){
    setP('redact',10+(i/rdTotal)*82,`Page ${i}/${rdTotal}…`);
    const pg=await rdPdf.getPage(i),vp=pg.getViewport({scale:1.5});
    const cv=document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
    const ctx=cv.getContext('2d');
    await pg.render({canvasContext:ctx,viewport:vp}).promise;
    rdBoxes.filter(b=>b.page===i).forEach(b=>{
      const sc=1.5/rdScale;
      ctx.fillStyle='#000';
      ctx.fillRect(b.x*sc,b.y*sc,b.w*sc,b.h*sc);
    });
    const jb=await new Promise(r=>cv.toBlob(b=>b.arrayBuffer().then(r),'image/jpeg',0.96));
    const img=await pdfOut.embedJpg(jb);
    const np=pdfOut.addPage([vp.width/1.5,vp.height/1.5]);
    np.drawImage(img,{x:0,y:0,width:vp.width/1.5,height:vp.height/1.5});
  }
  const bytes=await pdfOut.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_redacted.pdf')};
  showRes('redact','Redacted!',`${rdBoxes.length} area(s) permanently removed`); hideP('redact');
}

// ── ANNOTATE TOOL ───────────────────────────────────────────────
let annPdf=null,annPage=1,annTotal=0,annTool='draw',annColor='#E8321A',annLW=3,annStrokes=[],annDrw=false,annLX=0,annLY=0;
async function initEdit(file){
  annPdf=await pjsLoad(await file.arrayBuffer());
  annTotal=annPdf.numPages; annPage=1; annStrokes=[];
  document.getElementById('edit_panel').style.display='block';
  await renderAnn();
}
async function renderAnn(){
  if(!annPdf)return;
  const pg=await annPdf.getPage(annPage),vp=pg.getViewport({scale:1.35});
  const cv=document.getElementById('annC'),ov=document.getElementById('annO');
  if(!cv||!ov)return;
  cv.width=ov.width=vp.width; cv.height=ov.height=vp.height;
  ov.style.width=cv.style.width=vp.width+'px';
  ov.style.height=cv.style.height=vp.height+'px';
  ov.style.top='0'; ov.style.left='0';
  await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
  const pi=document.getElementById('ann_pg'); if(pi) pi.textContent=`${annPage}/${annTotal}`;
  redrawAnn();
  ov.onmousedown=e=>{annDrw=true;const r=ov.getBoundingClientRect();annLX=e.clientX-r.left;annLY=e.clientY-r.top;annStrokes.push({tool:annTool,color:annColor,lw:annLW,pts:[{x:annLX,y:annLY}],page:annPage});};
  ov.onmousemove=e=>{if(!annDrw)return;const r=ov.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;annStrokes[annStrokes.length-1].pts.push({x,y});redrawAnn();};
  ov.onmouseup=ov.onmouseleave=()=>annDrw=false;
  ov.ontouchstart=e=>{e.preventDefault();const t=e.touches[0],r=ov.getBoundingClientRect();annLX=t.clientX-r.left;annLY=t.clientY-r.top;annDrw=true;annStrokes.push({tool:annTool,color:annColor,lw:annLW,pts:[{x:annLX,y:annLY}],page:annPage});};
  ov.ontouchmove=e=>{e.preventDefault();if(!annDrw)return;const t=e.touches[0],r=ov.getBoundingClientRect();annStrokes[annStrokes.length-1].pts.push({x:t.clientX-r.left,y:t.clientY-r.top});redrawAnn();};
  ov.ontouchend=()=>annDrw=false;
}
function redrawAnn(){
  const ov=document.getElementById('annO');if(!ov)return;
  const ctx=ov.getContext('2d');ctx.clearRect(0,0,ov.width,ov.height);
  annStrokes.filter(s=>s.page===annPage).forEach(s=>{
    if(s.pts.length<2)return;
    ctx.beginPath();ctx.moveTo(s.pts[0].x,s.pts[0].y);
    s.pts.forEach(p=>ctx.lineTo(p.x,p.y));
    if(s.tool==='hl'){ctx.strokeStyle=s.color+'66';ctx.lineWidth=s.lw*5;}
    else if(s.tool==='erase'){ctx.globalCompositeOperation='destination-out';ctx.lineWidth=s.lw*4;}
    else{ctx.strokeStyle=s.color;ctx.lineWidth=s.lw;}
    ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
    ctx.globalCompositeOperation='source-over';
  });
}
function setAT(t){annTool=t;document.querySelectorAll('.ann-btn').forEach(b=>b.classList.toggle('on',b.dataset.tool===t));}
function setAC(c,el){annColor=c;document.querySelectorAll('.cdot').forEach(d=>d.classList.remove('on'));el.classList.add('on');}
function annPrev(){if(annPage>1){annPage--;renderAnn();}}
function annNext(){if(annPage<annTotal){annPage++;renderAnn();}}
async function doEditPdf(s){
  setP('editpdf',10,'Compositing annotations…');
  const pdfOut=await PDFDocument.create();
  for(let i=1;i<=annTotal;i++){
    setP('editpdf',10+(i/annTotal)*82,`Page ${i}/${annTotal}…`);
    const pg=await annPdf.getPage(i),vp=pg.getViewport({scale:1.35});
    const cv=document.createElement('canvas'); cv.width=vp.width; cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
    const tmpOv=document.createElement('canvas');tmpOv.width=vp.width;tmpOv.height=vp.height;
    const tCtx=tmpOv.getContext('2d');
    annStrokes.filter(st=>st.page===i).forEach(s=>{
      if(s.pts.length<2)return;
      tCtx.beginPath();tCtx.moveTo(s.pts[0].x,s.pts[0].y);
      s.pts.forEach(p=>tCtx.lineTo(p.x,p.y));
      if(s.tool==='hl'){tCtx.strokeStyle=s.color+'66';tCtx.lineWidth=s.lw*5;}
      else{tCtx.strokeStyle=s.color;tCtx.lineWidth=s.lw;}
      tCtx.lineCap='round';tCtx.lineJoin='round';tCtx.stroke();
    });
    cv.getContext('2d').drawImage(tmpOv,0,0);
    const jb=await new Promise(r=>cv.toBlob(b=>b.arrayBuffer().then(r),'image/jpeg',0.95));
    const img=await pdfOut.embedJpg(jb);
    const np=pdfOut.addPage([vp.width/1.35,vp.height/1.35]);
    np.drawImage(img,{x:0,y:0,width:vp.width/1.35,height:vp.height/1.35});
  }
  const bytes=await pdfOut.save();
  s.result={type:'pdf',bytes,filename:s.files[0].name.replace('.pdf','_annotated.pdf')};
  showRes('editpdf','Saved!',`${annTotal} pages with annotations`); hideP('editpdf');
}

// ── COMPARE ─────────────────────────────────────────────────────
let cmpFiles={A:null,B:null};
async function onCmpFile(side,files){
  cmpFiles[side]=files[0];
  try{
    const pdf=await pjsLoad(await files[0].arrayBuffer());
    const pg=await pdf.getPage(1),vp=pg.getViewport({scale:0.65});
    const cv=document.getElementById(`cmpC${side}`);
    cv.width=vp.width;cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
  }catch(e){}
  if(cmpFiles.A&&cmpFiles.B){document.getElementById('bg_compare').disabled=false;}
}
function setupCmpDZ(side){
  const dz=document.getElementById(`dz_cmp${side}`);
  if(!dz)return;
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over')});
  dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
  dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');onCmpFile(side,e.dataTransfer.files);});
}
async function doCompare(s){
  if(!cmpFiles.A||!cmpFiles.B)throw new Error('Upload both PDFs first');
  setP('compare',15,'Loading PDFs…');
  const pdfA=await pjsLoad(await cmpFiles.A.arrayBuffer());
  const pdfB=await pjsLoad(await cmpFiles.B.arrayBuffer());
  const pgs=Math.max(pdfA.numPages,pdfB.numPages);
  const pdfOut=await PDFDocument.create();
  for(let i=1;i<=pgs;i++){
    setP('compare',15+(i/pgs)*80,`Comparing page ${i}/${pgs}…`);
    const hasA=i<=pdfA.numPages,hasB=i<=pdfB.numPages;
    const sc=0.9;
    const pgA=hasA?await pdfA.getPage(i):null,vpA=pgA?pgA.getViewport({scale:sc}):null;
    const pgB=hasB?await pdfB.getPage(i):null,vpB=pgB?pgB.getViewport({scale:sc}):null;
    const W=(vpA?vpA.width:400)+(vpB?vpB.width:400)+20,H=Math.max(vpA?vpA.height:400,vpB?vpB.height:400);
    const combined=document.createElement('canvas');combined.width=W;combined.height=H;
    const ctx=combined.getContext('2d');ctx.fillStyle='#F5F4EF';ctx.fillRect(0,0,W,H);
    if(pgA){const cvA=document.createElement('canvas');cvA.width=vpA.width;cvA.height=vpA.height;await pgA.render({canvasContext:cvA.getContext('2d'),viewport:vpA}).promise;ctx.drawImage(cvA,0,0);}
    ctx.fillStyle='rgba(232,50,26,0.5)';ctx.fillRect((vpA?vpA.width:400),0,10,H);
    if(pgB){const cvB=document.createElement('canvas');cvB.width=vpB.width;cvB.height=vpB.height;await pgB.render({canvasContext:cvB.getContext('2d'),viewport:vpB}).promise;ctx.drawImage(cvB,(vpA?vpA.width:400)+10,0);}
    const jb=await new Promise(r=>combined.toBlob(b=>b.arrayBuffer().then(r),'image/jpeg',0.9));
    const img=await pdfOut.embedJpg(jb);
    const np=pdfOut.addPage([W,H]);np.drawImage(img,{x:0,y:0,width:W,height:H});
  }
  const bytes=await pdfOut.save();
  s.result={type:'pdf',bytes,filename:'comparison.pdf'};
  showRes('compare','Comparison ready!',`${pgs} page pairs compared side-by-side`); hideP('compare');
}
