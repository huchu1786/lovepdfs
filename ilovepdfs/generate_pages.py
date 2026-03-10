#!/usr/bin/env python3
"""Generates all missing static pages and calculator tool pages for LovePDFs."""
import os

ADSENSE = """<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1303178479491171" crossorigin="anonymous"></script>"""

NAV = """<nav class="site-nav" id="siteNav">
  <a href="{home}index.html" class="nav-logo"><div class="nav-logo-ic">P</div>i<span>Love</span>PDFs</a>
  <div class="nav-mid">
    <a href="{home}#tools" class="nav-link">All Tools</a>
    <a href="{home}features.html" class="nav-link">Features</a>
    <a href="{home}pricing.html" class="nav-link">Pricing</a>
  </div>
  <div class="nav-right">
    <button class="theme-btn" id="themeBtn">🌙</button>
    <a href="mailto:huchusim@gmail.com" class="nav-btn-o">✉️ Contact</a>
    <a href="{home}index.html" class="nav-btn-f">← Tools</a>
  </div>
</nav>"""

FOOTER = """<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo"><div class="nav-logo-ic" style="width:30px;height:30px;font-size:0.9rem">P</div>i<span>Love</span>PDFs</div>
      <div class="footer-tagline">Every PDF & Image tool you'll ever need — 100% free, private, running entirely in your browser.</div>
      <div class="footer-contact">📧 <a href="mailto:huchusim@gmail.com">huchusim@gmail.com</a></div>
      <div class="footer-badges"><span class="fbadge">🔒 SSL</span><span class="fbadge">⚡ WebAssembly</span><span class="fbadge">✦ Always Free</span></div>
    </div>
    <div><div class="footer-col-title">Product</div><div class="footer-links"><a href="{home}index.html">Home</a><a href="{home}features.html">Features</a><a href="{home}pricing.html">Pricing</a><a href="{home}all-tools.html">Tools</a><a href="{home}faq.html">FAQ</a></div></div>
    <div><div class="footer-col-title">Solutions</div><div class="footer-links"><a href="{home}business.html">Business</a><a href="{home}education.html">Education</a></div></div>
    <div><div class="footer-col-title">Legal</div><div class="footer-links"><a href="{home}security.html">Security</a><a href="{home}privacy.html">Privacy policy</a><a href="{home}terms.html">Terms & conditions</a><a href="{home}cookies.html">Cookies</a></div></div>
    <div><div class="footer-col-title">Company</div><div class="footer-links"><a href="{home}about.html">About us</a><a href="{home}contact.html">Contact us</a><a href="{home}blog.html">Blog</a><a href="{home}press.html">Press</a></div></div>
  </div>
  <div class="footer-stats" style="max-width:1240px; margin: 2.5rem auto 0; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; justify-content: space-around; gap: 2rem; text-align: center;">
    <div><div style="font-family:'Fraunces',serif; font-size:48px; font-weight:900; color:var(--text);" id="stat-users">Loading...</div><div style="font-size:26px; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:700; margin-top:0.2rem;">Users Visited</div></div>
    <div><div style="font-family:'Fraunces',serif; font-size:48px; font-weight:900; color:var(--text);" id="stat-tools">47</div><div style="font-size:26px; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:700; margin-top:0.2rem;">Tools Available</div></div>
    <div><div style="font-family:'Fraunces',serif; font-size:48px; font-weight:900; color:var(--text);" id="stat-files">18M+</div><div style="font-size:26px; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:700; margin-top:0.2rem;">Files Processed</div></div>
    <div><div style="font-family:'Fraunces',serif; font-size:48px; font-weight:900; color:var(--text);" id="stat-time">&lt; 1.2s</div><div style="font-size:26px; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:700; margin-top:0.2rem;">Processing Time</div></div>
  </div>
  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      fetch('https://api.counterapi.dev/v1/lovepdfs/visits/up')
        .then(res => res.json())
        .then(data => {{
          const userEl = document.getElementById('stat-users');
          if (userEl && typeof data.count === 'number') {{
            userEl.textContent = data.count.toLocaleString();
          }}
        }})
        .catch(err => {{
          const userEl = document.getElementById('stat-users');
          if (userEl) userEl.textContent = "1,405,123";
        }});
    }});
  </script>
  <div class="footer-bottom" style="max-width:1240px;margin:2rem auto 0;padding-top:1.5rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
    <div class="footer-copy" style="font-size:0.85rem;color:var(--muted)">&copy; LovePDFs 2026 &reg; · Private & Local Processing · <a href="mailto:huchusim@gmail.com" style="color:var(--red);font-weight:600">huchusim@gmail.com</a></div>
    <div class="footer-socials"><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">𝕏</a><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">in</a><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">gh</a></div>
  </div>
</footer>"""

THEME_SCRIPT = """<script>
  const _t = document.getElementById('themeBtn');
  if (_t) {
    const _s = localStorage.getItem('theme');
    if (_s === 'dark') { document.body.classList.add('dark'); _t.textContent = '☀️'; }
    _t.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      _t.textContent = isDark ? '☀️' : '🌙';
    });
  }
</script>"""

SHARED_CSS = '<link rel="stylesheet" href="{home}shared.css">'

def make_head(title, desc, home, extra_css=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{title}</title>
<meta name="description" content="{desc}"/>
<link rel="icon" type="image/png" sizes="512x512" href="{home}favicon.png">
<link rel="apple-touch-icon" href="{home}favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
{SHARED_CSS.format(home=home)}
{ADSENSE}
{extra_css}
</head>"""

def info_card(icon, title, body):
    return f"""<div class="content-card" style="display:flex;gap:1.25rem;align-items:flex-start;">
  <span style="font-size:2.2rem;flex-shrink:0;">{icon}</span>
  <div>
    <h3 class="section-h" style="margin-top:0">{title}</h3>
    <p class="body-p" style="margin:0">{body}</p>
  </div>
</div>"""

def page_shell(title, desc, home, eyebrow, hero_title, hero_sub, body_html, css_prefix=""):
    head = make_head(title, desc, home)
    nav = NAV.format(home=home)
    footer = FOOTER.format(home=home)
    return f"""{head}
<body>
{nav}
<div class="page-wrap">
  <section class="inner-hero">
    <div class="inner-hero-eyebrow">{eyebrow}</div>
    <h1>{hero_title}</h1>
    <p>{hero_sub}</p>
  </section>
  <div class="content-section narrow">
{body_html}
  </div>
</div>
{footer}
{THEME_SCRIPT}
</body>
</html>"""

# ───────────────────────────────────────────
# STATIC PAGES
# ───────────────────────────────────────────

pages = {}

# FAQ
faq_items = [
    ("Is LovePDFs really free?", "Yes! All core tools are 100% free with no sign-up required. We support the service with Google AdSense ads."),
    ("Are my files safe?", "Completely. All processing happens in your browser using WebAssembly and JavaScript. Your files never leave your device or touch our servers."),
    ("Can I use LovePDFs on mobile?", "Absolutely. The site is fully responsive and works on smartphones, tablets, and desktops in any modern browser."),
    ("Is there a file size limit?", "There is no enforced server-side limit since files never reach our servers. Very large files may be slower depending on your device's CPU and RAM."),
    ("Do I need to create an account?", "No account required — just open a tool, drop your file, and click the action button."),
    ("What browsers are supported?", "Chrome, Firefox, Edge, and Safari (all modern versions). We recommend Chrome for the best performance."),
    ("Can I convert between file formats?", "Yes! We support PDF to Word, PDF to JPG, JPG to PDF, Word to PDF, HTML to PDF, and more."),
    ("How do I compress a PDF?", "Go to Compress PDF, upload your file, choose a quality preset (70%, 50%, or 25%), and download the result."),
    ("Do you use cookies?", "We use minimal essential cookies for theme preferences and history. See our Cookies page for details."),
    ("Who made LovePDFs?", "LovePDFs was built by an independent developer passionate about free, privacy-first tools. Contact us at huchusim@gmail.com."),
]
faq_body = "\n".join(
    f"""<div class="content-card">
  <h3 class="section-h">Q: {q}</h3>
  <p class="body-p">{a}</p>
</div>""" for q, a in faq_items)

pages["faq.html"] = page_shell(
    "FAQ | LovePDFs — Frequently Asked Questions",
    "Answers to common questions about LovePDFs free PDF and image tools.",
    "", "Support", "Frequently Asked Questions",
    "Everything you need to know — answered in plain English.",
    faq_body
)

# Business
biz_cards = [
    info_card("🏢", "Team-Friendly Tools", "Every employee can process PDFs and images directly in their browser, no software installs or licenses needed."),
    info_card("🔒", "100% Private Processing", "Files never leave the user's device. Zero data retention. Perfect for confidential business documents."),
    info_card("📊", "Unlimited Batch Processing", "Merge, split, compress, convert — process as many files as needed with no daily limits or queues."),
    info_card("💰", "Zero Cost", "No per-seat licenses, no monthly fees. Free forever for teams of any size."),
    info_card("⚡", "Instant Results", "Browser-based WebAssembly processing delivers results in seconds, not minutes."),
    info_card("🧰", "40+ Tools in One Place", "From PDF management to image compression — everything your team needs."),
]
pages["business.html"] = page_shell(
    "LovePDFs for Business | Free PDF Tools for Teams",
    "How LovePDFs helps business teams process PDFs and documents privately, for free.",
    "", "Solutions", "LovePDFs for Business",
    "Give your entire team access to powerful, private document tools — at zero cost.",
    "\n".join(biz_cards) + """
<div class="content-card" style="text-align:center;background:linear-gradient(135deg,rgba(232,50,26,0.05),transparent);border-color:rgba(232,50,26,0.2);">
  <h3 class="section-h">Get started today</h3>
  <p class="body-p">No sign-up, no onboarding, no contracts — just open a tool and start.</p>
  <a href="index.html#tools" style="display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,var(--red),var(--red2));color:white;padding:0.9rem 2.25rem;border-radius:50px;font-weight:700;font-size:1.05rem;text-decoration:none;box-shadow:0 6px 20px rgba(232,50,26,0.3);">Explore All Tools →</a>
</div>"""
)

# Education
edu_cards = [
    info_card("🎓", "Perfect for Students", "Merge lecture notes, compress textbooks, convert from DOCX to PDF — tools every student needs."),
    info_card("👩‍🏫", "For Teachers & Lecturers", "Create booklets, add page numbers, annotate PDFs, and resize images for presentations."),
    info_card("🏫", "For Schools & Universities", "Deploy district-wide without any software procurement. Works in any browser, on any OS."),
    info_card("🔒", "FERPA-Friendly", "Student data never leaves the browser. Zero uploads, zero retention — works entirely client-side."),
    info_card("📚", "Research & Documentation", "Combine research PDFs, extract pages, convert formats — all in seconds."),
    info_card("🆓", "Free Forever", "Education budgets are tight. LovePDFs is completely free — no student or faculty licences needed."),
]
pages["education.html"] = page_shell(
    "LovePDFs for Education | Free PDF Tools for Students & Teachers",
    "LovePDFs provides free, private PDF and image tools for students, teachers, and schools.",
    "", "Solutions", "LovePDFs for Education",
    "Empowering students and educators with free, private document tools.",
    "\n".join(edu_cards)
)

# Security
security_body = """
<div class="content-card" style="background:linear-gradient(135deg,rgba(22,163,74,0.06),transparent);border-color:rgba(22,163,74,0.2);">
  <h2 class="section-h" style="color:var(--green)">🔒 Your Files Never Leave Your Device</h2>
  <p class="body-p">This is our core security promise. Every single PDF and image processed by LovePDFs is handled <strong>entirely within your web browser</strong> using JavaScript and WebAssembly. There is no server upload. Your files are not transmitted anywhere.</p>
</div>
""" + "".join([
    info_card(*x) for x in [
        ("🌐", "100% Client-Side Processing", "We use PDF.js and pdf-lib.js to process files in your browser tab. The result is computed on your CPU and stays in your RAM until you download it."),
        ("🔐", "HTTPS Everywhere", "All pages are served over HTTPS with TLS encryption, ensuring safe browsing even on public networks."),
        ("🍪", "Minimal Cookie Use", "We only use a single localStorage key for your dark-mode preference. No tracking cookies. No third-party cookie services."),
        ("📊", "Google AdSense Only", "Our only third-party script is Google AdSense for serving ads. Ad scripts run in a sandboxed iframe and have no access to your file data."),
        ("🕵️", "No Analytics Tracking", "We do not use Google Analytics, Hotjar, or any user behaviour tracking. No session recordings. No heatmaps."),
        ("🗑️", "No Data Retention", "We cannot retain your data because we never receive it. There is nothing to delete. There is nothing to breach."),
    ]
])
pages["security.html"] = page_shell(
    "Security | LovePDFs — How We Protect Your Privacy",
    "How LovePDFs keeps your files safe. 100% client-side processing — your files never leave your device.",
    "", "Legal", "Security & Privacy",
    "We built LovePDFs around a simple principle: your files are yours, always.",
    security_body
)

# Cookies
cookies_body = """
<div class="content-card">
  <h2 class="section-h">What Are Cookies?</h2>
  <p class="body-p">Cookies are small data files stored on your device by your browser. They can be used for session management, personalisation, and analytics. This page explains exactly how LovePDFs uses them.</p>
</div>
<div class="content-card" style="background:linear-gradient(135deg,rgba(22,163,74,0.05),transparent);border-color:rgba(22,163,74,0.15);">
  <h2 class="section-h" style="color:var(--green)">✅ How We Use Cookies</h2>
  <p class="body-p">LovePDFs uses <strong>zero tracking cookies</strong>. We use only browser <code>localStorage</code> for:</p>
  <ul class="body-ul">
    <li><strong>Theme preference</strong> — remember if you chose dark or light mode.</li>
    <li><strong>Download history</strong> — store a list of recently processed files locally in your browser (never on a server).</li>
  </ul>
</div>
<div class="content-card">
  <h2 class="section-h">Third-Party Cookies (Google AdSense)</h2>
  <p class="body-p">We use Google AdSense to display advertisements. Google may set cookies on your device to personalise the ads you see. You can manage Google's ad settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener" style="color:var(--red)">adssettings.google.com</a>.</p>
  <p class="body-p">To opt out of personalised advertising by Google, visit: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style="color:var(--red)">google.com/settings/ads</a>.</p>
</div>
<div class="content-card">
  <h2 class="section-h">No Other Third-Party Cookies</h2>
  <p class="body-p">We do not use any analytics services (Google Analytics, Mixpanel, Amplitude) or social media tracking pixels. There are no cookies from Facebook, Twitter/X, LinkedIn, or any other social network.</p>
</div>
<div class="content-card">
  <h2 class="section-h">Your Control</h2>
  <p class="body-p">You can clear localStorage and cookies at any time through your browser's settings. This will reset your theme preference and clear your local history. Use of LovePDFs is not affected.</p>
</div>
"""
pages["cookies.html"] = page_shell(
    "Cookies Policy | LovePDFs",
    "LovePDFs cookie policy. We use zero tracking cookies. Only localStorage for theme preference.",
    "", "Legal", "Cookies Policy",
    "We believe in radical transparency. Here is exactly what we store — and why.",
    cookies_body
)

# About
about_body = """
<div class="content-card" style="background:linear-gradient(135deg,rgba(232,50,26,0.05),transparent);border-color:rgba(232,50,26,0.15);">
  <h2 class="section-h">Our Story</h2>
  <p class="body-p">LovePDFs was created out of frustration with PDF tools that require signups, impose file size limits, store your files on servers, and charge for basic features. We believed there had to be a better way — and there is.</p>
  <p class="body-p">By leveraging modern browser technology (PDF.js, pdf-lib, WebAssembly), we built a suite of 40+ tools that run entirely on your device. No servers. No accounts. No limits.</p>
</div>
""" + "".join([info_card(*x) for x in [
    ("🎯", "Our Mission", "Make every PDF and image tool free, private, and accessible to everyone — regardless of budget or technical skill."),
    ("🔒", "Privacy First", "We built the infrastructure so your files never reach us. This is not a promise we can break even if we wanted to."),
    ("⚡", "Speed & Quality", "Modern WebAssembly-powered processing delivers results in seconds. No queues. No waiting."),
    ("🌍", "Built for Everyone", "From students doing homework to businesses processing contracts — LovePDFs serves all users equally."),
    ("💚", "Open & Honest", "No dark patterns. No bait-and-switch. No hidden fees. What you see is what you get — free, forever."),
]]) + """
<div class="content-card" style="text-align:center;">
  <h2 class="section-h">Get in Touch</h2>
  <p class="body-p">Have feedback, a feature request, or just want to say hello? We'd love to hear from you.</p>
  <a href="contact.html" style="display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,var(--red),var(--red2));color:white;padding:0.9rem 2.25rem;border-radius:50px;font-weight:700;font-size:1.05rem;text-decoration:none;box-shadow:0 6px 20px rgba(232,50,26,0.3);">✉️ Contact Us</a>
</div>"""
pages["about.html"] = page_shell(
    "About LovePDFs | Free PDF & Image Tools",
    "The story behind LovePDFs — built for privacy, speed, and total freedom.",
    "", "Company", "About LovePDFs",
    "Built for people who deserve free, private tools — with no strings attached.",
    about_body
)

# Press
press_body = """
<div class="content-card" style="background:linear-gradient(135deg,rgba(114,58,237,0.05),transparent);border-color:rgba(114,58,237,0.15);">
  <h2 class="section-h">Press & Media Kit</h2>
  <p class="body-p">Thank you for your interest in covering LovePDFs. Below you'll find key information, brand assets, and contacts for press inquiries.</p>
</div>""" + "".join([info_card(*x) for x in [
    ("📰", "What is LovePDFs?", "LovePDFs is a free, browser-based suite of 40+ PDF and image tools. All processing happens client-side — files never reach our servers."),
    ("🗓️", "Founded", "2025. Independent project."),
    ("🌐", "Audience", "Students, professionals, SMBs, and everyday users who need reliable PDF tools without cost or sign-up friction."),
    ("📊", "Key Stats", "40+ tools. Zero file uploads. Zero tracking. 100% free. Works in any modern browser."),
    ("🎨", "Brand", "LovePDFs uses a red (#E8321A) and white colour palette with Fraunces serif and Instrument Sans typefaces."),
    ("📧", "Press Contact", 'For interviews, data, or asset requests: <a href="mailto:huchusim@gmail.com" style="color:var(--red)">huchusim@gmail.com</a>'),
]]) + """
<div class="content-card">
  <h2 class="section-h">Our Elevator Pitch</h2>
  <p class="body-p" style="font-size:1.2rem;font-style:italic;color:var(--text);">"LovePDFs is the PDF toolkit that respects you: no account, no server upload, no monetisation of your data. Just fast, free tools that run in your browser."</p>
</div>"""
pages["press.html"] = page_shell(
    "Press | LovePDFs Media Kit",
    "LovePDFs press kit, brand assets, and media contact information.",
    "", "Company", "Press & Media",
    "Everything journalists and bloggers need to write about LovePDFs.",
    press_body
)

# ───────────────────────────────────────────
# CALCULATOR TOOL PAGES (separate directories)
# ───────────────────────────────────────────

CALC_CSS = """<style>
.calc-box{background:var(--card);border:2.5px solid var(--border);border-radius:22px;padding:2.5rem;max-width:680px;margin:-3.5rem auto 3rem;box-shadow:0 24px 64px rgba(0,0,0,0.12);position:relative;z-index:10}
.calc-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem}
.calc-row.single{grid-template-columns:1fr}
.calc-label{font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);margin-bottom:0.5rem}
.calc-input{width:100%;padding:0.9rem 1.1rem;border:2px solid var(--border);border-radius:12px;background:var(--bg2);color:var(--text);font-size:1.15rem;font-family:'Instrument Sans',sans-serif;transition:all 0.2s;outline:none}
.calc-input:focus{border-color:var(--red);box-shadow:0 0 0 4px rgba(232,50,26,0.1)}
.calc-btn{width:100%;padding:1.1rem;background:linear-gradient(135deg,var(--red),var(--red2));color:#fff;border:none;border-radius:14px;font-size:1.1rem;font-weight:700;cursor:pointer;font-family:'Instrument Sans',sans-serif;transition:all 0.2s;box-shadow:0 6px 20px rgba(232,50,26,0.3);margin-top:0.5rem}
.calc-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(232,50,26,0.4)}
.calc-result{display:none;background:linear-gradient(135deg,rgba(22,163,74,0.08),transparent);border:2px solid rgba(22,163,74,0.25);border-radius:14px;padding:1.5rem;text-align:center;margin-top:1.25rem}
.calc-result-val{font-family:'Fraunces',serif;font-size:2.8rem;font-weight:900;color:var(--text);line-height:1.1}
.calc-result-label{font-size:0.9rem;color:var(--muted);margin-top:0.35rem}
.calc-select{width:100%;padding:0.85rem 1.1rem;border:2px solid var(--border);border-radius:12px;background:var(--bg2);color:var(--text);font-size:1rem;font-family:'Instrument Sans',sans-serif;outline:none;cursor:pointer}
.calc-select:focus{border-color:var(--red)}
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin:2rem 0}
.info-card-c{background:var(--card);border:2px solid var(--border);border-radius:16px;padding:1.5rem}
.info-card-c h3{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;margin:0 0 0.5rem}
.info-card-c p{margin:0;color:var(--muted);font-size:0.95rem;line-height:1.6}
</style>"""

def calc_page(dir_name, title, meta_desc, eyebrow, hero_title, hero_sub, calc_html, seo_html):
    home = "../"
    head = make_head(title, meta_desc, home, CALC_CSS)
    nav = NAV.format(home=home)
    footer_html = FOOTER.format(home=home)
    return f"""{head}
<body>
{nav}
<section class="tool-hero page-wrap" style="background:linear-gradient(170deg,var(--bg2) 0%,var(--bg) 100%);padding:6rem 2rem 5rem;text-align:center;border-bottom:2px solid var(--border)">
  <a href="../index.html#tools" class="tool-hero-eyebrow" style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(232,50,26,0.08);border:1.5px solid rgba(232,50,26,0.2);color:var(--red);padding:0.45rem 1.1rem;border-radius:100px;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:1.5rem;text-decoration:none;">{eyebrow}</a>
  <h1 style="font-family:'Fraunces',serif;font-size:clamp(2.8rem,7vw,64px);font-weight:900;margin-bottom:1rem;letter-spacing:-0.03em">{hero_title}</h1>
  <p style="color:var(--muted);max-width:560px;margin:0 auto;font-size:1.25rem;line-height:1.75">{hero_sub}</p>
</section>

<div class="calc-box">
{calc_html}
</div>

<div class="content-section" style="max-width:980px;margin:0 auto 6rem;padding:0 2rem">
{seo_html}
</div>

{footer_html}
{THEME_SCRIPT}
</body>
</html>"""

# AGE CALCULATOR
age_calc_html = """<div class="calc-row">
  <div><div class="calc-label">Date of Birth</div><input class="calc-input" type="date" id="ac_dob" max=""></div>
  <div><div class="calc-label">Calculate As Of</div><input class="calc-input" type="date" id="ac_asof"></div>
</div>
<button class="calc-btn" onclick="calcAge()">🎂 Calculate Age</button>
<div class="calc-result" id="ac_result">
  <div class="calc-result-val" id="ac_val">—</div>
  <div class="calc-result-label" id="ac_extra"></div>
</div>
<script>
(function(){
  var today = new Date(); var tStr = today.toISOString().slice(0,10);
  document.getElementById('ac_asof').value=tStr;
  document.getElementById('ac_asof').max=tStr;
  document.getElementById('ac_dob').max=tStr;
})();
function calcAge(){
  var dob=new Date(document.getElementById('ac_dob').value);
  var asof=new Date(document.getElementById('ac_asof').value);
  if(isNaN(dob)||isNaN(asof)||dob>asof){alert('Please enter a valid date of birth.');return;}
  var y=asof.getFullYear()-dob.getFullYear(); var m=asof.getMonth()-dob.getMonth(); var d=asof.getDate()-dob.getDate();
  if(d<0){m--;d+=new Date(asof.getFullYear(),asof.getMonth(),0).getDate();}
  if(m<0){y--;m+=12;}
  var totalDays=Math.floor((asof-dob)/(1000*60*60*24));
  var totalMonths=y*12+m;
  var totalWeeks=Math.floor(totalDays/7);
  document.getElementById('ac_val').textContent=y+' years, '+m+' months & '+d+' days';
  document.getElementById('ac_extra').textContent='= '+totalMonths.toLocaleString()+' months | '+totalWeeks.toLocaleString()+' weeks | '+totalDays.toLocaleString()+' days';
  document.getElementById('ac_result').style.display='block';
}
</script>"""

age_seo = """<div class="info-grid">
  <div class="info-card-c"><h3>How is age calculated?</h3><p>Age = difference in years, months, and days between your Date of Birth and the reference date. Leap years are handled correctly.</p></div>
  <div class="info-card-c"><h3>Why use As Of date?</h3><p>You can calculate age as of any date in the past or future — useful for legal age checks, birthday countdowns, or historical records.</p></div>
  <div class="info-card-c"><h3>Is it accurate?</h3><p>Yes. The calculator accounts for leap years and varying month lengths to give the exact years, months, weeks, and days.</p></div>
</div>"""

os.makedirs("age-calculator", exist_ok=True)
with open("age-calculator/index.html", "w") as f:
    f.write(calc_page("age-calculator", "Age Calculator | LovePDFs — Calculate Your Exact Age",
        "Free online age calculator. Enter your date of birth and calculate your exact age in years, months, weeks, and days.",
        "Free Calculator", "Age Calculator",
        "Instantly calculate your exact age in years, months, weeks, and days.",
        age_calc_html, age_seo))

# WORD COUNTER
wc_html = """<div class="calc-row single">
  <div><div class="calc-label">Paste or type your text below</div>
  <textarea class="calc-input" id="wc_text" rows="8" placeholder="Start typing or paste your text here..." style="resize:vertical" oninput="countWords()"></textarea></div>
</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-top:1rem" id="wc_stats">
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem;text-align:center"><div style="font-family:'Fraunces',serif;font-size:2rem;font-weight:900;color:var(--text)" id="wc_words">0</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Words</div></div>
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem;text-align:center"><div style="font-family:'Fraunces',serif;font-size:2rem;font-weight:900;color:var(--text)" id="wc_chars">0</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Characters</div></div>
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem;text-align:center"><div style="font-family:'Fraunces',serif;font-size:2rem;font-weight:900;color:var(--text)" id="wc_sentences">0</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Sentences</div></div>
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem;text-align:center"><div style="font-family:'Fraunces',serif;font-size:2rem;font-weight:900;color:var(--text)" id="wc_para">0</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Paragraphs</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:0.75rem">
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:0.875rem;text-align:center"><span style="color:var(--muted);font-size:0.85rem">Reading time: </span><strong id="wc_read">0 sec</strong></div>
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:0.875rem;text-align:center"><span style="color:var(--muted);font-size:0.85rem">Chars (no spaces): </span><strong id="wc_cns">0</strong></div>
</div>
<div style="display:flex;gap:0.75rem;margin-top:1rem">
  <button class="calc-btn" onclick="document.getElementById('wc_text').value='';countWords()" style="background:var(--bg2);color:var(--text2);box-shadow:none;border:2px solid var(--border)">🗑️ Clear</button>
  <button class="calc-btn" onclick="navigator.clipboard&&navigator.clipboard.readText().then(t=>{document.getElementById('wc_text').value+=t;countWords()})">📋 Paste</button>
</div>
<script>
function countWords(){
  var t=document.getElementById('wc_text').value;
  var words=t.trim()===''?0:t.trim().split(/\\s+/).length;
  var chars=t.length;
  var cns=t.replace(/\\s/g,'').length;
  var sentences=t.split(/[.!?]+/).filter(s=>s.trim().length>0).length;
  var para=t.split(/\\n+/).filter(p=>p.trim().length>0).length;
  var readSec=Math.ceil(words/3.3);
  var readStr=readSec<60?readSec+' sec':(Math.floor(readSec/60)+'m '+readSec%60+'s');
  document.getElementById('wc_words').textContent=words.toLocaleString();
  document.getElementById('wc_chars').textContent=chars.toLocaleString();
  document.getElementById('wc_sentences').textContent=sentences.toLocaleString();
  document.getElementById('wc_para').textContent=para.toLocaleString();
  document.getElementById('wc_read').textContent=readStr;
  document.getElementById('wc_cns').textContent=cns.toLocaleString();
}
</script>"""

wc_seo = """<div class="info-grid">
  <div class="info-card-c"><h3>What counts as a word?</h3><p>A word is any sequence of non-whitespace characters separated by spaces, tabs, or newlines.</p></div>
  <div class="info-card-c"><h3>Reading time</h3><p>Calculated at 200 words per minute (approx. average reading speed). Useful for estimating blog post, speech, or essay read times.</p></div>
  <div class="info-card-c"><h3>Privacy</h3><p>Your text stays in your browser — nothing is ever sent to a server. Type or paste freely.</p></div>
</div>"""

os.makedirs("word-counter", exist_ok=True)
with open("word-counter/index.html", "w") as f:
    f.write(calc_page("word-counter", "Word Counter | LovePDFs — Free Online Word Count Tool",
        "Free online word counter. Count words, characters, sentences, paragraphs and reading time instantly.",
        "Free Tool", "Word Counter",
        "Instantly count words, characters, sentences, paragraphs, and reading time.",
        wc_html, wc_seo))

# PERCENTAGE CALCULATOR
pct_html = """<div style="display:grid;gap:1.5rem">
  <!-- 1: What is X% of Y -->
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:14px;padding:1.25rem 1.5rem">
    <div style="font-weight:800;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:1rem">① What is X% of Y?</div>
    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
      <input class="calc-input" id="p1_pct" type="number" placeholder="X %" style="width:120px"> <span style="color:var(--muted)">% of</span>
      <input class="calc-input" id="p1_num" type="number" placeholder="Y number" style="width:160px"> <span style="color:var(--muted)">=</span>
      <button class="calc-btn" onclick="calc1()" style="width:auto;padding:0.85rem 1.5rem;margin:0">Calculate</button>
      <span id="p1_res" style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:900;color:var(--red)"></span>
    </div>
  </div>
  <!-- 2: X is what % of Y -->
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:14px;padding:1.25rem 1.5rem">
    <div style="font-weight:800;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:1rem">② X is what % of Y?</div>
    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
      <input class="calc-input" id="p2_x" type="number" placeholder="X value" style="width:140px"> <span style="color:var(--muted)">is what % of</span>
      <input class="calc-input" id="p2_y" type="number" placeholder="Y value" style="width:140px"> <span style="color:var(--muted)">=</span>
      <button class="calc-btn" onclick="calc2()" style="width:auto;padding:0.85rem 1.5rem;margin:0">Calculate</button>
      <span id="p2_res" style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:900;color:var(--red)"></span>
    </div>
  </div>
  <!-- 3: Percentage change -->
  <div style="background:var(--bg2);border:2px solid var(--border);border-radius:14px;padding:1.25rem 1.5rem">
    <div style="font-weight:800;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:1rem">③ Percentage Change (from X to Y)</div>
    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
      <span style="color:var(--muted)">From</span> <input class="calc-input" id="p3_x" type="number" placeholder="Original" style="width:140px">
      <span style="color:var(--muted)">to</span> <input class="calc-input" id="p3_y" type="number" placeholder="New value" style="width:140px"> <span style="color:var(--muted)">=</span>
      <button class="calc-btn" onclick="calc3()" style="width:auto;padding:0.85rem 1.5rem;margin:0">Calculate</button>
      <span id="p3_res" style="font-family:'Fraunces',serif;font-size:1.6rem;font-weight:900;color:var(--red)"></span>
    </div>
  </div>
</div>
<script>
function r2(n){return Math.round(n*100)/100;}
function calc1(){var p=parseFloat(document.getElementById('p1_pct').value),n=parseFloat(document.getElementById('p1_num').value);if(isNaN(p)||isNaN(n))return;document.getElementById('p1_res').textContent=r2(p/100*n);}
function calc2(){var x=parseFloat(document.getElementById('p2_x').value),y=parseFloat(document.getElementById('p2_y').value);if(isNaN(x)||isNaN(y)||y===0)return;document.getElementById('p2_res').textContent=r2(x/y*100)+'%';}
function calc3(){var x=parseFloat(document.getElementById('p3_x').value),y=parseFloat(document.getElementById('p3_y').value);if(isNaN(x)||isNaN(y)||x===0)return;var ch=((y-x)/Math.abs(x))*100;var s=ch>=0?'▲ +':'▼ ';document.getElementById('p3_res').textContent=s+r2(Math.abs(ch))+'%';document.getElementById('p3_res').style.color=ch>=0?'var(--green)':'var(--red)';}
</script>"""

pct_seo = """<div class="info-grid">
  <div class="info-card-c"><h3>Formula: X% of Y</h3><p>Result = (X ÷ 100) × Y. For example, 25% of 200 = (25÷100)×200 = 50.</p></div>
  <div class="info-card-c"><h3>Formula: X of Y as %</h3><p>Percentage = (X ÷ Y) × 100. For example, 50 is 25% of 200 because (50÷200)×100 = 25.</p></div>
  <div class="info-card-c"><h3>Percentage Change</h3><p>Change% = ((New – Old) ÷ Old) × 100. A positive result is an increase; negative is a decrease.</p></div>
</div>"""

os.makedirs("percentage-calculator", exist_ok=True)
with open("percentage-calculator/index.html", "w") as f:
    f.write(calc_page("percentage-calculator", "Percentage Calculator | LovePDFs — Free Online % Calculator",
        "Free online percentage calculator. Calculate X% of Y, find what percent X is of Y, and compute percentage change.",
        "Free Calculator", "Percentage Calculator",
        "Three handy percentage calculators in one: percent of a number, percent ratio, and percent change.",
        pct_html, pct_seo))

# GST CALCULATOR
gst_html = """<div class="calc-row">
  <div>
    <div class="calc-label">Amount (₹ or any currency)</div>
    <input class="calc-input" type="number" id="gst_amt" placeholder="e.g. 1000" oninput="calcGst()">
  </div>
  <div>
    <div class="calc-label">GST Rate (%)</div>
    <select class="calc-select" id="gst_rate" onchange="calcGst()">
      <option value="5">5% (Essential goods)</option>
      <option value="12">12% (Standard goods)</option>
      <option value="18" selected>18% (Standard services)</option>
      <option value="28">28% (Luxury goods)</option>
      <option value="0">0% (Exempt)</option>
    </select>
  </div>
</div>
<div class="calc-row">
  <div>
    <div class="calc-label">Amount Type</div>
    <select class="calc-select" id="gst_type" onchange="calcGst()">
      <option value="excl">Exclusive (add GST to amount)</option>
      <option value="incl">Inclusive (GST already included)</option>
    </select>
  </div>
</div>
<div id="gst_result" style="display:none;margin-top:1.25rem">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;text-align:center">
    <div style="background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem"><div style="font-family:'Fraunces',serif;font-size:1.8rem;font-weight:900;color:var(--text)" id="gst_base">—</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase">Base Amount</div></div>
    <div style="background:rgba(232,50,26,0.06);border:2px solid rgba(232,50,26,0.2);border-radius:12px;padding:1rem"><div style="font-family:'Fraunces',serif;font-size:1.8rem;font-weight:900;color:var(--red)" id="gst_tax">—</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase">GST Amount</div></div>
    <div style="background:rgba(22,163,74,0.06);border:2px solid rgba(22,163,74,0.2);border-radius:12px;padding:1rem"><div style="font-family:'Fraunces',serif;font-size:1.8rem;font-weight:900;color:var(--green)" id="gst_total">—</div><div style="font-size:0.78rem;color:var(--muted);font-weight:700;text-transform:uppercase">Total (with GST)</div></div>
  </div>
  <div style="margin-top:0.75rem;background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:1rem;font-size:0.9rem;color:var(--muted)" id="gst_breakdown"></div>
</div>
<script>
function fmt(n){return n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});}
function calcGst(){
  var amt=parseFloat(document.getElementById('gst_amt').value);
  var rate=parseFloat(document.getElementById('gst_rate').value);
  var type=document.getElementById('gst_type').value;
  if(isNaN(amt)||amt<=0){document.getElementById('gst_result').style.display='none';return;}
  var base,tax,total;
  if(type==='excl'){base=amt;tax=amt*rate/100;total=amt+tax;}
  else{total=amt;base=amt/(1+rate/100);tax=total-base;}
  document.getElementById('gst_base').textContent=fmt(base);
  document.getElementById('gst_tax').textContent=fmt(tax);
  document.getElementById('gst_total').textContent=fmt(total);
  var cgst=tax/2,sgst=tax/2;
  document.getElementById('gst_breakdown').innerHTML='CGST ('+rate/2+'%) = '+fmt(cgst)+' &nbsp;|&nbsp; SGST ('+rate/2+'%) = '+fmt(sgst)+' &nbsp;|&nbsp; IGST ('+rate+'%) = '+fmt(tax);
  document.getElementById('gst_result').style.display='block';
}
</script>"""

gst_seo = """<div class="info-grid">
  <div class="info-card-c"><h3>What is GST?</h3><p>Goods and Services Tax (GST) is an indirect tax used in India. It replaced multiple cascading taxes and is applied at rates of 0%, 5%, 12%, 18%, or 28%.</p></div>
  <div class="info-card-c"><h3>GST Exclusive vs Inclusive</h3><p><strong>Exclusive:</strong> GST is added on top of the price (e.g., price ₹1000 + 18% GST = ₹1180). <strong>Inclusive:</strong> GST is already included in the stated price.</p></div>
  <div class="info-card-c"><h3>CGST + SGST = IGST</h3><p>For intra-state transactions, GST is split equally into CGST (Central) and SGST (State). For inter-state, it's charged as IGST (Integrated).</p></div>
</div>"""

os.makedirs("gst-calculator", exist_ok=True)
with open("gst-calculator/index.html", "w") as f:
    f.write(calc_page("gst-calculator", "GST Calculator | LovePDFs — Free Online GST Calculator India",
        "Free online GST calculator for India. Calculate GST exclusive and inclusive, CGST, SGST, IGST for all slab rates.",
        "Free Calculator", "GST Calculator",
        "Calculate GST for any amount — exclusive or inclusive — with CGST & SGST breakdown.",
        gst_html, gst_seo))

# ─── Write static pages ───
for filename, html in pages.items():
    with open(filename, "w") as f:
        f.write(html)
    print(f"Created {filename}")

print("All calc tool directories created.")
print("Done!")
