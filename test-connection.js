// Test Supabase Connection
// Run this in your browser console to check if Supabase is working

const supabaseUrl = 'https://YOUR-PROJECT-ID.supabase.co';
const supabaseKey = 'YOUR-ANON-KEY-HERE';

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);

// Test 1: Check if table exists
fetch(`${supabaseUrl}/rest/v1/flashcard_feedback?select=count&limit=1`, {
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`
  }
})
.then(res => {
  if (res.ok) {
    console.log('✅ Table exists and is accessible!');
    return res.json();
  } else {
    console.error('❌ Table check failed:', res.status, res.statusText);
    return res.text().then(text => {
      console.error('Error details:', text);
      if (text.includes('relation')) {
        console.error('🔥 TABLE DOES NOT EXIST - Run SUPABASE_SETUP.sql in Supabase SQL Editor');
      }
    });
  }
})
.then(data => {
  if (data) console.log('Table data:', data);
})
.catch(err => console.error('❌ Connection error:', err));

console.log('---');
console.log('If you see errors:');
console.log('1. Check that table exists: Supabase → Table Editor');
console.log('2. Run SUPABASE_SETUP.sql if table is missing');
console.log('3. Verify .env file has correct credentials');
