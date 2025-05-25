# Markdown-to-SSML Converter

A web application that converts plain Markdown text into **Speech Synthesis Markup Language (SSML)** using Google's Gemini Pro 2.5 AI model.

## Purpose

The goal of this project is to automate the tedious and error-prone task of manually converting raw text materials (typically in Markdown) into properly structured SSML for text-to-speech (TTS) applications. This involves:

* Recognizing logical structure (headers, sections, lists)
* Adding appropriate pauses and emphasis
* Producing valid SSML ready for use in synthesis engines

This is a compelling use case for AI — applying language models to eliminate repetitive formatting work and streamline voice content production.

## Tech Stack

* **Backend**: Python with Flask
* **Model**: [Gemini Pro 2.5](https://deepmind.google/technologies/gemini/) — selected for its strong reasoning and long-context handling
* **Frontend**: HTML, CSS, JavaScript with CodeMirror for syntax highlighting
* **Format Input**: Markdown (`.md`)
* **Format Output**: SSML (XML)

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Google API Key for Gemini Pro

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/danielrosehill/Gemini-SSML-Formatter.git
   cd Gemini-SSML-Formatter
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up your Google API Key:
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual Google API key

### Running the Application

1. Start the Flask server:
   ```
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## Usage

1. Enter your Markdown text in the left editor
2. Click "Convert to SSML" to process the text
3. The converted SSML will appear in the right editor
4. Use the "Copy SSML" button to copy the result to your clipboard
5. You can also load a sample Markdown text using the "Load Sample" button

## SSML Features

The converter adds the following SSML enhancements:

- `<break>` tags for pauses between sections and paragraphs
- Appropriate emphasis for headers and important text
- Proper handling of lists and structural elements
- Valid SSML compatible with Google Cloud, Amazon Polly, and Azure TTS

 