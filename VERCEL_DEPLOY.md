# 🚀 Deploy to Vercel - Quick Guide

## **Method 1: Push to GitHub + Auto-Deploy (Recommended)**

### Step 1: Create GitHub Repository

```bash
# In your flashcards-medical folder
git init
git add .
git commit -m "Initial commit - Medical flashcards app"
```

### Step 2: Push to GitHub

1. Go to [github.com](https://github.com) → New Repository
2. Name it: `medical-flashcards`
3. Don't initialize with README
4. Copy the commands GitHub shows you:

```bash
git remote add origin https://github.com/YOUR_USERNAME/medical-flashcards.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. **Import** your GitHub repository
4. Vercel auto-detects it's a Vite app
5. Add environment variables:
   - `VITE_SUPABASE_URL` = `https://kowllkfoendhmpsdwtnh.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `[your anon key]`
6. Click **Deploy**

**Done!** Your app is live at `https://medical-flashcards.vercel.app`

---

## **Method 2: Vercel CLI (If You Don't Want GitHub)**

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy

```bash
cd flashcards-medical
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? **[your account]**
- Link to existing project? **N**
- Project name? **medical-flashcards**
- In which directory? **./

**
- Override settings? **N**

Add environment variables:
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

Then deploy again:
```bash
vercel --prod
```

---

## **To Update After Changes:**

### If Using GitHub (Method 1):

```bash
git add .
git commit -m "Updated flashcards and fixed bottom buttons"
git push
```

**Vercel auto-deploys!** ✅

### If Using Vercel CLI (Method 2):

```bash
vercel --prod
```

---

## **Check Your Live App:**

After deployment, Vercel gives you a URL like:
- `https://medical-flashcards.vercel.app`
- Or custom domain you set up

---

## **Common Issues:**

### Build fails with "Module not found"
```bash
# Make sure package.json has all dependencies
npm install
# Try building locally first
npm run build
```

### Environment variables not working
- Make sure they start with `VITE_`
- Re-deploy after adding env vars

### Images not loading
- Check images are in `public/images/` folder
- Paths should be `/images/filename.png` (no `public/`)

---

## **Your Current Setup:**

✅ App built with Vite + React
✅ Supabase configured
✅ Environment variables needed:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

**Recommended:** Use GitHub + Vercel (Method 1) for automatic deployments on every push!

---

**Need help?** Share any error messages you get during deployment.
