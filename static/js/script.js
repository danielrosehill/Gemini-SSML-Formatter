document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror for Markdown input
    const markdownEditor = CodeMirror.fromTextArea(document.getElementById('markdown-editor'), {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true
    });

    // Initialize CodeMirror for SSML output
    const ssmlOutput = CodeMirror.fromTextArea(document.getElementById('ssml-output'), {
        mode: 'xml',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true
    });

    // Get DOM elements
    const convertBtn = document.getElementById('convert-btn');
    const copyBtn = document.getElementById('copy-btn');
    const loadSampleBtn = document.getElementById('load-sample');
    const sampleMarkdown = document.getElementById('sample-markdown');
    const statusMessage = document.getElementById('status-message');

    // Convert Markdown to SSML
    convertBtn.addEventListener('click', async function() {
        const markdown = markdownEditor.getValue();
        
        if (!markdown.trim()) {
            showStatus('Please enter some Markdown text', 'error');
            return;
        }

        try {
            showStatus('Converting...', '');
            
            const response = await fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ markdown: markdown })
            });

            const data = await response.json();
            
            if (response.ok) {
                ssmlOutput.setValue(data.ssml);
                showStatus('Conversion successful!', 'success');
            } else {
                showStatus(`Error: ${data.error}`, 'error');
            }
        } catch (error) {
            showStatus(`Error: ${error.message}`, 'error');
        }
    });

    // Copy SSML to clipboard
    copyBtn.addEventListener('click', function() {
        const ssml = ssmlOutput.getValue();
        
        if (!ssml.trim()) {
            showStatus('No SSML to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(ssml)
            .then(() => {
                showStatus('SSML copied to clipboard!', 'success');
            })
            .catch(err => {
                showStatus(`Failed to copy: ${err}`, 'error');
            });
    });

    // Load sample Markdown
    loadSampleBtn.addEventListener('click', function() {
        markdownEditor.setValue(sampleMarkdown.textContent.trim());
        showStatus('Sample loaded', 'success');
    });

    // Helper function to show status messages
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = '';
        }, 5000);
    }
});
