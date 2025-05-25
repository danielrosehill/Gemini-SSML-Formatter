import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import markdown

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("Warning: GOOGLE_API_KEY not found in environment variables")
else:
    genai.configure(api_key=GOOGLE_API_KEY)

# Load system prompt
with open("system-prompt.md", "r") as f:
    SYSTEM_PROMPT = f.read()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    try:
        # Get markdown content from request
        data = request.get_json()
        markdown_text = data.get('markdown', '')
        
        if not markdown_text:
            return jsonify({"error": "No markdown text provided"}), 400
        
        # Convert markdown to SSML using Gemini
        ssml = convert_markdown_to_ssml(markdown_text)
        
        return jsonify({"ssml": ssml})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def convert_markdown_to_ssml(markdown_text):
    """Convert markdown text to SSML using Gemini Pro model"""
    try:
        # Configure the model
        model = genai.GenerativeModel(
            model_name="gemini-pro-2.5",
            system_instruction=SYSTEM_PROMPT
        )
        
        # Generate response
        response = model.generate_content(markdown_text)
        
        # Return the SSML
        return response.text
    
    except Exception as e:
        print(f"Error in Gemini API call: {e}")
        raise Exception(f"Failed to convert markdown to SSML: {e}")

if __name__ == '__main__':
    app.run(debug=True)
