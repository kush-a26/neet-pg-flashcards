# 🔥 FIX: "Failed to submit" Error (400 Status)

## The Problem

You're getting a **400 Bad Request** error when submitting feedback. This means Supabase is rejecting the request.

---

## ✅ Step-by-Step Fix

### **Step 1: Check if .env file exists**

In your `flashcards-medical` folder, you should have a `.env` file:

```bash
# Check if file exists
ls -la .env

# If missing, create it:
touch .env
```

### **Step 2: Add Supabase credentials to .env**

Open `.env` and add:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these:**
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Click **Settings** (gear icon) → **API**
4. Copy:
   - **Project URL** → use this for `VITE_SUPABASE_URL`
   - **anon public** key → use this for `VITE_SUPABASE_ANON_KEY`

### **Step 3: Create the table in Supabase**

**This is the most common issue!**

1. Go to Supabase → **SQL Editor**
2. Open `SUPABASE_SETUP.sql` from your project
3. Copy the ENTIRE file content
4. Paste into SQL Editor
5. Click **Run**
6. You should see: "Success. No rows returned"

### **Step 4: Verify table exists**

1. Go to **Table Editor** in Supabase
2. You should see `flashcard_feedback` table
3. Check columns exist:
   - `user_name`
   - `phone_number`
   - `mbbs_year`
   - `why_use_flashcards` (TEXT[] array)
   - `biggest_barrier`
   - `most_important_feature`
   - `want_mcqs_after`
   - `session_feeling`
   - `additional_comments`

### **Step 5: Check Row Level Security (RLS)**

1. In Supabase, go to **Table Editor** → `flashcard_feedback`
2. Click the **RLS** indicator (should show enabled)
3. Click **View Policies**
4. You should see TWO policies:
   - ✅ "Anyone can insert feedback"
   - ✅ "Anyone can view feedback"

If policies are missing, run `SUPABASE_SETUP.sql` again.

### **Step 6: Restart dev server**

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

**IMPORTANT:** Changes to `.env` require a restart!

---

## 🧪 Test Your Connection

### Option A: Browser Console Test

1. Open your app in browser
2. Open DevTools (F12)
3. Go to **Console** tab
4. Copy and run this:

```javascript
// Replace with YOUR credentials
const url = 'https://YOUR-PROJECT-ID.supabase.co';
const key = 'YOUR-ANON-KEY';

fetch(`${url}/rest/v1/flashcard_feedback?select=count&limit=1`, {
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`
  }
})
.then(r => r.ok ? console.log('✅ Connected!') : console.error('❌ Failed:', r.status))
.catch(e => console.error('❌ Error:', e));
```

### Option B: Test with curl

```bash
curl "https://YOUR-PROJECT-ID.supabase.co/rest/v1/flashcard_feedback?select=count&limit=1" \
  -H "apikey: YOUR-ANON-KEY" \
  -H "Authorization: Bearer YOUR-ANON-KEY"
```

**Expected response:** `{"count":0}` or similar (not an error)

---

## 🔍 Common Issues

### Issue 1: "relation does not exist"

**Meaning:** Table doesn't exist in Supabase

**Fix:**
1. Run `SUPABASE_SETUP.sql` in Supabase SQL Editor
2. Refresh Table Editor to verify

### Issue 2: "Invalid API key"

**Meaning:** Wrong credentials in `.env`

**Fix:**
1. Double-check URL and key in Supabase Settings → API
2. Make sure you copied **anon public** key (not service_role key!)
3. No extra spaces or quotes in `.env`

### Issue 3: "violates check constraint"

**Meaning:** Phone number validation failed

**Fix:**
- Phone must be exactly 10 digits
- Must start with 6, 7, 8, or 9
- Example: `9876543210` ✅
- Bad: `09876543210` ❌ (11 digits)

### Issue 4: Changes not reflecting

**Meaning:** `.env` not reloaded

**Fix:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue 5: "Failed to load resource: 400"

**Most likely cause:** Table doesn't exist OR wrong table name

**Fix:**
1. Check table is named exactly `flashcard_feedback` (not `flashcard_feedback_medical`)
2. Re-run `SUPABASE_SETUP.sql`

---

## 📋 Checklist

Before submitting feedback, verify:

- [ ] `.env` file exists in project root
- [ ] `.env` has correct `VITE_SUPABASE_URL`
- [ ] `.env` has correct `VITE_SUPABASE_ANON_KEY`
- [ ] Ran `SUPABASE_SETUP.sql` in Supabase SQL Editor
- [ ] Table `flashcard_feedback` exists in Table Editor
- [ ] RLS is enabled with 2 policies
- [ ] Restarted dev server after creating `.env`
- [ ] Phone number is 10 digits starting with 6-9

---

## 🆘 Still Not Working?

### Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Try submitting feedback
4. Look for the error message
5. Share the **exact error text** you see

### Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try submitting feedback
4. Click on the failed request
5. Check **Response** tab for error details

### Verify Environment Variables

Add this temporarily to `FeedbackForm.jsx` (after imports):

```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Supabase client:', supabase ? 'Created' : 'NOT created');
```

You should see:
```
Supabase URL: https://your-project-id.supabase.co
Supabase Key exists: true
Supabase client: Created
```

If you see `undefined` or `NOT created`, your `.env` file isn't being read!

---

## ✅ Success Looks Like This

When everything works:

1. Fill out feedback form
2. Click **Submit Feedback**
3. See alert: "Thank you for your feedback! 🎉"
4. No errors in console
5. Go to Supabase → Table Editor → `flashcard_feedback`
6. See your submission in the table!

---

**Need more help?** Share your:
1. Browser console error
2. Network tab response
3. Supabase table structure screenshot
