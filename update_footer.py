import os
import re

footer_template = """<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo"><div class="nav-logo-ic" style="width:30px;height:30px;font-size:0.9rem">P</div>i<span>Love</span>PDFs</div>
      <div class="footer-tagline">Every PDF & Image tool you'll ever need — 100% free, private, running entirely in your browser.</div>
      <div class="footer-contact">📧 <a href="mailto:huchusim@gmail.com">huchusim@gmail.com</a></div>
      <div class="footer-badges"><span class="fbadge">🔒 SSL</span><span class="fbadge">⚡ WebAssembly</span><span class="fbadge">✦ Always Free</span></div>
    </div>
    <div><div class="footer-col-title">Product</div><div class="footer-links"><a href="{prefix}index.html">Home</a><a href="{prefix}features.html">Features</a><a href="{prefix}pricing.html">Pricing</a><a href="{prefix}index.html#tools">Tools</a><a href="{prefix}faq.html">FAQ</a></div></div>
    <div><div class="footer-col-title">Solutions</div><div class="footer-links"><a href="{prefix}business.html">Business</a><a href="{prefix}education.html">Education</a></div></div>
    <div><div class="footer-col-title">Legal</div><div class="footer-links"><a href="{prefix}security.html">Security</a><a href="{prefix}privacy.html">Privacy policy</a><a href="{prefix}terms.html">Terms & conditions</a><a href="{prefix}cookies.html">Cookies</a></div></div>
    <div><div class="footer-col-title">Company</div><div class="footer-links"><a href="{prefix}about.html">About us</a><a href="{prefix}contact.html">Contact us</a><a href="{prefix}blog.html">Blog</a><a href="{prefix}press.html">Press</a></div></div>
  </div>
  <div class="footer-bottom" style="max-width:1240px;margin:2rem auto 0;padding-top:1.5rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
    <div class="footer-copy" style="font-size:0.8rem;color:var(--muted)">&copy; LovePDFs 2026 &reg; · Private & Local Processing · <a href="mailto:huchusim@gmail.com" style="color:var(--red);font-weight:600">huchusim@gmail.com</a></div>
    <div class="footer-socials"><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">𝕏</a><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">in</a><a href="#" class="soc-btn" style="text-decoration:none;margin-left:8px">gh</a></div>
  </div>
</footer>"""

pattern = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL)

for root, _, files in os.walk('.'):
    for filename in files:
        if filename.endswith('.html'):
            filepath = os.path.join(root, filename)
            
            # Skip hidden dirs or node_modules if any
            if '/.' in filepath or '/node_modules' in filepath:
                continue

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Determine prefix: if in a subdirectory (e.g. ./merge-pdf/index.html), we need "../"
            depth = filepath.count(os.sep) - 1 # "./file.html" depth=0, "./dir/file.html" depth=1
            prefix = "../" * depth
            
            new_footer = footer_template.replace('{prefix}', prefix)
            
            if pattern.search(content):
                new_content = pattern.sub(new_footer, content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated footer in {filepath}")
            else:
                print(f"No footer found in {filepath}")
