# Markdown-to-SSML Agent (WIP)

This is a **work-in-progress** repository for an AI-powered agent that converts plain Markdown text into **Speech Synthesis Markup Language (SSML)**.

## Purpose

The goal of this project is to automate the tedious and error-prone task of manually converting raw text materials (typically in Markdown) into properly structured SSML for text-to-speech (TTS) applications. This involves:

* Recognizing logical structure (headers, sections, lists)
* Adding appropriate pauses and emphasis
* Producing valid SSML ready for use in synthesis engines

I believe this is a compelling use case for AI — applying language models to eliminate repetitive formatting work and streamline voice content production.

## Tech Stack (Planned)

* **Model**: [Gemini Pro 2.5](https://deepmind.google/technologies/gemini/) — selected for its strong reasoning and long-context handling.
* **Frontend**: Firebase Studio and/or AI Studio — still experimenting with which best suits the final deployment.
* **Format Input**: Markdown (`.md`)
* **Format Output**: SSML (XML)

## Status

Currently in development. The system prompt is defined, and experimentation is underway to fine-tune conversion logic and hosting environment.

 