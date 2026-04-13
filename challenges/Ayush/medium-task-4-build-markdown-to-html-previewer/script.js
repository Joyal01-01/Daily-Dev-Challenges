class MarkdownToHtmlConverter {
    constructor() {
        this.markdownInput = document.getElementById('markdownInput');
        this.htmlPreview = document.getElementById('htmlPreview');
        this.generatedHtml = document.getElementById('generatedHtml');
        this.init();
    }

    init() {
        // Event listeners for input
        this.markdownInput.addEventListener('input', () => this.convertMarkdown());
        
        // Button listeners
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('copyMarkdownBtn').addEventListener('click', () => this.copyMarkdown());
        document.getElementById('copyHtmlBtn').addEventListener('click', () => this.copyPreview());
        document.getElementById('copyGeneratedBtn').addEventListener('click', () => this.copyGenerated());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadHtml());

        // Initial conversion
        this.convertMarkdown();
    }

    convertMarkdown() {
        const markdown = this.markdownInput.value;
        const html = this.markdownToHtml(markdown);
        
        // Display in preview
        this.htmlPreview.innerHTML = html;
        
        // Display raw HTML
        this.generatedHtml.innerHTML = `<code>${this.escapeHtml(html)}</code>`;
    }

    markdownToHtml(markdown) {
        let html = markdown;

        // Escape HTML entities first
        html = html.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');

        // Headers (must be done before other replacements)
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
        html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
        html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
        html = html.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');

        // Code blocks (before inline code)
        html = html.replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Blockquotes
        html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

        // Horizontal rules
        html = html.replace(/^(---|\*\*\*|___)$/gm, '<hr>');

        // Tables
        html = this.convertTables(html);

        // Bold (must be before italic)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');

        // Strikethrough
        html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Convert URLs to links
        html = html.replace(/(?:https?:\/\/|www\.)([\w\.-]+)/g, '<a href="https://$1">$&</a>');

        // Line breaks
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';

        // Lists
        html = this.convertLists(html);

        // Clean up empty tags
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(<h[1-6])/g, '$1');
        html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<p>(<ul|<ol)/g, '$1');
        html = html.replace(/(<\/ul>|<\/ol>)<\/p>/g, '$1');
        html = html.replace(/<p>(<pre)/g, '$1');
        html = html.replace(/(<\/pre>)<\/p>/g, '$1');
        html = html.replace(/<p>(<blockquote)/g, '$1');
        html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
        html = html.replace(/<p>(<hr)/g, '$1');
        html = html.replace(/(<hr>)<\/p>/g, '$1');

        return html;
    }

    convertLists(html) {
        // Unordered lists
        const ulRegex = /(<p>)?(\s*)([-*+]\s+[^\n]+(?:\n(?:\s{2,}[-*+]\s+[^\n]+)*)?(?:\n|$))+/gm;
        html = html.replace(ulRegex, (match) => {
            const items = match.match(/[-*+]\s+([^\n]+)/g) || [];
            return '<ul>' + items.map(item => '<li>' + item.replace(/^[-*+]\s+/, '').trim() + '</li>').join('') + '</ul>';
        });

        // Ordered lists
        const olRegex = /(<p>)?(\s*)(\d+\.\s+[^\n]+(?:\n(?:\s{2,}\d+\.\s+[^\n]+)*)?(?:\n|$))+/gm;
        html = html.replace(olRegex, (match) => {
            const items = match.match(/\d+\.\s+([^\n]+)/g) || [];
            return '<ol>' + items.map(item => '<li>' + item.replace(/^\d+\.\s+/, '').trim() + '</li>').join('') + '</ol>';
        });

        return html;
    }

    convertTables(html) {
        const tableRegex = /\|(.+)\n\|[-:\s|]+\n((?:\|.+\n?)*)/g;
        
        return html.replace(tableRegex, (match, headerStr, rowsStr) => {
            const headers = headerStr.split('|').map(h => h.trim()).filter(h => h);
            const rows = rowsStr.trim().split('\n').map(row => 
                row.split('|').map(cell => cell.trim()).filter(cell => cell)
            );

            let table = '<table><thead><tr>';
            headers.forEach(header => {
                table += '<th>' + header + '</th>';
            });
            table += '</tr></thead><tbody>';
            
            rows.forEach(row => {
                table += '<tr>';
                row.forEach(cell => {
                    table += '<td>' + cell + '</td>';
                });
                table += '</tr>';
            });
            
            table += '</tbody></table>';
            return table;
        });
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    clear() {
        if (confirm('Clear all content?')) {
            this.markdownInput.value = '';
            this.convertMarkdown();
        }
    }

    copyMarkdown() {
        navigator.clipboard.writeText(this.markdownInput.value).then(() => {
            this.showCopyFeedback('Markdown copied!');
        });
    }

    copyPreview() {
        navigator.clipboard.writeText(this.htmlPreview.innerHTML).then(() => {
            this.showCopyFeedback('HTML copied!');
        });
    }

    copyGenerated() {
        const html = this.generatedHtml.textContent;
        navigator.clipboard.writeText(html).then(() => {
            this.showCopyFeedback('HTML source copied!');
        });
    }

    downloadHtml() {
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Preview</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 20px;
            margin-bottom: 10px;
        }
        h1 { border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        h2 { border-bottom: 1px solid #ddd; padding-bottom: 8px; }
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
        }
        pre {
            background: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
        pre code {
            background: none;
            padding: 0;
            color: #61dafb;
        }
        blockquote {
            border-left: 4px solid #667eea;
            padding: 12px 15px;
            margin: 15px 0;
            background: #f5f5f5;
        }
        a { color: #667eea; }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 15px 0;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        table th {
            background: #667eea;
            color: white;
        }
    </style>
</head>
<body>
${this.htmlPreview.innerHTML}
</body>
</html>`;

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'markdown-preview.html';
        a.click();
        URL.revokeObjectURL(url);
    }

    showCopyFeedback(message) {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    new MarkdownToHtmlConverter();
});
