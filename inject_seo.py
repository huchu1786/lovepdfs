import os
import re

COMMON_KEYWORDS = "free pdf tools, online pdf editor, pdf converter, merge pdf without upload, fast pdf tools, private pdf tools, secure pdf editor, free pdf online, ilovepdf alternative, sejda alternative, client side pdf processing, no account pdf"

def generate_keywords(title, desc):
    # Extract some meaningful words from title
    title_words = re.sub(r'[^a-zA-Z0-9\s]', '', title.split('|')[0].strip().lower())
    specific_kws = [f"{title_words} free", f"online {title_words}", f"how to {title_words}"]
    return ", ".join(specific_kws) + ", " + COMMON_KEYWORDS

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already SEO optimized to avoid duplicate tags
    if 'name="keywords"' in content or 'property="og:title"' in content or 'application/ld+json' in content:
        # We might want to replace existing keywords, but let's assume if it has og:title we skip or clean up first
        pass
    
    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1) if title_match else "LovePDFs — Free PDF & Image Tools"
    
    # Extract description
    desc_match = re.search(r'<meta name="description" content="(.*?)".*?>', content, re.IGNORECASE)
    desc = desc_match.group(1) if desc_match else "Free, private, and fast browser-based PDF and image tools."
    
    # Remove existing <meta name="keywords" ...> if any
    content = re.sub(r'<meta name="keywords".*?>\n?', '', content, flags=re.IGNORECASE)
    # Remove existing open graph and twitter tags if any
    content = re.sub(r'<meta property="og:.*?>\n?', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<meta name="twitter:.*?>\n?', '', content, flags=re.IGNORECASE)
    
    # Generate new tags
    keywords = generate_keywords(title, desc)
    seo_tags = f"""
<meta name="keywords" content="{keywords}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://lovepdfs.com/">
<meta property="og:site_name" content="LovePDFs">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{title}",
  "description": "{desc}",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "offers": {{
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }}
}}
</script>
"""
    
    # Inject SEO tags right after <meta name="description" ...>
    # If no description, inject after <title>
    if desc_match:
        content = content.replace(desc_match.group(0), desc_match.group(0) + seo_tags)
    elif title_match:
        content = content.replace(title_match.group(0), title_match.group(0) + seo_tags)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Optimized SEO for {filepath}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("All HTML files injected with viral SEO metadata.")
