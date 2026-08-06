# 🚀 HumanityOS - Daily Startup Guide

This guide explains how to start the HumanityOS project after opening your PC.

---

# Project Structure

HumanityOS/
├── backend/
├── frontend/
├── START_PROJECT.md
└── README.md

---

# Step 1 - Open the Project

Open Visual Studio Code.

Open the folder:

D:\HumanityOS-Project\HumanityOS

---

# Step 2 - Start Backend

Open Terminal 1.

Go to backend:

```powershell
cd D:\HumanityOS-Project\HumanityOS\backend
```

Activate Virtual Environment

PowerShell

```powershell
.\.venv\Scripts\Activate
```

Command Prompt

```cmd
.venv\Scripts\activate
```

Start FastAPI

```powershell
uvicorn app.main:app --reload
```

Wait until you see:

```
Application startup complete.
```

Leave this terminal running.

---

# Step 3 - Start Frontend

Open Terminal 2.

Go to frontend

```powershell
cd D:\HumanityOS-Project\HumanityOS\frontend
```

Install packages (only if needed)

```powershell
npm install
```

Start Next.js

```powershell
npm run dev
```

Wait until you see

```
Local: http://localhost:3000
```

Leave this terminal running.

---

# Step 4 - Open the Website

Open your browser.

Visit

```
http://localhost:3000
```

Login using

✅ Google Authentication

---

# Step 5 - Backend Documentation

Swagger

```
http://127.0.0.1:8000/api/docs
```

Health Check

```
http://127.0.0.1:8000/api/health
```

---

# Step 6 - Verify Everything

Backend

✅ Running

Frontend

✅ Running

Google Login

✅ Working

Supabase

✅ Connected

Firebase

✅ Connected

---

# Useful Commands

Backend

```powershell
cd backend
.\.venv\Scripts\Activate
uvicorn app.main:app --reload
```

Frontend

```powershell
cd frontend
npm run dev
```

---

# If Backend Fails

Install dependencies

```powershell
pip install -r requirements.txt
```

---

# If Frontend Fails

```powershell
npm install
```

Then

```powershell
npm run dev
```

---

# Git Commands

Check Status

```powershell
git status
```

Add Files

```powershell
git add .
```

Commit

```powershell
git commit -m "Your Message"
```

Push

```powershell
git push origin main
```

Pull Latest Changes

```powershell
git pull origin main
```

---

# Project URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/api/docs
```

Health Check

```
http://127.0.0.1:8000/api/health
```

---

# Authentication

Firebase

✅ Google Authentication

✅ GitHub Authentication

Backend

FastAPI

Database

Supabase PostgreSQL

---

# APIs

Backend API Base URL

```
http://127.0.0.1:8000/api/v1
```

---

# AI Provider

Gemini API

Configured in

backend/.env

Example

```
GEMINI_API_KEY=YOUR_API_KEY
```

---

# Environment Files

Frontend

```
frontend/.env.local
```

Backend

```
backend/.env
```

Never commit these files to GitHub.

---

# Before Starting Development

✓ Backend Running

✓ Frontend Running

✓ Swagger Opens

✓ Google Login Works

✓ Database Connected

✓ Gemini API Loaded

✓ Ready to Code 🚀