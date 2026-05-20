# 🚀 Quick Setup Guide

## ❌ Current Error:

**"supabaseUrl is required"** - This means environment variables aren't loaded.

---

## ✅ Fix in 3 Steps:

### **Step 1: Get Your Supabase Anon Key**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your project: **kowllkfoendhmpsdwtnh**
3. Go to **Settings** (gear icon) → **API**
4. Copy the **anon / public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### **Step 2: Update .env File**

Open the `.env` file in the project root and replace `YOUR_ACTUAL_KEY_HERE` with your real key:

```
VITE_SUPABASE_URL=https://kowllkfoendhmpsdwtnh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_REAL_KEY_HERE
```

### **Step 3: Restart Dev Server**

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 📋 First Time Setup Checklist:

If you haven't set up Supabase yet:

1. **Create Table in Supabase:**
   - Go to Supabase → SQL Editor
   - Copy entire contents of `SUPABASE_SETUP.sql`
   - Paste and click "Run"
   
2. **Verify Table Created:**
   - Go to Table Editor
   - You should see `flashcard_feedback_medical` table

3. **Get API Key:**
   - Settings → API → Copy "anon public" key

4. **Update .env:**
   - Replace placeholder with real key

5. **Restart Server:**
   ```bash
   npm run dev
   ```

---

## ✅ How to Verify It's Working:

1. App loads without errors
2. Complete a flashcard session
3. Fill out feedback form
4. Submit
5. Go to Supabase → Table Editor → `flashcard_feedback_medical`
6. You should see your submission!

---

## 🐛 Still Not Working?

### Error: "Host is not supported"
- Check that your Supabase URL is correct
- Should be: `https://kowllkfoendhmpsdwtnh.supabase.co`

### Error: "Failed to submit"
- Check Supabase table exists
- Check RLS policies are enabled
- Check anon key is correct

### Error: "supabaseUrl is required"
- Make sure `.env` file is in the **root** folder (not in `src/`)
- Make sure variable names start with `VITE_`
- Restart dev server after changing `.env`

---

## 🎯 Quick Test (No Database)

Want to test the UI without setting up Supabase?

Just remove the feedback submit. Open `FeedbackForm.jsx` and comment out the database call:

```javascript
// Comment this out temporarily:
// const { error: supabaseError } = await supabase...

// Replace with:
console.log('Form data:', formData);
alert('Form submitted (not saved - Supabase not configured)');
onComplete();
```

This lets you test the full flow without database setup.

---

**Need help? Share your error message!** 🚀
