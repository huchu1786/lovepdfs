/* ═══════════════════════════════════════════════
   iLovePDFs — App Logic & UI
═══════════════════════════════════════════════ */

// ── RENDER TABS + GRID ──────────────────────────────────────────
let activeCat='all';
function renderCats(){
  const row=document.getElementById('catRow');if(!row)return;
  row.innerHTML=CATS.map(c=>`<button class="cat-btn${c.id===activeCat?' on':''}" onclick="setCat('${c.id}')">${c.label}</button>`).join('');
}
function setCat(c){activeCat=c;renderCats();renderTools('');}

let currentSearch='';
function srch(v){currentSearch=v.toLowerCase().trim();if(currentSearch)activeCat='all';renderCats();renderTools(currentSearch);}

function renderTools(search=''){
  const container=document.getElementById('toolsContainer');if(!container)return;
  if(search){
    const filtered=TOOLS.filter(t=>t.name.toLowerCase().includes(search)||t.desc.toLowerCase().includes(search));
    if(!filtered.length){container.innerHTML='<div style="text-align:center;padding:4rem;color:var(--muted)">No tools match your search. Try "merge", "compress", or "sign".</div>';return;}
    container.innerHTML=`<div class="tools-grid">${filtered.map(toolCard).join('')}</div>`;
    return;
  }
  if(activeCat!=='all'){
    const filtered=TOOLS.filter(t=>t.cat===activeCat);
    container.innerHTML=`<div class="tools-grid">${filtered.map(toolCard).join('')}</div>`;
    return;
  }
  // All: grouped
  container.innerHTML=Object.values(CAT_GROUPS).map(g=>{
    const tools=g.tools.map(id=>TOOLS.find(t=>t.id===id)).filter(Boolean);
    return `<div class="tool-group"><div class="group-label">${g.label}</div><div class="tools-grid">${tools.map(toolCard).join('')}</div></div>`;
  }).join('');
}

function toolCard(t){
  // Check if we are on the homepage index.html or another page
  const isHome = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
  // Find URL path mapping from TOOLS_SEO if possible, or fallback to hash-based modal
  const seoData = typeof module !== 'undefined' ? [] : (window.TOOLS_SEO || []);  
  
  // To avoid needing tools-data.js everywhere on the client, we'll route based on standard slug if we're on Home
  const toolSlug = t.id; // Usually mapped, we'll dynamically use the known standard slugs
  
  // Very simple client-side slug mapping (assuming tools map 1:1 with typical SEO IDs, or just map them explicitly)
  const slugMap = {
    'merge': 'merge-pdf', 'compress': 'compress-pdf', 'split': 'split-pdf', 'rotate': 'rotate-pdf',
    'unlock': 'unlock-pdf', 'protect': 'protect-pdf', 'watermark': 'add-watermark-pdf', 'removepg': 'remove-pages-pdf',
    'organize': 'organize-pdf', 'crop': 'crop-pdf', 'pdf2word': 'pdf-to-word', 'pdf2xls': 'pdf-to-excel',
    'ppt2pdf': 'ppt-to-pdf', 'pdf2jpg': 'pdf-to-jpg', 'word2pdf': 'word-to-pdf', 'xls2pdf': 'excel-to-pdf',
    'jpg2pdf': 'jpg-to-pdf', 'resize_img': 'resize-image', 'crop_img': 'crop-image', 'compress_img': 'compress-image',
    'jpg2png_img': 'jpg-to-png', 'png2jpg_img': 'png-to-jpg',
    'editpdf': 'edit-pdf', 'extract': 'extract-pages-pdf', 'repair': 'repair-pdf', 'ocr': 'ocr-extract-text',
    'sign': 'sign-pdf', 'redact': 'redact-pdf', 'compare': 'compare-pdf', 'html2pdf': 'html-to-pdf',
    'pdf2pdfa': 'pdf-to-pdfa', 'pagenums': 'add-page-numbers-pdf', 'pdf2ppt': 'pdf-to-ppt'
  };
  
  const href = isHome ? (slugMap[t.id] ? `./${slugMap[t.id]}/index.html` : `javascript:openTool('${t.id}')`) : 
               (slugMap[t.id] ? `../${slugMap[t.id]}/index.html` : `javascript:openTool('${t.id}')`);
               
  return `<a class="tool-card" href="${href}">
    ${t.badge?`<div class="tc-badge bg-${t.badge}">${t.badge}</div>`:''}
    <div class="tc-shine"></div>
    <div class="tc-icon" style="background:${t.clr}12;color:${t.clr}">${t.icon}</div>
    <div class="tc-name">${t.name}</div>
    <div class="tc-desc">${t.desc}</div>
    <div class="tc-arrow">→</div>
  </a>`;
}

renderCats();renderTools('');

// ── MARQUEE ─────────────────────────────────────────────────────
(function(){
  const track=document.getElementById('marqueeTrack');if(!track)return;
  const chips=TOOLS.map(t=>`<div class="m-chip"><span>${t.icon}</span>${t.name}</div>`).join('');
  track.innerHTML=chips+chips;
})();

// ── MODAL ────────────────────────────────────────────────────────
function openTool(id){
  const t=TOOLS.find(x=>x.id===id);
  if(!t)return;
  
  const mBody = document.getElementById('mBody');
  const overlay = document.getElementById('overlay');
  const workspace = document.getElementById('toolWorkspace');
  
  STATE[id]={files:[],result:null};

  // If we are on a dedicated tool page, mount INLINE
  if (workspace) {
    workspace.innerHTML = buildUI(id);
    setupDZ(id);
    if(id==='compare'){setupCmpDZ('A');setupCmpDZ('B');document.getElementById('bg_compare').disabled=true;}
    if(id==='html2pdf') document.getElementById('bg_html2pdf').disabled=false;
    return;
  }

  // Otherwise, fallback to Modal (classic behavior)
  if(!overlay)return;
  
  document.getElementById('mIcon').style.background=t.clr+'14';
  document.getElementById('mIcon').style.color=t.clr;
  document.getElementById('mIcon').style.borderRadius='13px';
  document.getElementById('mIcon').style.width='48px';
  document.getElementById('mIcon').style.height='48px';
  document.getElementById('mIcon').style.display='flex';
  document.getElementById('mIcon').style.alignItems='center';
  document.getElementById('mIcon').style.justifyContent='center';
  document.getElementById('mIcon').style.fontSize='1.4rem';
  document.getElementById('mIcon').textContent=t.icon;
  document.getElementById('mTitle').textContent=t.name;
  document.getElementById('mSub').textContent=t.desc;
  
  if(mBody) {
    mBody.innerHTML=buildUI(id);
    setupDZ(id);
    if(id==='compare'){setupCmpDZ('A');setupCmpDZ('B');document.getElementById('bg_compare').disabled=true;}
    if(id==='html2pdf') document.getElementById('bg_html2pdf').disabled=false;
  }

  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){const ov=document.getElementById('overlay');if(ov)ov.classList.remove('open');document.body.style.overflow='';}
function closeOvOut(e){if(e.target===document.getElementById('overlay'))closeModal();}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// Auto-mount inline if on dedicated page
window.addEventListener('DOMContentLoaded', () => {
  const ds = document.body.dataset.toolId;
  if(ds) {
    openTool(ds);
  }
});

// ── BUILD UI ─────────────────────────────────────────────────────
function S(id,lbl,opts,def=''){return `<div class="opt-g"><div class="opt-l">${lbl}</div><select class="opt-s" id="${id}">${opts.map(([v,l])=>`<option value="${v}"${v===def?' selected':''}>${l}</option>`).join('')}</select></div>`;}
function I(id,lbl,type='text',ph='',val=''){return `<div class="opt-g"><div class="opt-l">${lbl}</div><input class="opt-i" id="${id}" type="${type}" placeholder="${ph}" value="${val}"></div>`;}
function DZ(id,acc,multi=true){return `<div class="dzone" id="dz_${id}" onclick="triggerFI('${id}')"><span class="dzone-icon">📂</span><h3>Drop ${multi?'files':'a file'} here</h3><p>Supports ${acc.replace(/\./g,'').replace(/,/g,' / ').toUpperCase()}</p><div class="dzone-btn">Choose Files</div></div><input type="file" id="fi_${id}" accept="${acc}" ${multi?'multiple':''} style="display:none" onchange="onFiles('${id}',this.files)"><div class="flist" id="fl_${id}"></div>`;}
function PROG(id){return `<div class="prog" id="pw_${id}"><div class="prog-hd"><span class="prog-l" id="pl_${id}">Processing…</span><span class="prog-p" id="pp_${id}">0%</span></div><div class="prog-track"><div class="prog-bar" id="pbar_${id}"></div></div></div>`;}
function RES(id){return `<div class="result-box" id="rb_${id}"><div class="result-ic">✅</div><div><div class="result-t" id="rt_${id}"></div><div class="result-m" id="rm_${id}"></div></div></div>`;}
function ACTS(id,lbl){return `<div class="act-row"><button class="btn-go" id="bg_${id}" onclick="run('${id}')" disabled>${lbl||label(id)}</button><button class="btn-dl" id="bd_${id}" onclick="doDownload('${id}')">⬇ Download</button><button class="btn-rst" onclick="resetT('${id}')">↺ Reset</button></div>`;}
function OPTS(id,inner){return `<div class="opt-section" id="opts_${id}" style="display:none"><div class="opt-section-title">Options</div><div class="opt-row">${inner}</div></div>`;}

function buildUI(id){
  const base=(extra='')=>DZ(id,'.pdf',id==='merge')+extra+PROG(id)+RES(id)+ACTS(id);
  switch(id){
    case 'merge': return base();
    case 'split': return base(OPTS(id,S('sp_mode','Split Mode',[['all','All Pages (one per file)'],['range','Custom Range'],['interval','Fixed Interval']],'all')+I('sp_range','Page Ranges (e.g. 1-3, 5)','text','1-3, 5, 8')+I('sp_interval','Pages per File','number','1','1')));
    case 'removepg': return DZ(id,'.pdf',false)+`<div class="pg-wrap" id="pgw_${id}"><div class="pg-hd"><span class="pg-hint">Click pages to mark for deletion</span><div class="pg-acts"><button class="pg-act" onclick="pgAll('${id}')">Select All</button><button class="pg-act" onclick="pgClr('${id}')">Clear</button></div></div><div class="pg-grid" id="pgg_${id}"></div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'extract': return base(OPTS(id,I('ex_range','Page Range','text','1-3, 5, 8-10')+S('ex_out','Output Format',[['one','Single PDF'],['sep','Separate PDFs (ZIP)']],'one')));
    case 'organize': return DZ(id,'.pdf',false)+`<div class="pg-wrap" id="pgw_${id}"><div class="pg-hd"><span class="pg-hint">Drag pages to reorder • Then click Apply</span></div><div class="pg-grid" id="pgg_${id}"></div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'compress': return base(OPTS(id,S('cmp_lvl','Compression Level',[['low','Low — Best Quality'],['med','Medium — Balanced (Recommended)'],['hi','High — Smallest Size']],'med')));
    case 'repair': return base();
    case 'ocr': return DZ(id,'.pdf',false)+`<div id="ocr_panel" style="display:none">`+OPTS(id,S('ocr_pgs','Pages to Extract',[['all','All Pages'],['first','First Page Only'],['range','Custom Range']],'all')+I('ocr_range','Range (if custom)','text','1-5'))+`<button class="ocr-copy-btn" onclick="copyOCR()">📋 Copy All Text</button><div class="ocr-out" id="ocr_text">Extracted text will appear here…</div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'jpg2pdf': return DZ(id,'.jpg,.jpeg,.png,.webp,.bmp')+OPTS(id,S('j2p_sz','Page Size',[['auto','Auto (fit image)'],['a4','A4'],['letter','US Letter'],['legal','Legal'],['a3','A3']],'auto')+S('j2p_orient','Orientation',[['auto','Auto Detect'],['portrait','Portrait'],['landscape','Landscape']],'auto')+S('j2p_margin','Margin',[['0','None'],['20','Small'],['40','Medium'],['60','Large']],'0'))+PROG(id)+RES(id)+ACTS(id);
    case 'word2pdf': return DZ(id,'.doc,.docx',false)+`<div style="padding:0.9rem 1rem;background:rgba(37,99,235,0.05);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:0.82rem;color:#2563EB;margin-bottom:1.25rem">📘 Converts DOCX text content to PDF with heading detection and paragraph formatting.</div>`+PROG(id)+RES(id)+ACTS(id);
    case 'ppt2pdf': return DZ(id,'.ppt,.pptx',false)+`<div style="padding:0.9rem 1rem;background:rgba(234,88,12,0.05);border:1px solid rgba(234,88,12,0.15);border-radius:10px;font-size:0.82rem;color:#ea580c;margin-bottom:1.25rem">📊 Extracts text from each PPTX slide and renders them as PDF pages with layout.</div>`+PROG(id)+RES(id)+ACTS(id);
    case 'xls2pdf': return DZ(id,'.xls,.xlsx,.csv',false)+`<div style="padding:0.9rem 1rem;background:rgba(22,163,74,0.05);border:1px solid rgba(22,163,74,0.15);border-radius:10px;font-size:0.82rem;color:#16a34a;margin-bottom:1.25rem">📈 Converts spreadsheet rows into a formatted PDF table layout.</div>`+PROG(id)+RES(id)+ACTS(id);
    case 'html2pdf': return `<div class="opt-section"><div class="opt-section-title">Enter URL or HTML</div><div class="opt-row">`+I('h2p_url','Website URL (https://…)','url','https://example.com')+`</div><div style="text-align:center;padding:0.5rem 0;color:var(--muted);font-size:0.8rem">— or paste HTML content below —</div><textarea id="h2p_html" rows="5" style="width:100%;padding:0.75rem;border:1.5px solid var(--border);border-radius:9px;background:var(--bg2);color:var(--text);font-family:monospace;font-size:0.82rem;resize:vertical;transition:border-color 0.2s" placeholder="<h1>Hello World</h1>…" onfocus="this.style.borderColor='var(--red)'" onblur="this.style.borderColor='var(--border)'"></textarea></div>`+PROG(id)+RES(id)+`<div class="act-row"><button class="btn-go" id="bg_html2pdf" onclick="run('html2pdf')">🌐 Convert to PDF</button><button class="btn-dl" id="bd_html2pdf" onclick="doDownload('html2pdf')">⬇ Download</button><button class="btn-rst" onclick="resetT('html2pdf')">↺ Reset</button></div>`;
    case 'pdf2jpg': return base(OPTS(id,S('p2j_fmt','Image Format',[['jpeg','JPEG'],['png','PNG'],['webp','WebP']],'jpeg')+S('p2j_res','Resolution',[['1','72 DPI (Normal)'],['2','144 DPI (High)'],['3','216 DPI (Print)'],['4','288 DPI (Ultra)']],'2')));
    case 'pdf2word': return base(`<div style="padding:0.9rem 1rem;background:rgba(37,99,235,0.05);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:0.82rem;color:#2563EB;margin-bottom:1rem">📘 <strong>Improved!</strong> Extracts text with layout analysis, groups into paragraphs by position, and packages HTML+TXT files. Open the HTML file in Microsoft Word or LibreOffice for best results.</div>`);
    case 'pdf2xls': return base(`<div style="padding:0.9rem 1rem;background:rgba(22,163,74,0.05);border:1px solid rgba(22,163,74,0.15);border-radius:10px;font-size:0.82rem;color:#16a34a;margin-bottom:1rem">📊 Extracts all text with X/Y coordinates into a CSV. Open in Excel for full spreadsheet functionality.</div>`);
    case 'pdf2pdfa': return base(OPTS(id,S('pdfa_ver','PDF/A Standard',[['pdfa-1b','PDF/A-1b (Most Compatible)'],['pdfa-2b','PDF/A-2b'],['pdfa-3b','PDF/A-3b']],'pdfa-1b')));
    case 'rotate': return base(OPTS(id,S('rot_deg','Rotation Angle',[['90','90° Clockwise'],['180','180°'],['270','90° Counter-Clockwise']],'90')+S('rot_pages','Apply To',[['all','All Pages'],['odd','Odd Pages Only'],['even','Even Pages Only']],'all')));
    case 'watermark': return base(OPTS(id,I('wm_text','Watermark Text','text','CONFIDENTIAL','CONFIDENTIAL')+S('wm_pos','Position',[['diag','Diagonal Center'],['center','Center Horizontal'],['header','Header'],['footer','Footer']],'diag')+S('wm_clr','Color',[['red','Red'],['blue','Blue'],['gray','Gray'],['black','Black'],['green','Green']],'gray')+S('wm_pg','Apply To',[['all','All Pages'],['odd','Odd Pages'],['even','Even Pages'],['first','First Page Only'],['last','Last Page Only']],'all')));
    case 'pagenums': return base(OPTS(id,S('pn_pos','Position',[['bc','Bottom Center'],['br','Bottom Right'],['bl','Bottom Left'],['tc','Top Center'],['tr','Top Right']],'bc')+S('pn_fmt','Format',[['n','1, 2, 3…'],['pn','Page 1, Page 2…'],['nofn','1 of N…']],'n')+I('pn_start','Start Number','number','1','1')+S('pn_skip','Skip Pages',[['none','None'],['first','Skip First Page'],['last','Skip Last Page']],'none')));
    case 'crop': return base(OPTS(id,I('cr_top','Top (pt)','number','0','0')+I('cr_bottom','Bottom (pt)','number','0','0')+I('cr_left','Left (pt)','number','0','0')+I('cr_right','Right (pt)','number','0','0')+S('cr_pages','Apply To',[['all','All Pages'],['odd','Odd Pages'],['even','Even Pages']],'all')));
    case 'editpdf': return DZ(id,'.pdf',false)+`<div id="edit_panel" style="display:none"><div style="border:1.5px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:1rem"><div class="ann-toolbar"><button class="ann-btn on" data-tool="draw" onclick="setAT('draw')">✏️ Draw</button><button class="ann-btn" data-tool="hl" onclick="setAT('hl')">🟡 Highlight</button><button class="ann-btn" data-tool="erase" onclick="setAT('erase')">🧹 Erase</button><div class="ann-sep"></div><div style="display:flex;align-items:center;gap:0.3rem;font-size:0.75rem;color:var(--muted)">Size<input type="range" min="1" max="25" value="3" id="ann_sz" oninput="annLW=parseInt(this.value)" style="width:55px;accent-color:var(--red)"></div><div class="ann-sep"></div><div class="color-dots"><div class="cdot on" style="background:#E8321A" onclick="setAC('#E8321A',this)"></div><div class="cdot" style="background:#2563EB" onclick="setAC('#2563EB',this)"></div><div class="cdot" style="background:#16A34A" onclick="setAC('#16A34A',this)"></div><div class="cdot" style="background:#F59E0B" onclick="setAC('#F59E0B',this)"></div><div class="cdot" style="background:#7C3AED" onclick="setAC('#7C3AED',this)"></div></div></div><div class="viewer-bar"><span class="v-info" id="ann_pg">1/1</span><button class="vbtn" onclick="annPrev()">◀</button><button class="vbtn" onclick="annNext()">▶</button></div><div class="ann-wrap"><canvas id="annC"></canvas><canvas id="annO"></canvas></div></div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'unlock': return base(`<div style="padding:0.9rem 1rem;background:rgba(22,163,74,0.05);border:1px solid rgba(22,163,74,0.15);border-radius:10px;font-size:0.82rem;color:#16a34a;margin-bottom:1rem">🔓 Attempts to remove owner-level restrictions. User-password removal requires the original password.</div>`+OPTS(id,I('ul_pass','Password (if required)','password','Enter password if known')));
    case 'protect': return base(OPTS(id,I('pt_pass','Password','password','Enter a strong password')+I('pt_pass2','Confirm Password','password','Repeat the password')+S('pt_perm','Permissions',[['full','Full Access'],['noprint','No Printing'],['noedit','No Editing'],['ro','Read Only']],'full')));
    case 'sign': return DZ(id,'.pdf',false)+`<div id="sign_panel" style="display:none;margin-bottom:1.25rem"><div class="sign-tabs" id="signTabs"><button class="sign-tab on" onclick="setSignTab('draw',this)">✏️ Draw Signature</button><button class="sign-tab" onclick="setSignTab('type',this)">⌨️ Type Signature</button></div><div id="signDraw"><div class="sign-canvas-wrap"><div class="sign-cbar">Draw your signature below <button class="sign-clr-btn" onclick="clearSign()">Clear</button></div><canvas id="signC" width="620" height="130"></canvas></div><div class="opt-row">`+S('sign_pos','Place On',[['last','Last Page Only'],['all','All Pages'],['first','First Page Only']],'last')+S('sign_corner','Position',[['br','Bottom Right'],['bl','Bottom Left'],['bc','Bottom Center'],['tr','Top Right']],'br')+`</div></div><div id="signType" style="display:none"><input class="sign-typed" id="signTyped" placeholder="Your Name…"><div class="opt-row">`+S('sign_style','Style',[['normal','Normal'],['italic','Cursive Style'],['bold','Bold']],'italic')+S('sign_sz','Size',[['sm','Small'],['md','Medium'],['lg','Large']],'md')+`</div></div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'redact': return DZ(id,'.pdf',false)+`<div class="redact-notice">⚠️ Redaction permanently removes content. Select regions by dragging over the area to hide. This cannot be undone.</div><div id="redact_panel" style="display:none"><div class="rd-viewer"><div class="viewer-bar"><span class="v-info" id="rd_info">Page 1/1</span><button class="vbtn" onclick="rdPrev()">◀</button><button class="vbtn" onclick="rdNext()">▶</button><span style="font-size:0.75rem;color:var(--muted);margin-left:auto">Click and drag to select area</span></div><div class="rd-canvas-wrap"><canvas id="rdC"></canvas><canvas id="rdO"></canvas></div></div></div>`+PROG(id)+RES(id)+ACTS(id);
    case 'compare': return `<div class="cmp-cols"><div class="cmp-col"><div class="cmp-col-hd">📄 Original (A)</div><div class="cmp-zone" onclick="document.getElementById('fi_cmpA').click()"><div class="dzone" id="dz_cmpA" style="padding:1.5rem"><span class="dzone-icon" style="font-size:1.6rem">📄</span><h3 style="font-size:0.875rem">Upload PDF A</h3><div class="dzone-btn" style="padding:0.4rem 1rem;font-size:0.75rem">Choose</div></div><input type="file" id="fi_cmpA" accept=".pdf" style="display:none" onchange="onCmpFile('A',this.files)"></div><div class="cmp-canvas"><canvas id="cmpCA" style="max-width:100%"></canvas></div></div><div class="cmp-col"><div class="cmp-col-hd">📋 Revised (B)</div><div class="cmp-zone" onclick="document.getElementById('fi_cmpB').click()"><div class="dzone" id="dz_cmpB" style="padding:1.5rem"><span class="dzone-icon" style="font-size:1.6rem">📋</span><h3 style="font-size:0.875rem">Upload PDF B</h3><div class="dzone-btn" style="padding:0.4rem 1rem;font-size:0.75rem">Choose</div></div><input type="file" id="fi_cmpB" accept=".pdf" style="display:none" onchange="onCmpFile('B',this.files)"></div><div class="cmp-canvas"><canvas id="cmpCB" style="max-width:100%"></canvas></div></div></div><div style="font-size:0.78rem;color:var(--muted);text-align:center;margin-bottom:1.25rem">Upload both PDFs to enable comparison</div>`+PROG('compare')+RES('compare')+`<div class="act-row"><button class="btn-go" id="bg_compare" onclick="run('compare')">🔀 Compare PDFs</button><button class="btn-dl" id="bd_compare" onclick="doDownload('compare')">⬇ Download</button><button class="btn-rst" onclick="resetT('compare')">↺ Reset</button></div>`;
    case 'resize_img': return DZ(id,'.jpg,.jpeg,.png,.webp',false)+OPTS(id,I('ri_w','Width (px)','number','e.g. 1920')+I('ri_h','Height (px)','number','e.g. 1080'))+PROG(id)+RES(id)+ACTS(id);
    case 'crop_img': return DZ(id,'.jpg,.jpeg,.png,.webp',false)+OPTS(id,I('ci_aspect','Aspect Ratio (e.g. 16:9, 1:1, or free)','text','free','free'))+PROG(id)+RES(id)+ACTS(id);
    case 'compress_img': return DZ(id,'.jpg,.jpeg,.png,.webp',false)+OPTS(id,S('coi_q','Quality',[['0.9','Best Quality (90%)'],['0.75','Good Balance (75%)'],['0.5','Smallest Size (50%)']],'0.75'))+PROG(id)+RES(id)+ACTS(id);
    case 'jpg2png_img': return DZ(id,'.jpg,.jpeg',false)+PROG(id)+RES(id)+ACTS(id);
    case 'png2jpg_img': return DZ(id,'.png',false)+PROG(id)+RES(id)+ACTS(id);
    default: return '<p style="color:var(--muted)">Coming soon!</p>';
  }
}

function label(id){
  const m={merge:'🔗 Merge PDFs',split:'✂️ Split PDF',removepg:'🗑️ Delete Pages',extract:'📤 Extract Pages',organize:'📋 Apply Order',compress:'🗜️ Compress PDF',repair:'🔧 Repair PDF',ocr:'🔡 Extract Text',jpg2pdf:'📷 Convert to PDF',word2pdf:'📝 Convert to PDF',ppt2pdf:'📊 Convert to PDF',xls2pdf:'📈 Convert to PDF',html2pdf:'🌐 Convert to PDF',pdf2jpg:'🖼️ Convert to Images',pdf2word:'📄 Convert to Word',pdf2xls:'📊 Export to CSV',pdf2pdfa:'🗂️ Convert to PDF/A',rotate:'🔄 Rotate Pages',watermark:'💧 Apply Watermark',pagenums:'🔢 Add Page Numbers',crop:'🔲 Crop Pages',editpdf:'✏️ Save Annotated PDF',unlock:'🔓 Unlock PDF',protect:'🔐 Protect PDF',sign:'✍️ Add Signature',redact:'⬛ Apply Redactions',compare:'🔀 Compare PDFs',
  resize_img:'↔️ Resize Image', crop_img:'✂️ Crop Image', compress_img:'🗜️ Compress Image', jpg2png_img:'🔄 Convert to PNG', png2jpg_img:'🔄 Convert to JPG'};
  return m[id]||'⚙️ Process';
}

// ── FILE HANDLING ────────────────────────────────────────────────
function triggerFI(id){document.getElementById('fi_'+id)?.click();}
function onFiles(id,flist){
  const s=gs(id);
  if(['merge','jpg2pdf'].includes(id)) s.files.push(...Array.from(flist));
  else s.files=[flist[0]];
  renderFL(id);showOpts(id);
  const bg=document.getElementById('bg_'+id);if(bg)bg.disabled=false;
  s.result=null;hideRes(id);
  if(['removepg','organize'].includes(id)) initPgGrid(id,s.files[0]);
  if(id==='editpdf') initEdit(s.files[0]);
  if(id==='sign') initSign();
  if(id==='redact') initRedact(s.files[0]);
  if(id==='ocr'){document.getElementById('ocr_panel').style.display='block';showOpts(id);}
}
function renderFL(id){
  const fl=document.getElementById('fl_'+id);if(!fl)return;
  const s=gs(id);
  fl.innerHTML=s.files.map((f,i)=>`<div class="fi">
    <div class="fi-ic" style="background:rgba(232,50,26,0.08);color:var(--red)">${f.name.match(/\.pdf$/i)?'📄':f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)?'🖼️':f.name.match(/\.(doc|docx)$/i)?'📝':f.name.match(/\.(xls|xlsx|csv)$/i)?'📊':'📎'}</div>
    <div class="fi-info"><div class="fi-name">${f.name}</div><div class="fi-size">${fmtSize(f.size)}</div></div>
    <span class="fi-status">Ready</span>
    <button class="fi-rm" onclick="rmFile('${id}',${i})">✕</button>
  </div>`).join('');
}
function rmFile(id,i){
  const s=gs(id); s.files.splice(i,1); renderFL(id);
  if(!s.files.length){const bg=document.getElementById('bg_'+id);if(bg)bg.disabled=true;hideOpts(id);}
}
function showOpts(id){const el=document.getElementById('opts_'+id);if(el)el.style.display='';}
function hideOpts(id){const el=document.getElementById('opts_'+id);if(el)el.style.display='none';}
function setupDZ(id){
  const dz=document.getElementById('dz_'+id);if(!dz)return;
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over')});
  dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
  dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');onFiles(id,e.dataTransfer.files);});
}

// ── PROGRESS ─────────────────────────────────────────────────────
function setP(id,pct,lbl){
  document.getElementById('pw_'+id)?.classList.add('on');
  const bar=document.getElementById('pbar_'+id);if(bar)bar.style.width=pct+'%';
  const pl=document.getElementById('pl_'+id);if(pl)pl.textContent=lbl||'Processing…';
  const pp=document.getElementById('pp_'+id);if(pp)pp.textContent=Math.round(pct)+'%';
}
function hideP(id){document.getElementById('pw_'+id)?.classList.remove('on');}
function showRes(id,t,m){
  document.getElementById('rb_'+id)?.classList.add('on');
  const rt=document.getElementById('rt_'+id);if(rt)rt.textContent=t;
  const rm=document.getElementById('rm_'+id);if(rm)rm.textContent=m;
  document.getElementById('bd_'+id)?.classList.add('on');
}
function hideRes(id){document.getElementById('rb_'+id)?.classList.remove('on');document.getElementById('bd_'+id)?.classList.remove('on');}
function resetT(id){
  STATE[id]={files:[],result:null};
  const fl=document.getElementById('fl_'+id);if(fl)fl.innerHTML='';
  hideP(id);hideRes(id);
  const bg=document.getElementById('bg_'+id);if(bg)bg.disabled=true;
  hideOpts(id);
  const fi=document.getElementById('fi_'+id);if(fi)fi.value='';
  const pgw=document.getElementById('pgw_'+id);if(pgw)pgw.style.display='none';
  annPdf=null;annStrokes=[];rdPdf=null;rdBoxes=[];
}

// ── RUN ──────────────────────────────────────────────────────────
async function run(id){
  const s=gs(id);
  const btn=document.getElementById('bg_'+id);
  btn.disabled=true;btn.textContent='⏳ Processing…';
  hideRes(id);
  try{
    switch(id){
      case 'merge':    await doMerge(s);break;
      case 'split':    await doSplit(s);break;
      case 'removepg': await doRemovePg(s);break;
      case 'extract':  await doExtract(s);break;
      case 'organize': await doOrganize(s);break;
      case 'compress': await doCompress(s);break;
      case 'repair':   await doRepair(s);break;
      case 'ocr':      await doOCR(s);break;
      case 'jpg2pdf':  await doJpg2Pdf(s);break;
      case 'word2pdf': await doWord2Pdf(s);break;
      case 'ppt2pdf':  await doPpt2Pdf(s);break;
      case 'xls2pdf':  await doXls2Pdf(s);break;
      case 'html2pdf': await doHtml2Pdf(s);break;
      case 'pdf2jpg':  await doPdf2Jpg(s);break;
      case 'pdf2word': await doPdf2Word(s);break;
      case 'pdf2xls':  await doPdf2Xls(s);break;
      case 'pdf2pdfa': await doPdf2PdfA(s);break;
      case 'rotate':   await doRotate(s);break;
      case 'watermark':await doWatermark(s);break;
      case 'pagenums': await doPageNums(s);break;
      case 'crop':     await doCrop(s);break;
      case 'editpdf':  await doEditPdf(s);break;
      case 'unlock':   await doUnlock(s);break;
      case 'protect':  await doProtect(s);break;
      case 'sign':     await doSign(s);break;
      case 'redact':   await doRedact(s);break;
      case 'compare':  await doCompare(s);break;
      case 'resize_img': await doResizeImg(s);break;
      case 'crop_img':   await doCropImg(s);break;
      case 'compress_img': await doCompressImg(s);break;
      case 'jpg2png_img': await doJpg2Png(s);break;
      case 'png2jpg_img': await doPng2Jpg(s);break;
    }
    showToast('✅','Done!','Your file is ready to download.','ok');
  }catch(e){
    console.error(e);
    showToast('❌','Error',e.message||'Something went wrong','err');
    hideP(id);
  }
  btn.disabled=false;btn.textContent=label(id);
}

// ── DOWNLOAD ─────────────────────────────────────────────────────
function doDownload(id){
  const r=gs(id).result;if(!r)return;
  if(r.type==='pdf') dlB(r.bytes,r.filename);
  else if(r.type==='zip') dlBlob(r.blob,r.filename);
  else if(r.type==='multi') r.items.forEach(x=>dlB(x.bytes,x.filename));
  else if(r.type==='txt') dlBlob(new Blob([r.text],{type:'text/plain;charset=utf-8'}),r.filename);
  addHist(id,r);
}

// ── PAGE GRID ─────────────────────────────────────────────────────
async function initPgGrid(id,file){
  const pj=window['pdfjs-dist/build/pdf'];
  pj.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const pdf=await pj.getDocument({data:await file.arrayBuffer()}).promise;
  const total=pdf.numPages, grid=document.getElementById('pgg_'+id);
  if(!grid)return;
  grid.innerHTML='';
  gs(id).selPages=new Set();
  gs(id).pgOrder=Array.from({length:total},(_,i)=>i);
  for(let i=1;i<=total;i++){
    const pg=await pdf.getPage(i),vp=pg.getViewport({scale:0.32});
    const cv=document.createElement('canvas');cv.width=vp.width;cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
    const th=document.createElement('div');th.className='pt';th.dataset.i=i-1;th.draggable=id==='organize';
    const mark=document.createElement('div');mark.className='pt-mark';mark.textContent='✕';
    const num=document.createElement('div');num.className='pt-num';num.textContent=i;
    th.append(cv,mark,num);
    if(id==='removepg') th.onclick=()=>{const s=gs(id),pi=+th.dataset.i;if(s.selPages.has(pi)){s.selPages.delete(pi);th.classList.remove('sel');}else{s.selPages.add(pi);th.classList.add('sel');}};
    grid.appendChild(th);
  }
  const pgw=document.getElementById('pgw_'+id);if(pgw)pgw.style.display='block';
  if(id==='organize')setupPgDrag(id,grid);
}
function setupPgDrag(id,grid){
  let dragging=null;
  grid.querySelectorAll('.pt').forEach(el=>{
    el.addEventListener('dragstart',()=>{dragging=el;el.style.opacity='0.35';});
    el.addEventListener('dragend',()=>{el.style.opacity='1';dragging=null;gs(id).pgOrder=[...grid.querySelectorAll('.pt')].map(x=>+x.dataset.i);});
    el.addEventListener('dragover',e=>{e.preventDefault();if(dragging&&dragging!==el){const r=el.getBoundingClientRect();grid.insertBefore(dragging,e.clientX<r.left+r.width/2?el:el.nextSibling);}});
  });
}
function pgAll(id){const s=gs(id);document.querySelectorAll('#pgg_'+id+' .pt').forEach(t=>{s.selPages.add(+t.dataset.i);t.classList.add('sel');});}
function pgClr(id){gs(id).selPages=new Set();document.querySelectorAll('#pgg_'+id+' .pt').forEach(t=>t.classList.remove('sel'));}

// ── OCR COPY ─────────────────────────────────────────────────────
function copyOCR(){
  const t=document.getElementById('ocr_text')?.textContent;
  if(!t)return;
  navigator.clipboard.writeText(t).then(()=>showToast('📋','Copied','Text copied to clipboard','info'));
}

// ── SIGN TAB (type variant) ───────────────────────────────────────
// overrides from tools.js for type-based signing
const _origDoSign=window.doSign;

// ── HISTORY ──────────────────────────────────────────────────────
let HIST=[];
function addHist(id,result){
  const t=TOOLS.find(x=>x.id===id);
  HIST.unshift({id,name:t.name,icon:t.icon,clr:t.clr,result,ts:new Date(),fn:result.filename||result.items?.[0]?.filename||'output'});
  if(HIST.length>20)HIST.pop();
  renderHist();
}
function renderHist(){
  const el=document.getElementById('histList');if(!el)return;
  if(!HIST.length){el.innerHTML='<div class="hist-empty"><span>📂</span>No operations yet. Process a file to see it here.</div>';return;}
  el.innerHTML=HIST.map((h,i)=>`<div class="hi"><div class="hi-ic" style="background:${h.clr}12;color:${h.clr}">${h.icon}</div><div class="hi-info"><div class="hi-name">${h.name} → ${h.fn}</div><div class="hi-meta">${h.ts.toLocaleString()}</div></div><button class="hi-dl" onclick="reHist(${i})">↓ Save</button></div>`).join('');
}
function reHist(i){
  const h=HIST[i];if(!h.result)return;
  if(h.result.type==='pdf') dlB(h.result.bytes,h.result.fn);
  else if(h.result.type==='zip') dlBlob(h.result.blob,h.result.fn);
  else if(h.result.type==='multi') h.result.items.forEach(x=>dlB(x.bytes,x.filename));
  else if(h.result.type==='txt') dlBlob(new Blob([h.result.text],{type:'text/plain'}),h.result.fn);
}
renderHist();

// ── TOAST ─────────────────────────────────────────────────────────
function showToast(icon,title,msg,type='info'){
  const t=document.getElementById('toast');if(!t)return;
  document.getElementById('tIcon').textContent=icon;
  document.getElementById('tTitle').textContent=title;
  document.getElementById('tMsg').textContent=msg;
  t.className=`toast ${type} on`;
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('on'),4200);
}

// ── DARK MODE ─────────────────────────────────────────────────────
document.getElementById('themeBtn')?.addEventListener('click',function(){
  document.body.classList.toggle('dark');
  this.textContent=document.body.classList.contains('dark')?'☀️':'🌙';
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
});
if(localStorage.getItem('theme')==='dark'){
  document.body.classList.add('dark');
  const btn=document.getElementById('themeBtn');if(btn)btn.textContent='☀️';
}

// ── SCROLL UTILS ──────────────────────────────────────────────────
function scrollTo(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});}

// ── SCROLL REVEAL ─────────────────────────────────────────────────
const revObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');}),{threshold:0.07,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ── COUNTER ANIM ──────────────────────────────────────────────────
document.querySelectorAll('[data-count]').forEach(el=>{
  const target=parseInt(el.dataset.count);
  const obs=new IntersectionObserver(entries=>{
    if(!entries[0].isIntersecting)return;
    let c=0;const inc=target/50;
    const t=setInterval(()=>{c=Math.min(c+inc,target);el.textContent=Math.round(c)+'+';if(c>=target)clearInterval(t);},35);
    obs.unobserve(el);
  },{threshold:0.5});
  obs.observe(el);
});

// ── COMPARE CANVAS ID FIX ────────────────────────────────────────
// Fix canvas IDs to match HTML
const origOnCmpFile=window.onCmpFile;
window.onCmpFile=async function(side,files){
  const id=`cmpC${side}`;
  const realId=`cmpCA`; // fix naming if needed
  return origOnCmpFile?origOnCmpFile(side,files):null;
};
// Patch canvas IDs in compare
async function onCmpFile(side,files){
  cmpFiles[side]=files[0];
  try{
    const pj=window['pdfjs-dist/build/pdf'];
    pj.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf=await pj.getDocument({data:await files[0].arrayBuffer()}).promise;
    const pg=await pdf.getPage(1),vp=pg.getViewport({scale:0.6});
    const cv=document.getElementById('cmpC'+side);if(!cv)return;
    cv.width=vp.width;cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
  }catch(e){console.error(e);}
  if(cmpFiles.A&&cmpFiles.B){const btn=document.getElementById('bg_compare');if(btn)btn.disabled=false;}
}
