// Simple Markdown to HTML Converter
class MarkdownConverter {
    convert(markdown) {
        let html = markdown;

        // Escape HTML special characters first
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // Code blocks (must be before inline code)
        html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

        // Headings
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Horizontal line
        html = html.replace(/^---$/gm, '<hr>');
        html = html.replace(/^\*\*\*$/gm, '<hr>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

        // Images
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

        // Inline code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');

        // Blockquotes
        html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

        // Unordered lists
        html = html.replace(/^[\*\-\+] (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        html = html.replace(/<\/li>\n<li>/g, '</li>\n<li>');

        // Ordered lists
        html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

        // Paragraphs
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<h[1-6])/g, '$1');
        html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul>)/g, '$1');
        html = html.replace(/(<\/ul>)<\/p>/g, '$1');
        html = html.replace(/<p>(<pre>)/g, '$1');
        html = html.replace(/(<\/pre>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr>)/g, '$1');
        html = html.replace(/(<hr>)<\/p>/g, '$1');
        html = html.replace(/<p>(<blockquote>)/g, '$1');
        html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

        return html;
    }
}

// DOM Elements
const markdownInput = document.getElementById('markdownInput');
const htmlPreview = document.getElementById('htmlPreview');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');

// Initialize converter
const converter = new MarkdownConverter();

// Update preview on input
markdownInput.addEventListener('input', updatePreview);

function updatePreview() {
    const markdown = markdownInput.value;
    const html = converter.convert(markdown);
    htmlPreview.innerHTML = html;
}

// Copy HTML to clipboard
copyBtn.addEventListener('click', () => {
    const html = htmlPreview.innerHTML;
    navigator.clipboard.writeText(html).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✅';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
});

// Download as HTML file
downloadBtn.addEventListener('click', () => {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #667eea; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        pre { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 8px; }
        a { color: #667eea; }
    </style>
</head>
<body>
    ${htmlPreview.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Clear all
clearBtn.addEventListener('click', () => {
    markdownInput.value = '';
    htmlPreview.innerHTML = '';
});

// Load sample on page load
updatePreview();
