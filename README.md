# 🧠 Medical Flashcards - NEET PG Edition

Production-ready flashcard app with real anatomy content, iPhone UI, and comprehensive user feedback collection.

## ✨ Features

### User-Facing
- **10 Real Anatomy Flashcards** with actual medical images
- **iPhone 15 Frame** with notch and home indicator
- **Clean iOS Design** - SF Pro typography, pastel colors
- **3-Point Rating System** - No / Not Sure / Yes
- **Clinical Correlations** - Each card includes clinical notes
- **Progress Tracking** - Color-coded progress bar (red/yellow/green)
- **Comprehensive Feedback** - 9 dropdown questions + free text

### Technical
- Built with **React 18 + Vite**
- **Supabase** backend for feedback storage
- Real anatomy images from Anki-style medical decks
- Fully responsive iPhone frame (390x844px)
- Form validation (10-digit phone numbers)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor**
4. Copy and paste the content from `SUPABASE_SETUP.sql`
5. Run the query to create the table

### 3. Add Environment Variables

Create a `.env` file:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from Supabase: **Project Settings → API**

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

**Live in 2 minutes!**

### Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site → Import from Git
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy

---

## 📊 Feedback Questions Collected

The app collects comprehensive feedback via dropdowns:

1. **Why wouldn't you use flashcards regularly?**
   - Takes too much time / Prefer notes / Don't trust content / Confusing UI / Boring / Would use regularly

2. **What's the most important missing feature?**
   - More subjects / Explanations / Spaced repetition / Progress tracking / Offline mode / Nothing

3. **Want MCQs after flashcard review?**
   - Yes definitely / Yes but high-yield only / Maybe / No, flashcards enough / No, use QBank separately

4. **Does this feel like studying or just revision?**
   - Proper studying / Quick revision / Testing myself / Doesn't feel productive / In between

5. **Are flashcards relevant for NEET PG?**
   - Very relevant, use daily / Somewhat for weak topics / Last-minute only / Not relevant / Depends on subject

6. **Want custom topic/subject selection?**
   - Absolutely essential / Fine with curated too / No preference / Prefer surprise / Both options

7. **Would you use pre-made decks?**
   - Yes if verified / Yes even community-made / Maybe, check quality first / No, make own / No opinion

8. **Would you share your decks with others?**
   - Love to contribute / Only verified content / Maybe if anonymous / Too much effort / Keep private

9. **Want to create your own flashcards in-app?**
   - Very important / Yes but tedious / Only if quick / Prefer pre-made / Haven't thought about it

Plus optional free-text comments.

---

## 🗂️ Project Structure

```
flashcards-medical/
├── public/
│   └── images/              # Anatomy images from Anki
├── src/
│   ├── components/
│   │   ├── LandingScreen.jsx
│   │   ├── FlashcardSession.jsx
│   │   └── FeedbackForm.jsx
│   ├── data/
│   │   └── flashcards.js    # 10 anatomy cards with clinical notes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── SUPABASE_SETUP.sql
├── package.json
└── README.md
```

---

## 🎨 Design System

### Colors (Pastel, No Gradients)
- **Red (No):** `#FF6B6B` / `#FFECEC` (bg)
- **Yellow (Not Sure):** `#FFD93D` / `#FFF9E5` (bg)
- **Green (Yes):** `#6BCF7F` / `#E8F8EC` (bg)
- **Blue (Primary):** `#007AFF`
- **Background:** `#F2F2F7`
- **Text:** `#1C1C1E` / `#8E8E93` (secondary)

### Typography
- **Font:** SF Pro Display / SF Pro Text (system font)
- **Sizes:** 13px (labels) / 15px (body) / 17px (inputs/buttons) / 22px (questions) / 28px (titles)
- **Weights:** 500 (medium) / 600 (semibold) / 700 (bold)

### iPhone Frame
- **Dimensions:** 390×844px (iPhone 15)
- **Border Radius:** 55px (outer) / 47px (screen)
- **Notch:** 150px wide × 30px tall
- **Home Indicator:** 140px wide × 5px tall

---

## 📝 Content

### Flashcard Topics Covered
1. **Brachial Plexus** - Terminal branches, cords, clinical injuries
2. **Cranial Base** - Bone identification, clinical significance
3. **Thoracic Wall** - Serratus anterior origin, long thoracic nerve
4. **Neck Fascia** - Layers, fascial spaces, infection spread

All cards include:
- High-quality anatomy diagrams
- Question with numbered labels
- Detailed answers
- Clinical correlations (Erb's palsy, CSF leak, winging scapula, etc.)

---

## 🔒 Data Privacy

- **Phone numbers:** Validated (10-digit, starts with 6-9)
- **Supabase RLS:** Enabled with anonymous insert/select policies
- **No tracking:** No analytics, no cookies
- **Local storage:** Session data only (not persistent)

---

## 🧪 Testing Checklist

- [ ] App loads with iPhone frame
- [ ] All 10 flashcards display with images
- [ ] Flip animation works
- [ ] Progress bar updates with correct colors
- [ ] Response buttons (No/Not Sure/Yes) work
- [ ] Feedback form validates all fields
- [ ] Phone number validation (10 digits)
- [ ] All dropdown questions must be answered
- [ ] Data submits to Supabase successfully
- [ ] Works on actual mobile device (responsive)

---

## 🐛 Troubleshooting

### Images not loading
- Check that images are in `public/images/` folder
- Verify paths in `flashcards.js` start with `/images/`

### Supabase errors
- Verify `.env` file has correct URL and key
- Check RLS policies are enabled
- Check table name matches: `flashcard_feedback_medical`

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version (need 18+)

---

## 📧 Support

Questions? Issues?
- Check Supabase logs for database errors
- Check browser console for JavaScript errors
- Verify environment variables are set correctly

---

## 🎯 Next Steps

After collecting feedback:
1. Review dropdown responses in Supabase
2. Identify common pain points
3. Prioritize missing features
4. Iterate on design based on "feels like studying" responses
5. Add most-requested features (MCQs, custom selection, etc.)

---

**Built with ❤️ for NEET PG students**
