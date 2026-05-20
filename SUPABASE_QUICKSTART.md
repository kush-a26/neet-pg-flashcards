# 🗄️ Supabase Setup - Quick Guide

## ✅ Option A: Use Existing Supabase Project (Recommended)

### Step 1: Get Your Credentials

1. Go to [supabase.com](https://supabase.com)
2. Open your existing project
3. Click **Settings** (gear icon) → **API**
4. Copy:
   - **Project URL**
   - **anon/public key**

### Step 2: Create `.env` File

In your `flashcards-medical` folder, create a file named `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Run SQL Setup

1. In Supabase, go to **SQL Editor**
2. Copy the entire content from `SUPABASE_SETUP.sql`
3. Paste and click **Run**
4. You should see: "Success. No rows returned"

### Step 4: Verify Table Created

Go to **Table Editor** → You should see `flashcard_feedback` table

### Step 5: Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Option B: Test Without Database (Local Only)

If you just want to test the UI without setting up the database:

### The app will still work!

- Flashcard session works normally
- Feedback form displays correctly
- When you submit, you'll see an error message: "Database not configured"
- But the UI and all interactions work fine

### To test:

```bash
npm run dev
```

Just skip the feedback submission step.

---

## 🐛 Troubleshooting

### Error: "Database not configured"

**Cause:** Missing `.env` file or incorrect credentials

**Fix:**
1. Create `.env` file in project root
2. Add correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Restart dev server (`npm run dev`)

### Error: "Failed to submit" (400 status code)

**Cause:** Table doesn't exist in Supabase

**Fix:**
1. Go to Supabase → SQL Editor
2. Run the SQL from `SUPABASE_SETUP.sql`
3. Verify table exists in Table Editor

### Error: "Host is not supported"

**Cause:** Wrong Supabase URL format

**Fix:**
- Make sure URL is: `https://YOUR-PROJECT-ID.supabase.co`
- No trailing slash
- Must start with `https://`

---

## 📊 What Gets Stored?

When feedback is submitted, the database saves:

- **User Info:** Name, phone, MBBS year
- **Session Data:** Duration, cards completed, responses (yes/no/not sure)
- **Feedback Answers:** 
  - Why use flashcards (multi-select array)
  - Biggest barrier (dropdown)
  - Most important feature (dropdown)
  - Want MCQs after (dropdown)
  - Session feeling (dropdown)
  - Additional comments (free text)

---

## 🔐 Security Note

The `.env` file is already in `.gitignore` so your credentials won't be committed to Git.

**Never share your anon key publicly!**

---

## ✅ Quick Test

After setup, test the complete flow:

1. Start app: `npm run dev`
2. Complete a flashcard session
3. Fill feedback form
4. Submit
5. Check Supabase → Table Editor → `flashcard_feedback`
6. You should see your submission!

---

**Need help?** Check the console for error messages.
