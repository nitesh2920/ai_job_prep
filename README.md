# AI Powered Job Prep Platform

An intelligent job interview preparation platform that uses AI to analyze resumes, generate tailored interview questions, and conduct real-time empathic voice interviews using Hume AI.

## 🚀 Features
- **Resume Analysis**: Upload your resume and get detailed feedback using Google Gemini.
- **Tailored Questions**: Generate specific interview questions based on job descriptions and your experience.
- **Voice Interviews**: Practice interviews with an empathic AI interviewer (Hume AI).
- **Comprehensive Dashboard**: Track your job prep progress and interview history.
- **Secure Auth**: Authentication and user management via Clerk.
- **Cloud Database**: Fast and reliable data storage using Neon PostgreSQL.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **AI**: Google Gemini (Analysis), Hume AI (Voice Interface)
- **Database**: PostgreSQL (Neon.tech)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Security**: Arcjet (Rate limiting & Bot protection)
- **Styling**: Tailwind CSS & Lucide React

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
# Database (Neon.tech)
DATABASE_URL=your_postgres_connection_string

# Arcjet
ARCJET_KEY=your_arcjet_key

# Clerk (Authentication)
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SIGNING_SECRET=your_clerk_webhook_signing_secret

# Clerk Navigation
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

# Hume AI
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key
NEXT_PUBLIC_HUME_CONFIG_ID=your_hume_config_id

# AI Models
GEMINI_API_KEY=your_gemini_api_key
```

## 🎙️ Hume AI Setup Guide

To enable voice interviews, follow these steps to get your Hume AI credentials:

1.  **Sign Up**: Go to the [Hume AI Portal](https://portal.hume.ai/) and create an account.
2.  **API Keys**:
    -   Navigate to the **API Keys** section.
    -   Generate a new **API Key**.
    -   Copy the `API Key` and the `Secret Key` (you only see the Secret Key once, so save it safely!).
3.  **EVI Configuration**:
    -   Go to **EVI (Empathic Voice Interface)** in the sidebar.
    -   Create a **New Configuration**.
    -   Set your interviewer's persona (e.g., "Professional Technical Interviewer").
    -   Save the configuration and copy the **Config ID**.
4.  **Update `.env`**: Add the `HUME_API_KEY`, `HUME_SECRET_KEY`, and `NEXT_PUBLIC_HUME_CONFIG_ID` to your environment file.

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:push
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🔒 Security
The project uses **Arcjet** for protecting sensitive routes and ensuring the AI models are used responsibly by preventing excessive requests.
