// Markdown to HTML Converter
class MarkdownConverter {
    static convert(markdown) {
        let html = markdown;

        // Escape html special characters but preserve intended tags
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // Headers
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Ordered lists
        html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, (match) => {
            if (!match.includes('<ol>')) {
                return '<ol>' + match + '</ol>';
            }
            return match;
        });

        // Unordered lists
        html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, (match, p1) => {
            if (match.includes('<ol>')) return match;
            if (!match.includes('<ul>')) {
                return '<ul>' + match + '</ul>';
            }
            return match;
        });

        // Paragraphs
        html = html.split('\n\n').map(para => {
            para = para.trim();
            if (para && 
                !para.startsWith('<h') && 
                !para.startsWith('<pre') &&
                !para.startsWith('<ul') && 
                !para.startsWith('<ol') &&
                !para.startsWith('<li')) {
                return '<p>' + para + '</p>';
            }
            return para;
        }).join('\n');

        // Line breaks
        html = html.replace(/\n/g, '<br>');

        return html;
    }
}

// Get elements
const markdownInput = document.getElementById('markdownInput');
const preview = document.getElementById('preview');

// Update preview on input
markdownInput.addEventListener('input', () => {
    const markdown = markdownInput.value;
    const html = MarkdownConverter.convert(markdown);
    preview.innerHTML = html;
});

// Download HTML
function downloadHTML() {
    const markdown = markdownInput.value;
    const html = MarkdownConverter.convert(markdown);

    const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Document</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        h1 { border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        code { background: #e8eaf6; padding: 2px 6px; border-radius: 3px; }
        pre { background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 8px; overflow-x: auto; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
${html}
</body>
</html>`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(fullDocument));
    element.setAttribute('download', 'document.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Copy HTML
function copyHTML() {
    const markdown = markdownInput.value;
    const html = MarkdownConverter.convert(markdown);

    navigator.clipboard.writeText(html).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

// Clear text
function clearText() {
    if (confirm('Are you sure you want to clear all text?')) {
        markdownInput.value = '';
        preview.innerHTML = '';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    markdownInput.value = '';
    preview.innerHTML = '<p style="color: #999;">Enter markdown to see preview...</p>';
});
