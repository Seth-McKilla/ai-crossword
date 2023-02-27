# Introduction

## 👋 Welcome to the ai-crosswords repository!

This document serves as a guide to get your local development environment up and running in as little time and headache as possible.

<br />

# Tech Stack

### 📃 Language: [Typescript](https://www.typescriptlang.org/docs/) & [React](https://reactjs.org/docs/getting-started.html)

### 💻 Framework: [NextJS](https://beta.nextjs.org/docs)

### 💅 Styling: [Tailwindcss](https://tailwindcss.com/)

### ☁️ Hosting: [Vercel](https://vercel.com/docs)

<br />

# Installation

## Prerequisites

### 1. [Node.js](https://nodejs.org/en/download/) (LTS version)

### 2. A package manager, [pnpm](https://pnpm.io/installation) is highly recommended!

### 3. An [OpenAI API key](https://beta.openai.com/docs/developer-quickstart/api-key)

<br />

## Setup local environment

### 1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Seth-McKilla/ai-crossword.git
cd ai-crossword
pnpm install
```

### 2. Rename the `.env.example` file to `.env.local` and add your OpenAI API key:

```env
mv .env.example .env.local
```

### 3. Run the local development environment:

```bash
pnpm dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to see the app running in your browser.

### That's it! Happy coding 😀
