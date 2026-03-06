const fs = require('fs');

const TOOLS_SEO = [
  // ── CORE PDF TOOLS ──
  {
    id: 'merge-pdf',
    toolId: 'merge',
    title: 'Merge PDF Online Free | LovePDFs',
    meta: 'Combine PDFs in the order you want with the easiest PDF merger available. Free, fast, and secure.',
    h1: 'Merge PDF Files',
    desc: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    instructions: [
      'Click "Choose Files" or drag your PDFs into the drop area.',
      'Reorder the files by dragging them if needed.',
      'Click "Merge PDFs" to combine them into one document.',
      'Download your merged PDF file instantly.'
    ],
    benefits: [
      { title: 'Easy to use', desc: 'Merge multiple PDF files into one in seconds.' },
      { title: 'Secure connection', desc: 'All files are processed locally. Your files never leave your device.' },
      { title: 'No installation', desc: 'Works directly in your browser without requiring any software.' }
    ],
    faqs: [
      { q: 'Is it completely free to merge PDFs?', a: 'Yes, our merge tool is 100% free with no hidden limits.' },
      { q: 'Are my files safe?', a: 'Absolutely. We use local browser processing, meaning your files are never uploaded to any server.' },
      { q: 'Can I merge more than two PDFs?', a: 'Yes, you can merge as many PDF files as you need in a single operation.' }
    ],
    related: ['split-pdf', 'compress-pdf', 'pdf-to-word']
  },
  {
    id: 'compress-pdf',
    toolId: 'compress',
    title: 'Compress PDF Online Free | LovePDFs',
    meta: 'Compress PDF files online free using LovePDFs. Reduce PDF size quickly and securely.',
    h1: 'Compress PDF',
    desc: 'Reduce file size while optimizing for maximal quality.',
    instructions: [
      'Click to upload or drag and drop your PDF file.',
      'Select your desired compression level (Low, Medium, High).',
      'Click "Compress PDF" to start the process.',
      'Download your optimized, smaller PDF file.'
    ],
    benefits: [
      { title: 'Significant size reduction', desc: 'Reduce PDF sizes by up to 80% with minimal quality loss.' },
      { title: 'Email ready', desc: 'Make large documents small enough to easily attach to emails.' },
      { title: 'Fast processing', desc: 'Compression happens instantly right in your browser window.' }
    ],
    faqs: [
      { q: 'Will compression affect the quality of my PDF?', a: 'We use smart compression that balances file size with visual quality. "Medium" offers the best balance for most users.' },
      { q: 'What is the maximum file size I can compress?', a: 'Since processing happens locally on your device, there are no artificial file size limits.' },
      { q: 'Can I compress a PDF to exactly 100kb?', a: 'While we can\'t guarantee an exact output size, selecting the "High" compression level will yield the smallest possible file.' }
    ],
    related: ['merge-pdf', 'split-pdf', 'edit-pdf']
  },
  {
    id: 'split-pdf',
    toolId: 'split',
    title: 'Split PDF Online Free | LovePDFs',
    meta: 'Separate one page or a whole set from your PDF. Fast, free and secure online PDF splitter.',
    h1: 'Split PDF Files',
    desc: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    instructions: [
      'Upload the PDF document you want to split.',
      'Choose how you want to split it (by ranges, fixed intervals, or extract all pages).',
      'Click "Split PDF" to generate the new files.',
      'Download your separated PDF documents.'
    ],
    benefits: [
      { title: 'Total control', desc: 'Extract exactly the pages you need with custom range selection.' },
      { title: 'Instant extraction', desc: 'Browser-based processing means no waiting for server uploads or downloads.' },
      { title: 'Maintains quality', desc: 'Extracted pages retain 100% of their original layout and quality.' }
    ],
    faqs: [
      { q: 'Can I split a PDF into single pages?', a: 'Yes, simply choose the "All Pages" option to extract every page into its own separate PDF.' },
      { q: 'How do I extract a specific range of pages?', a: 'Select the "Custom Range" mode and enter ranges like "1-5, 8, 11-13" to get exactly what you need.' },
      { q: 'Do I need to sign up to use the tool?', a: 'No, all our PDF tools are completely free to use without creating an account.' }
    ],
    related: ['merge-pdf', 'remove-pages-pdf', 'extract-pages-pdf']
  },
  {
    id: 'rotate-pdf',
    toolId: 'rotate',
    title: 'Rotate PDF Online Free | LovePDFs',
    meta: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    h1: 'Rotate PDF',
    desc: 'Rotate your PDFs the way you need them. Easily change page orientation from portrait to landscape.',
    instructions: [
      'Select or drag and drop your PDF file into the tool.',
      'Choose the rotation angle (90, 180, or 270 degrees).',
      'Select whether to rotate all pages, odd pages, or even pages.',
      'Click "Rotate PDF" and download your corrected document.'
    ],
    benefits: [
      { title: 'Fix upside-down pages', desc: 'Easily correct pages that were scanned upside down.' },
      { title: 'Selective rotation', desc: 'Apply rotation to specific page types (odd/even) with one click.' },
      { title: 'Secure processing', desc: 'Your documents never leave your browser.' }
    ],
    faqs: [
      { q: 'Can I rotate just one page?', a: 'Currently, the tool rotates pages based on the pattern you select (All, Odd, Even). For single page manipulation, use our Organize PDF tool.' },
      { q: 'Is the rotation permanent?', a: 'Yes, when you download the resultant file, the orientation is permanently changed.' }
    ],
    related: ['organize-pdf', 'edit-pdf', 'crop-pdf']
  },
  {
    id: 'unlock-pdf',
    toolId: 'unlock',
    title: 'Unlock PDF Online Free | Remove Password',
    meta: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    h1: 'Unlock PDF',
    desc: 'Remove PDF password security, allowing you to edit, print, and copy from your documents.',
    instructions: [
      'Upload your secured PDF file.',
      'If prompted, enter the owner password to authorize removal.',
      'Click "Unlock PDF" to remove restrictions.',
      'Download your unlocked, restriction-free PDF.'
    ],
    benefits: [
      { title: 'Remove restrictions', desc: 'Enable printing, copying, and editing on locked PDF files.' },
      { title: 'Fast and secure', desc: 'Unlock happens locally, meaning your sensitive documents remain private.' },
      { title: 'Permanent unlocking', desc: 'The downloaded file will be permanently free of restrictions.' }
    ],
    faqs: [
      { q: 'Can you unlock a PDF without the password?', a: 'We can remove owner restrictions (preventing printing/editing). If the document requires a password just to open it (user password), you must know that password to unlock it.' },
      { q: 'Is it legal to unlock PDFs?', a: 'Yes, provided you have the right or permission to access and modify the document.' }
    ],
    related: ['protect-pdf', 'sign-pdf', 'edit-pdf']
  },
  {
    id: 'protect-pdf',
    toolId: 'protect',
    title: 'Protect PDF Online Free | Add Password',
    meta: 'Encrypt your PDF with a password to keep sensitive data confidential. Free online PDF protector.',
    h1: 'Protect PDF',
    desc: 'Encrypt your PDF with a password to keep sensitive data confidential.',
    instructions: [
      'Upload the PDF you want to protect.',
      'Enter a strong password and confirm it.',
      'Click "Protect PDF" to apply the encryption.',
      'Download your secured document.'
    ],
    benefits: [
      { title: 'Secure your data', desc: 'Prevent unauthorized access to sensitive information.' },
      { title: 'Client-side processing', desc: 'Passwords and documents are never sent to our servers.' },
      { title: 'Instant protection', desc: 'Apply passwords to documents in seconds.' }
    ],
    faqs: [
      { q: 'What happens if I forget the password?', a: 'There is no way to recover a lost password. Please ensure you keep a record of the password you set.' },
      { q: 'How secure is the protection?', a: 'We apply standard PDF encryption metadata. For maximum security, always use a strong, unique password.' }
    ],
    related: ['unlock-pdf', 'redact-pdf', 'sign-pdf']
  },
  {
    id: 'add-watermark-pdf',
    toolId: 'watermark',
    title: 'Add Watermark to PDF Free | LovePDFs',
    meta: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
    h1: 'Add Watermark to PDF',
    desc: 'Stamp text over your PDF in seconds. Choose the typography, transparency and position.',
    instructions: [
      'Upload your PDF document.',
      'Enter the text you want to use as a watermark.',
      'Choose the position, color, and which pages to apply it to.',
      'Click "Apply Watermark" and download the result.'
    ],
    benefits: [
      { title: 'Brand your documents', desc: 'Easily add "CONFIDENTIAL", "DRAFT", or your company name.' },
      { title: 'Customizable placement', desc: 'Place watermarks diagonally, centered, or in headers/footers.' },
      { title: 'Maintains formatting', desc: 'Watermarks are placed perfectly without altering surrounding content.' }
    ],
    faqs: [
      { q: 'Can I choose which pages are watermarked?', a: 'Yes! You can choose to apply it to all pages, just odd or even pages, or only the first/last page.' },
      { q: 'Can I add an image watermark?', a: 'Currently, this tool supports text watermarks. Image watermarks will be supported in a future update.' }
    ],
    related: ['edit-pdf', 'page-numbers-pdf', 'protect-pdf']
  },
  {
    id: 'remove-pages-pdf',
    toolId: 'removepg',
    title: 'Remove Pages from PDF | Free Online',
    meta: 'Remove pages from a PDF document. Delete PDF pages quickly and easily for free.',
    h1: 'Remove Pages from PDF',
    desc: 'Delete specific pages from your PDF document quickly and easily.',
    instructions: [
      'Upload your PDF file.',
      'Click on the pages in the grid that you wish to delete (they will be marked).',
      'Click "Remove Pages" to delete the selected pages.',
      'Download the updated PDF document.'
    ],
    benefits: [
      { title: 'Visual selection', desc: 'See thumbnails of every page so you know exactly what you are deleting.' },
      { title: 'Quick clean up', desc: 'Easily strip out blank pages, cover letters, or unnecessary sections.' },
      { title: '100% Free', desc: 'No limits on document size or page count.' }
    ],
    faqs: [
      { q: 'Can I remove multiple pages at once?', a: 'Yes, you can click to select as many pages as you want before hitting remove.' },
      { q: 'Will the remaining pages lose quality?', a: 'No, the remaining pages are extracted precisely as they were in the original document, with zero quality loss.' }
    ],
    related: ['extract-pages-pdf', 'split-pdf', 'organize-pdf']
  },
  {
    id: 'organize-pdf',
    toolId: 'organize',
    title: 'Organize & Reorder PDF Pages | LovePDFs',
    meta: 'Sort, add and delete PDF pages. Drag and drop the page thumbnails and sort them however you like.',
    h1: 'Organize PDF Pages',
    desc: 'Sort and reorder PDF pages. Drag and drop the page thumbnails and sort them however you like.',
    instructions: [
      'Upload the PDF you want to reorganize.',
      'Drag and drop the page thumbnails into your desired order.',
      'Click "Apply Order" to finalize the arrangement.',
      'Download your perfectly organized PDF.'
    ],
    benefits: [
      { title: 'Intuitive drag-and-drop', desc: 'Visually rearrange your document exactly how you want it.' },
      { title: 'Fix scanning mistakes', desc: 'Easily correct documents that were scanned out of order.' },
      { title: 'Private processing', desc: 'Your files are never uploaded to the cloud.' }
    ],
    faqs: [
      { q: 'Does this tool work on mobile?', a: 'Yes, but for large documents with many pages, the drag-and-drop experience is often easier on a desktop or tablet.' },
      { q: 'Can I delete pages while organizing?', a: 'For page deletion, we recommend using our dedicated "Remove Pages" tool.' }
    ],
    related: ['remove-pages-pdf', 'merge-pdf', 'split-pdf']
  },
  {
    id: 'crop-pdf',
    toolId: 'crop',
    title: 'Crop PDF Online Free | LovePDFs',
    meta: 'Trim margins on PDF pages. Standardize your PDF page sizes easily and for free.',
    h1: 'Crop PDF',
    desc: 'Trim margins on PDF pages to remove white space or standardize dimensions.',
    instructions: [
      'Upload your PDF document.',
      'Enter the crop margins in points (Top, Bottom, Left, Right).',
      'Choose which pages to apply the crop to.',
      'Click "Crop PDF" and download the result.'
    ],
    benefits: [
      { title: 'Remove white margins', desc: 'Make text larger by stripping away unnecessary white space around the edges.' },
      { title: 'Standardize sizing', desc: 'Make all pages in a document consistent.' },
      { title: 'Fast and private', desc: 'Processed securely in your browser.' }
    ],
    faqs: [
      { q: 'What measurement unit is used for cropping?', a: 'The crop margins are specified in "points" (pt), which is the standard unit for PDF documents (72 points = 1 inch).' },
      { q: 'Can I crop just visually by dragging?', a: 'Currently we use precise numerical input to ensure exact dimensions, but visual cropping is coming soon.' }
    ],
    related: ['edit-pdf', 'resize-pdf', 'compress-pdf']
  },

  // ── CONVERSION TOOLS ──
  {
    id: 'pdf-to-word',
    toolId: 'pdf2word',
    title: 'PDF to Word Converter Online Free',
    meta: 'Convert PDF to editable Word documents for free. PDF to DOCX conversion is fast, secure and almost 100% accurate.',
    h1: 'Convert PDF to Word',
    desc: 'Convert PDF to editable Word documents (DOCX).',
    instructions: [
      'Upload your PDF file.',
      'Wait for the intelligent text extraction and layout analysis to complete.',
      'Click "Download" to get a ZIP package containing HTML and TXT formats.',
      'Open the HTML file in Microsoft Word and "Save As" DOCX for the best formatting.'
    ],
    benefits: [
      { title: 'Preserve text formatting', desc: 'Our advanced engine retains bold text, headings, and paragraph structure.' },
      { title: '100% Private', desc: 'Unlike other converters, your document is never uploaded to an external server to be converted.' },
      { title: 'Highly accurate', desc: 'Intelligently groups text based on physical positioning in the PDF.' }
    ],
    faqs: [
      { q: 'Why does it download a ZIP with HTML?', a: 'To process files entirely in your browser without sending your data to our servers, we generate a highly-formatted HTML document that Microsoft Word natively understands and can easily save as a perfect DOCX file.' },
      { q: 'Will this convert scanned PDFs?', a: 'This tool extracts native text. If your PDF is a scanned image, the text cannot be extracted automatically without OCR software.' }
    ],
    related: ['word-to-pdf', 'pdf-to-excel', 'edit-pdf']
  },
  {
    id: 'pdf-to-excel',
    toolId: 'pdf2xls',
    title: 'PDF to Excel Converter | LovePDFs',
    meta: 'Convert PDF Data to Excel Spreadsheets. Extract tables from your PDF documents to CSV format.',
    h1: 'Convert PDF to Excel',
    desc: 'Extract PDF data and tables into a CSV format compatible with Excel.',
    instructions: [
      'Upload the PDF containing data or tables.',
      'Wait for the extractor to locate text coordinates.',
      'Click "Convert to Excel/CSV".',
      'Download the CSV file and open it in Microsoft Excel, Google Sheets, or Numbers.'
    ],
    benefits: [
      { title: 'Precise extraction', desc: 'Extracts exact X and Y coordinates of every piece of text.' },
      { title: 'Universal compatibility', desc: 'CSV files can be opened by any spreadsheet software.' },
      { title: 'Secure data extraction', desc: 'Financial or personal data in the PDF never leaves your device.' }
    ],
    faqs: [
      { q: 'Will it perfectly recreate the table grid?', a: 'The tool extracts all text and its coordinates. Complex grids may require some minor formatting adjustments in Excel once imported.' },
      { q: 'Does it work with scanned receipts?', a: 'No, the tool requires the PDF to contain selectable text, not flattened images.' }
    ],
    related: ['excel-to-pdf', 'pdf-to-word', 'extract-text-pdf']
  },
  {
    id: 'pdf-to-ppt',
    toolId: 'pdf2ppt',
    title: 'PDF to PowerPoint Converter | Free Tool',
    meta: 'Convert PDF to PowerPoint presentation online. Make your PDF presentations editable again.',
    h1: 'PDF to PowerPoint',
    desc: 'Extract text from PDFs to create PowerPoint presentations.',
    instructions: [
      'Oops! Note: Deep PDF to PPT conversion requires server software, but you can try using PDF to Word as an alternate extraction method for now.',
      'Upload the PDF.',
      'Download the extracted text.',
      'Copy the text into a presentation layout.'
    ],
    benefits: [
      { title: 'Fast text retrieval', desc: 'Quickly get the text out of slide-based PDFs.' },
      { title: 'Private', desc: 'Safe for confidential business presentations.' }
    ],
    faqs: [
      { q: 'Will it recreate the slide transitions?', a: 'No, PDFs do not contain transition data. The tool focuses on extracting the content.' }
    ],
    related: ['ppt-to-pdf', 'pdf-to-word', 'extract-text-pdf']
  },
  {
    id: 'pdf-to-jpg',
    toolId: 'pdf2jpg',
    title: 'PDF to JPG Converter Online Free',
    meta: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    h1: 'Convert PDF to JPG',
    desc: 'Convert every page of your PDF to high-quality JPG, PNG, or WebP images.',
    instructions: [
      'Upload the PDF file you wish to convert to images.',
      'Select your desired image format (JPEG, PNG, or WebP) and resolution.',
      'Click "Convert to Images" to begin rendering.',
      'Download the ZIP file containing all your page images.'
    ],
    benefits: [
      { title: 'High-quality rendering', desc: 'Choose up to 288 DPI for ultra-sharp print-quality images.' },
      { title: 'Multiple formats', desc: 'Supports JPG for small size, PNG for lossless quality, or WebP for modern web.' },
      { title: 'Batch processing', desc: 'Renders multiple pages sequentially and packages them conveniently into one ZIP file.' }
    ],
    faqs: [
      { q: 'How long does it take?', a: 'Processing happens locally. A 10-page document usually takes just a few seconds depending on your device speed.' },
      { q: 'Which format should I choose?', a: 'JPEG is best for general use and photos. PNG is best for documents with sharp text and solid colors.' }
    ],
    related: ['jpg-to-pdf', 'pdf-to-word', 'extract-pages-pdf']
  },
  {
    id: 'word-to-pdf',
    toolId: 'word2pdf',
    title: 'Word to PDF Converter Online Free',
    meta: 'Make DOC and DOCX files easy to read by converting them to PDF.',
    h1: 'Convert Word to PDF',
    desc: 'Make DOCX files easy to read universally by converting them to PDF format.',
    instructions: [
      'Upload your Word (.docx) document.',
      'The tool will instantly parse the document and extract the paragraphs.',
      'Click "Convert to PDF" to generate the document.',
      'Download your new PDF file.'
    ],
    benefits: [
      { title: 'Universal sharing', desc: 'Ensure your document looks the same on any device without Microsoft Word.' },
      { title: 'Lightning fast', desc: 'Conversion occurs instantly in the browser without network latency.' },
      { title: '100% Free', desc: 'Convert as many Word documents to PDF as you need.' }
    ],
    faqs: [
      { q: 'Will complex formatting be preserved?', a: 'Our local converter focuses on extracting text and headings. For highly complex alignments and images natively inside Word, you may see layout shifts.' },
      { q: 'Does it support old .doc files?', a: 'No, this tool only supports the modern XML-based .docx format.' }
    ],
    related: ['pdf-to-word', 'excel-to-pdf', 'ppt-to-pdf']
  },
  {
    id: 'excel-to-pdf',
    toolId: 'xls2pdf',
    title: 'Excel to PDF Converter Online Free',
    meta: 'Convert Excel spreadsheets to PDF online for free. Make XLSX and CSV files easy to share.',
    h1: 'Convert Excel to PDF',
    desc: 'Make XLSX and CSV spreadsheets easy to read and share by converting them to PDF.',
    instructions: [
      'Upload your Excel spreadsheet (.xlsx) or CSV file.',
      'Wait for the tool to parse the rows and columns.',
      'Click "Convert to PDF" to generate the table.',
      'Download your formatted PDF document.'
    ],
    benefits: [
      { title: 'Clean tabular layout', desc: 'Automatically formats your rows and columns into a readable PDF grid.' },
      { title: 'Instant conversion', desc: 'Works completely offline once loaded.' },
      { title: 'Secure financial data', desc: 'Keep your sensitive spreadsheet data completely private.' }
    ],
    faqs: [
      { q: 'How does it handle very wide tables?', a: 'The tool will attempt to fit columns onto a portrait page. For very wide tables, some data may wrap.' },
      { q: 'Can I upload a CSV file?', a: 'Yes! CSV files are fully supported and will be converted into a PDF table.' }
    ],
    related: ['pdf-to-excel', 'word-to-pdf', 'ppt-to-pdf']
  },
  {
    id: 'ppt-to-pdf',
    toolId: 'ppt2pdf',
    title: 'PowerPoint to PDF Converter Free',
    meta: 'Convert PPT and PPTX slideshows to PDF online for free.',
    h1: 'Convert PowerPoint to PDF',
    desc: 'Convert PPTX slideshows to PDF to make them easy to view on any device.',
    instructions: [
      'Upload your PowerPoint (.pptx) presentation.',
      'The tool will extract slide text.',
      'Click "Convert to PDF" to generate the pages.',
      'Download your presentation as a PDF.'
    ],
    benefits: [
      { title: 'Easy sharing', desc: 'Send presentations to clients who don\'t have PowerPoint installed.' },
      { title: 'Reduced file size', desc: 'Text-based PDFs are often much smaller than the original PowerPoint files.' },
      { title: 'Completely private', desc: 'Your confidential presentations are processed locally.' }
    ],
    faqs: [
      { q: 'Will slide images be included?', a: 'Our fast client-side converter focuses primarily on extracting and formatting the text content from the slides.' }
    ],
    related: ['pdf-to-ppt', 'word-to-pdf', 'jpg-to-pdf']
  },
  {
    id: 'jpg-to-pdf',
    toolId: 'jpg2pdf',
    title: 'JPG to PDF Converter Online Free',
    meta: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
    h1: 'Convert JPG to PDF',
    desc: 'Convert JPG, PNG, and WebP images to a PDF document in seconds.',
    instructions: [
      'Select one or multiple images you want to convert.',
      'Adjust the page size, orientation, and margins if needed.',
      'Click "Convert to PDF" to merge them into a single document.',
      'Download your new PDF file.'
    ],
    benefits: [
      { title: 'Merge multiple images', desc: 'Easily bundle dozens of photos into one convenient document.' },
      { title: 'Custom page sizing', desc: 'Fit images automatically or force them into A4, Letter, or other standard sizes.' },
      { title: 'Lightning fast', desc: 'Create image-heavy PDFs instantly in your browser.' }
    ],
    faqs: [
      { q: 'Can I upload formats other than JPG?', a: 'Yes, we also support PNG, WebP, and BMP images.' },
      { q: 'How do I rearrange the images?', a: 'You can upload them in batches or select them in the order you want them to appear.' }
    ],
    related: ['pdf-to-jpg', 'merge-pdf', 'image-to-pdf']
  },

  // ── IMAGE TOOLS SECTION ──
  {
    id: 'resize-image',
    toolId: 'resize_img',
    title: 'Resize Image Online Free | LovePDFs',
    meta: 'Resize JPG, PNG, and WebP images online for free. Change dimensions easily.',
    h1: 'Resize Image',
    desc: 'Change the dimensions of your images quickly and easily.',
    instructions: [
      'Upload the image you want to resize.',
      'Enter the new width and height in pixels (keep aspect ratio locked for best results).',
      'Click "Resize Image" to process.',
      'Download your resized image.'
    ],
    benefits: [
      { title: 'Pixel perfect', desc: 'Define exactly what width and height you need.' },
      { title: 'Fast and private', desc: 'Images are processed directly in your browser using Canvas technology.' },
      { title: 'Multiple formats', desc: 'Supports JPG, PNG, and WebP.' }
    ],
    faqs: [
      { q: 'Will resizing reduce quality?', a: 'Making an image smaller usually retains quality, but enlarging an image past its original size may cause pixelation.' },
      { q: 'How do I keep the image from distorting?', a: 'Make sure the "Lock aspect ratio" option feels natural, or only adjust the width and let the height adjust automatically.' }
    ],
    related: ['crop-image', 'compress-image', 'jpg-to-png']
  },
  {
    id: 'crop-image',
    toolId: 'crop_img',
    title: 'Crop Image Online Free | LovePDFs',
    meta: 'Crop JPG, PNG, and WebP images online. Easily remove unwanted areas of your photos.',
    h1: 'Crop Image',
    desc: 'Remove unwanted areas and frame your photos perfectly.',
    instructions: [
      'Upload your image.',
      'Use the cropping tool to select the area you want to keep.',
      'Click "Crop Image" to trim the borders.',
      'Download your cropped image.'
    ],
    benefits: [
      { title: 'Focus on what matters', desc: 'Remove messy backgrounds or photobombers instantly.' },
      { title: 'Social media ready', desc: 'Easily crop images into squares or standard ratios for Instagram or Facebook.' },
      { title: 'Zero server uploads', desc: 'Your photos stay perfectly private.' }
    ],
    faqs: [
      { q: 'Is the cropped part permanently deleted?', a: 'On the downloaded file, yes. But your original file on your computer remains untouched.' },
      { q: 'Does it support transparent PNGs?', a: 'Yes, cropping a PNG will maintain any transparency in the selected area.' }
    ],
    related: ['resize-image', 'compress-image', 'flip-image']
  },
  {
    id: 'compress-image',
    toolId: 'compress_img',
    title: 'Compress Image Online Free | LovePDFs',
    meta: 'Compress JPG, WebP, and PNG images without losing quality to reduce file size.',
    h1: 'Compress Image',
    desc: 'Reduce image file size significantly without losing visible quality.',
    instructions: [
      'Upload the image you want to shrink.',
      'Select the compression quality level (usually 70-80% is ideal).',
      'Click "Compress Image" to optimize the file.',
      'Download the smaller, web-ready image.'
    ],
    benefits: [
      { title: 'Save storage space', desc: 'Reduce file sizes by up to 90%.' },
      { title: 'Faster website loading', desc: 'Smaller images mean faster load times for websites and emails.' },
      { title: 'Batch friendly', desc: 'Fast client-side compression lets you process images instantly.' }
    ],
    faqs: [
      { q: 'Which format compresses best?', a: 'JPEG and WebP offer great lossy compression for photos. PNG compression is lossless but less dramatic.' },
      { q: 'Will my image look blurry?', a: 'If you stick to quality settings above 70%, the difference will be almost unnoticeable to the naked eye.' }
    ],
    related: ['resize-image', 'convert-image', 'compress-pdf']
  },
  {
    id: 'jpg-to-png',
    toolId: 'jpg2png_img',
    title: 'Convert JPG to PNG Online Free',
    meta: 'Easily convert JPEG images to PNG format online for free.',
    h1: 'Convert JPG to PNG',
    desc: 'Convert JPEG photos into high-quality PNG graphics.',
    instructions: [
      'Upload your JPG file.',
      'Click "Convert to PNG".',
      'Download your new PNG image.'
    ],
    benefits: [
      { title: 'Lossless format', desc: 'Save your image in a reliable, lossless format.' },
      { title: 'Simple workflow', desc: 'Just click and download.' }
    ],
    faqs: [
      { q: 'Will this make the file background transparent?', a: 'No, converting a JPG to PNG does not automatically remove the background.' }
    ],
    related: ['png-to-jpg', 'webp-to-jpg', 'compress-image']
  },
  {
    id: 'png-to-jpg',
    toolId: 'png2jpg_img',
    title: 'Convert PNG to JPG Online Free',
    meta: 'Easily convert PNG images to JPEG format online for free to save space.',
    h1: 'Convert PNG to JPG',
    desc: 'Convert PNG graphics into compressed JPG photos to save space.',
    instructions: [
      'Upload your PNG file.',
      'Wait for the instant browser-side conversion.',
      'Download your new JPG image.'
    ],
    benefits: [
      { title: 'Smaller files', desc: 'JPGs are usually significantly smaller than PNGs.' },
      { title: 'Great for photos', desc: 'Converts screenshots or graphics into photo-friendly formats.' }
    ],
    faqs: [
      { q: 'What happens to transparency?', a: 'Since JPG does not support transparency, transparent areas will automatically be filled with a solid white background.' }
    ],
    related: ['jpg-to-png', 'webp-to-png', 'compress-image']
  },

  // ── EDIT & ADVANCED PDF TOOLS ──
  {
    id: 'edit-pdf',
    toolId: 'editpdf',
    title: 'Edit PDF Online Free | Draw, Highlight, Add Text',
    meta: 'Edit PDF files online for free. Add text, draw, highlight, and annotate your PDF documents directly in your browser.',
    h1: 'Edit PDF',
    desc: 'Draw, highlight, add text, and annotate your PDF documents directly in the browser.',
    instructions: [
      'Upload the PDF document you want to edit.',
      'Use the toolbar to select a tool: Text, Draw, Highlight, or Shapes.',
      'Click or drag on the PDF page to add your annotations.',
      'Click "Save Annotated PDF" to download the edited document.'
    ],
    benefits: [
      { title: 'Full annotation suite', desc: 'Add text boxes, freehand drawings, highlights, and shape overlays.' },
      { title: 'No software needed', desc: 'Replaces desktop editors like Adobe Acrobat for basic annotation tasks.' },
      { title: 'Completely private', desc: 'Your sensitive documents are never uploaded to a server.' }
    ],
    faqs: [
      { q: 'Can I edit existing text in the PDF?', a: 'This tool focuses on adding annotations and overlays. To modify existing text, convert the PDF to Word first, edit, then convert it back.' },
      { q: 'Will the annotations be permanent?', a: 'Yes, the annotations are flattened into the PDF when you save, making them a permanent part of the document.' },
      { q: 'Can I undo my changes?', a: 'Yes, use the undo button in the toolbar or press Ctrl+Z to revert your last action.' }
    ],
    related: ['add-watermark-pdf', 'sign-pdf', 'add-page-numbers-pdf']
  },
  {
    id: 'extract-pages-pdf',
    toolId: 'extract',
    title: 'Extract Pages from PDF Online Free',
    meta: 'Extract specific pages from your PDF as a new document. Free, fast, secure.',
    h1: 'Extract Pages from PDF',
    desc: 'Pull out specific pages from a PDF to create a new, smaller document.',
    instructions: [
      'Upload your PDF file.',
      'Select the pages you want to extract using the visual page grid.',
      'Click "Extract Pages" to create a new PDF with only the selected pages.',
      'Download your new PDF.'
    ],
    benefits: [
      { title: 'Precise selection', desc: 'Pick exactly which pages you need from a large document.' },
      { title: 'Zero quality loss', desc: 'Extracted pages are identical to the originals.' },
      { title: 'Fast processing', desc: 'Runs entirely in your browser for instant results.' }
    ],
    faqs: [
      { q: 'What is the difference between Extract and Split?', a: 'Extract creates one PDF from your selected pages. Split divides the document into multiple separate files.' },
      { q: 'Can I extract non-consecutive pages?', a: 'Yes, you can click to select any combination of pages from the visual grid.' }
    ],
    related: ['split-pdf', 'remove-pages-pdf', 'merge-pdf']
  },
  {
    id: 'repair-pdf',
    toolId: 'repair',
    title: 'Repair PDF Online Free | Fix Corrupted PDF',
    meta: 'Repair and recover corrupted or damaged PDF files online. Free PDF repair tool.',
    h1: 'Repair PDF',
    desc: 'Fix damaged or corrupted PDF files and recover your data.',
    instructions: [
      'Upload the PDF file that is damaged or won\'t open correctly.',
      'Wait for the repair engine to analyze and rebuild the document structure.',
      'Click "Repair PDF" to fix the file.',
      'Download the repaired PDF.'
    ],
    benefits: [
      { title: 'Recover documents', desc: 'Rebuild PDFs that other readers cannot open.' },
      { title: 'Structural repair', desc: 'Fixes cross-reference tables and object streams.' },
      { title: 'Secure recovery', desc: 'All repair happens locally on your device.' }
    ],
    faqs: [
      { q: 'Can all damaged PDFs be repaired?', a: 'Most PDFs with minor corruption can be recovered. Severely truncated or encrypted files may not be repairable.' },
      { q: 'Will I lose any data?', a: 'The tool preserves as much content in the document as is technically possible.' }
    ],
    related: ['compress-pdf', 'merge-pdf', 'edit-pdf']
  },
  {
    id: 'ocr-extract-text',
    toolId: 'ocr',
    title: 'Extract Text from PDF (OCR) | Free Online',
    meta: 'Extract selectable text from PDF pages. Free online OCR tool for PDF text extraction.',
    h1: 'OCR / Extract Text from PDF',
    desc: 'Pull out all the selectable text from PDF pages for easy copying and editing.',
    instructions: [
      'Upload the PDF containing the text you want to extract.',
      'Choose which pages to process (All, First, or a Custom Range).',
      'Click "Extract Text" to start the process.',
      'Copy the extracted text or download it as a TXT file.'
    ],
    benefits: [
      { title: 'Full text extraction', desc: 'Get every piece of selectable text from your PDF.' },
      { title: 'Page-by-page output', desc: 'Clearly labels which text belongs to which page.' },
      { title: 'Private & offline', desc: 'Text extraction happens entirely in your browser.' }
    ],
    faqs: [
      { q: 'Does this work on scanned PDFs?', a: 'This tool extracts native/selectable text. If your PDF is a scanned image, the text cannot be extracted without full OCR software.' },
      { q: 'Can I extract from specific pages only?', a: 'Yes, choose the "Custom Range" option and specify pages like "1-5, 8, 12".' }
    ],
    related: ['pdf-to-word', 'pdf-to-excel', 'edit-pdf']
  },
  {
    id: 'sign-pdf',
    toolId: 'sign',
    title: 'Sign PDF Online Free | Add Digital Signature',
    meta: 'Sign PDF documents online for free. Draw or type your signature directly onto any PDF.',
    h1: 'Sign PDF',
    desc: 'Add your handwritten or typed signature to any PDF document.',
    instructions: [
      'Upload the PDF document you need to sign.',
      'Choose to draw your signature with your mouse/finger or type it.',
      'Select the placement position (bottom-right, bottom-left, etc.).',
      'Click "Add Signature" to apply it and download the signed document.'
    ],
    benefits: [
      { title: 'Two signature modes', desc: 'Draw a handwritten signature or type your name in a cursive style.' },
      { title: 'Precise placement', desc: 'Choose exactly where on the page your signature appears.' },
      { title: 'Legally acceptable', desc: 'Digital signatures are widely accepted for most documents.' }
    ],
    faqs: [
      { q: 'Is a digital signature legally binding?', a: 'In many jurisdictions, a digitally placed signature is considered valid. Check your local laws for specific legal requirements.' },
      { q: 'Can I sign multiple pages?', a: 'Yes, you can apply the signature to all pages, odd pages, even pages, or just the last page.' }
    ],
    related: ['edit-pdf', 'protect-pdf', 'add-watermark-pdf']
  },
  {
    id: 'redact-pdf',
    toolId: 'redact',
    title: 'Redact PDF Online Free | Remove Sensitive Info',
    meta: 'Permanently remove sensitive information from PDF documents. Free online PDF redaction tool.',
    h1: 'Redact PDF',
    desc: 'Permanently black out sensitive information from your PDF documents.',
    instructions: [
      'Upload the PDF with sensitive content.',
      'Navigate to the page with the information you want to redact.',
      'Click and drag to select the areas you want to permanently remove.',
      'Click "Apply Redactions" to create the redacted document.'
    ],
    benefits: [
      { title: 'Permanent removal', desc: 'Redacted content is irreversibly destroyed, not just hidden.' },
      { title: 'Visual selection', desc: 'See the actual pages and drag to select exactly what to hide.' },
      { title: 'GDPR compliant', desc: 'Helps you comply with data protection regulations by permanently removing personal data.' }
    ],
    faqs: [
      { q: 'Can redacted information be recovered?', a: 'No. Unlike simply placing a black box over text, our tool permanently removes the underlying content from the PDF.' },
      { q: 'Which areas can I redact?', a: 'You can select any rectangular area on any page. Names, addresses, phone numbers, financial data — anything visible.' }
    ],
    related: ['protect-pdf', 'edit-pdf', 'unlock-pdf']
  },
  {
    id: 'compare-pdf',
    toolId: 'compare',
    title: 'Compare PDF Files Online Free | Side by Side',
    meta: 'Compare two PDF documents side by side to spot differences. Free online PDF comparison tool.',
    h1: 'Compare PDF',
    desc: 'Upload two PDF documents and compare them side by side to spot differences.',
    instructions: [
      'Upload the original PDF as "PDF A".',
      'Upload the revised PDF as "PDF B".',
      'Click "Compare PDFs" to generate a side-by-side comparison.',
      'Download the comparison document.'
    ],
    benefits: [
      { title: 'Side-by-side view', desc: 'See both versions of the document rendered next to each other.' },
      { title: 'Version control', desc: 'Quickly check what changed between document revisions.' },
      { title: 'Private comparison', desc: 'Both documents are processed locally on your device.' }
    ],
    faqs: [
      { q: 'Does it highlight the differences?', a: 'The tool renders both documents side by side so you can visually spot changes. Automated text-diff highlighting is coming soon.' },
      { q: 'Can I compare more than two files?', a: 'Currently the tool supports comparing two files at a time.' }
    ],
    related: ['edit-pdf', 'merge-pdf', 'organize-pdf']
  },
  {
    id: 'html-to-pdf',
    toolId: 'html2pdf',
    title: 'HTML to PDF Converter Online Free',
    meta: 'Convert web pages and HTML code to PDF documents for free. Fast and secure HTML to PDF conversion.',
    h1: 'Convert HTML to PDF',
    desc: 'Convert web pages or raw HTML code into downloadable PDF documents.',
    instructions: [
      'Paste the URL of a web page or enter raw HTML code.',
      'Adjust the page size and margins if needed.',
      'Click "Convert to PDF" to generate the document.',
      'Download your new PDF.'
    ],
    benefits: [
      { title: 'Save web pages', desc: 'Archive any web page as a portable, offline PDF document.' },
      { title: 'Custom HTML support', desc: 'Paste your own HTML code and get a perfectly rendered PDF.' },
      { title: 'Adjustable layout', desc: 'Control page size, margins, and orientation.' }
    ],
    faqs: [
      { q: 'Will the PDF look exactly like the web page?', a: 'The tool renders basic HTML and CSS. Complex JavaScript-driven layouts may not be perfectly reproduced.' },
      { q: 'Can I convert a live URL?', a: 'You can paste the URL and the tool will attempt to fetch and render the content.' }
    ],
    related: ['word-to-pdf', 'jpg-to-pdf', 'edit-pdf']
  },
  {
    id: 'pdf-to-pdfa',
    toolId: 'pdf2pdfa',
    title: 'PDF to PDF/A Converter | Archive Standard',
    meta: 'Convert PDF to PDF/A format for long-term archiving. Free online PDF/A converter.',
    h1: 'Convert PDF to PDF/A',
    desc: 'Convert your PDF documents to the ISO-standardized PDF/A format for long-term archiving.',
    instructions: [
      'Upload the PDF you want to convert to PDF/A.',
      'Wait for the tool to embed fonts and comply with archival standards.',
      'Click "Convert to PDF/A" to generate the archival document.',
      'Download your new PDF/A file.'
    ],
    benefits: [
      { title: 'Long-term preservation', desc: 'PDF/A is the ISO standard for archiving documents electronically.' },
      { title: 'Regulatory compliance', desc: 'Many industries and governments require PDF/A for official records.' },
      { title: 'Self-contained', desc: 'All fonts and resources are embedded within the document.' }
    ],
    faqs: [
      { q: 'What is PDF/A?', a: 'PDF/A is a specialized version of PDF designed specifically for long-term digital preservation and archiving of electronic documents.' },
      { q: 'Is PDF/A the same as regular PDF?', a: 'No. PDF/A has additional restrictions (like requiring all fonts to be embedded) to ensure documents remain readable for decades.' }
    ],
    related: ['compress-pdf', 'edit-pdf', 'protect-pdf']
  },
  {
    id: 'add-page-numbers-pdf',
    toolId: 'pagenums',
    title: 'Add Page Numbers to PDF Free | LovePDFs',
    meta: 'Add custom page numbers to your PDF documents easily and for free. Choose position, format and style.',
    h1: 'Add Page Numbers to PDF',
    desc: 'Add customizable page numbers to your PDF documents with your preferred position and style.',
    instructions: [
      'Upload your PDF document.',
      'Select the position for page numbers (bottom-center, bottom-right, etc.).',
      'Choose your numbering format and starting number.',
      'Click "Add Page Numbers" and download the result.'
    ],
    benefits: [
      { title: 'Multiple positions', desc: 'Place page numbers at the top or bottom, left, center, or right.' },
      { title: 'Custom formatting', desc: 'Choose from various numbering formats like "Page 1 of X" or simple digits.' },
      { title: 'Selective application', desc: 'Apply to all pages, or skip the first page for title pages.' }
    ],
    faqs: [
      { q: 'Can I skip the first page?', a: 'Yes! You can choose which pages to start numbering from.' },
      { q: 'Can I customize the font and size?', a: 'The tool uses a clean, professional default font. Custom font selection is coming in a future update.' }
    ],
    related: ['add-watermark-pdf', 'edit-pdf', 'organize-pdf']
  },
  // ── SEJDA-INSPIRED NEW TOOLS ──
  {
    id: 'grayscale-pdf',
    toolId: 'grayscale',
    title: 'Convert PDF to Grayscale Online Free | LovePDFs',
    meta: 'Convert your colour PDF to black and white or grayscale instantly and securely in your browser.',
    h1: 'Convert PDF to Grayscale',
    desc: 'Remove all colour from your PDF — ideal for black-and-white printing.',
    instructions: [
      'Click "Choose PDF" or drag and drop your file.',
      'Click "Convert to Grayscale".',
      'Download your black and white PDF.'
    ],
    benefits: [
      { title: 'Save printer ink', desc: 'Remove colors to print documents purely in B&W.' },
      { title: '100% Private', desc: 'Processing happens securely on your device.' }
    ],
    faqs: [
      { q: 'Will this reduce file size?', a: 'Sometimes, as colour data is discarded.' }
    ],
    related: ['compress-pdf']
  },
  {
    id: 'flatten-pdf',
    toolId: 'flatten',
    title: 'Flatten PDF Online Free | LovePDFs',
    meta: 'Flatten PDF forms and annotations safely. Make PDF fields non-editable permanently.',
    h1: 'Flatten PDF',
    desc: 'Make all form fields and annotations permanently non-editable.',
    instructions: [
      'Upload the fillable PDF.',
      'Click "Flatten PDF".',
      'Download your read-only PDF document.'
    ],
    benefits: [
      { title: 'Secure documents', desc: 'Prevents further unauthorized edits to form fields.' },
      { title: 'Instant processing', desc: 'Happens locally without uploading.' }
    ],
    faqs: [
      { q: 'Can a flattened PDF be un-flattened?', a: 'No, flattening is permanent.' }
    ],
    related: ['protect-pdf']
  },
  {
    id: 'edit-pdf-metadata',
    toolId: 'editMeta',
    title: 'Edit PDF Metadata Online | LovePDFs',
    meta: 'Change PDF Title, Author, Subject and Keywords metadata easily.',
    h1: 'Edit PDF Metadata',
    desc: 'Change PDF title, author, subject and keywords.',
    instructions: [
      'Upload your PDF to read its existing metadata.',
      'Modify the Title, Author, Subject or Keywords fields.',
      'Save and download your updated PDF.'
    ],
    benefits: [
      { title: 'Better organization', desc: 'Fix incorrect properties for better searchability.' }
    ],
    faqs: [
      { q: 'Is metadata visible on the pages?', a: 'No, metadata is hidden information stored in the file properties.' }
    ],
    related: ['organize-pdf']
  },
  {
    id: 'extract-images-pdf',
    toolId: 'extractImg',
    title: 'Extract Images from PDF Online | LovePDFs',
    meta: 'Convert every page of a PDF into high-quality JPEG or PNG images and download as a ZIP.',
    h1: 'Extract Images from PDF',
    desc: 'Renders each page as an image and downloads them as a ZIP archive.',
    instructions: [
      'Upload the PDF file.',
      'Choose output format (JPEG or PNG) and image scale.',
      'Click "Extract" and download the ZIP file.'
    ],
    benefits: [
      { title: 'Batch processing', desc: 'Get all pages as images in one click.' }
    ],
    faqs: [
      { q: 'Does it extract embedded images or whole pages?', a: 'This tool renders the entire page as an image. Use crop-image later if needed.' }
    ],
    related: ['pdf-to-jpg']
  },
  {
    id: 'resize-pdf',
    toolId: 'resizepdf',
    title: 'Resize PDF Pages Online Free | LovePDFs',
    meta: 'Change PDF page sizing to A4, Letter, etc. Resize PDF dimensions easily.',
    h1: 'Resize PDF Page Size',
    desc: 'Change all pages to a standard paper size like A4 or US Letter.',
    instructions: [
      'Select a PDF file.',
      'Choose the target page size (A4, Letter, etc.) and orientation.',
      'Click "Resize PDF" to scale contents to fit the new size.'
    ],
    benefits: [
      { title: 'Standardize sizes', desc: 'Make an irregularly sized PDF fit perfectly on A4 paper.' }
    ],
    faqs: [
      { q: 'Will my content be cropped?', a: 'No, content is scaled down to fit within the new page dimensions.' }
    ],
    related: ['crop-pdf']
  },
  {
    id: 'alternate-mix-pdf',
    toolId: 'altmix',
    title: 'Alternate & Mix PDFs | LovePDFs',
    meta: 'Interleave pages from two PDFs. Perfect for merging front and back document scans.',
    h1: 'Alternate & Mix PDFs',
    desc: 'Combine two PDFs by alternating pages between them.',
    instructions: [
      'Upload the PDF with Odd pages (Front).',
      'Upload the PDF with Even pages (Back).',
      'Choose the mix order and hit "Mix".'
    ],
    benefits: [
      { title: 'Perfect for scanning', desc: 'Easily merge single-sided scanner outputs into a proper document sequence.' }
    ],
    faqs: [
      { q: 'What if one PDF has more pages?', a: 'The tool will just append the remaining pages at the end automatically.' }
    ],
    related: ['merge-pdf']
  },
  {
    id: 'header-footer-pdf',
    toolId: 'headfoot',
    title: 'Add Header & Footer to PDF | LovePDFs',
    meta: 'Add page numbers, custom text headers and footers to your PDF online.',
    h1: 'Add Header & Footer',
    desc: 'Stamp custom text at the top and bottom of every PDF page.',
    instructions: [
      'Upload a PDF.',
      'Type your desired Header and Footer text. Use {page} for page numbers.',
      'Adjust font size and hit Apply.'
    ],
    benefits: [
      { title: 'Dynamic variables', desc: 'Use {page} and {total} syntax to automatically number pages.' }
    ],
    faqs: [
      { q: 'Can I add a date?', a: 'Just type the date directly into the header or footer box.' }
    ],
    related: ['add-page-numbers-pdf']
  },
  {
    id: 'remove-annotations-pdf',
    toolId: 'removeann',
    title: 'Remove PDF Annotations | LovePDFs',
    meta: 'Strip all highlights, comments, and markup from a PDF file.',
    h1: 'Remove Annotations',
    desc: 'Delete all highlights, comments, sticky notes and markups.',
    instructions: [
      'Upload your annotated PDF.',
      'Click "Remove Annotations".',
      'Download a clean, bare PDF.'
    ],
    benefits: [
      { title: 'Clean documents', desc: 'Instantly strip internal markings before sending to a client.' }
    ],
    faqs: [
      { q: 'Will this delete regular text?', a: 'No, only interactive annotations like highlights and comments are removed.' }
    ],
    related: ['flatten-pdf']
  },
  {
    id: 'deskew-pdf',
    toolId: 'deskew',
    title: 'Deskew & Straighten PDF | LovePDFs',
    meta: 'Automatically straighten crooked scanned pages in a PDF document.',
    h1: 'Deskew / Straighten PDF',
    desc: 'Correct rotation angle of scanned PDF pages that are slightly crooked.',
    instructions: [
      'Upload a crooked PDF scan.',
      'Enter a correction angle in degrees (e.g. -1.5).',
      'Click "Deskew PDF" to straighten the pages.'
    ],
    benefits: [
      { title: 'Professional look', desc: 'Makes messy phone or flatbed scans look like native digital documents.' }
    ],
    faqs: [
      { q: 'Can I do auto-deskew?', a: 'Currently you must provide a manual correction rotation angle in degrees.' }
    ],
    related: ['rotate-pdf']
  },
  {
    id: 'pdf-to-text',
    toolId: 'pdf2txt',
    title: 'Convert PDF to Text (.txt) | LovePDFs',
    meta: 'Extract text from a PDF document to a plain text file online free.',
    h1: 'Convert PDF to Text',
    desc: 'Extract all readable text from your PDF into a plain .txt file.',
    instructions: [
      'Upload a PDF.',
      'Choose whether to extract all pages or a specific range.',
      'Click "Extract Text" and download your .txt file.'
    ],
    benefits: [
      { title: 'Plain text format', desc: 'Great for quickly importing raw data into scripts or excel, bypassing formatting issues.' }
    ],
    faqs: [
      { q: 'Does this work on scanned images?', a: 'No, for scanned images without text layer, please use our OCR tool instead.' }
    ],
    related: ['extract-text-from-pdf', 'pdf-to-word']
  }
];

module.exports = TOOLS_SEO;
