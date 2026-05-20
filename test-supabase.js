// Run this in your browser console to test Supabase connection

const supabaseUrl = 'https://kowllkfoendhmpsdwtnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvd2xsa2ZvZW5kaG1wc2R3dG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTAwODQsImV4cCI6MjA5NDIyNjA4NH0.4aABOOPz-N5zwMgAhtaqFwXBRDgS58N3HbgLBJ0RnVs';

// Test 1: Check if table exists
fetch(`${supabaseUrl}/rest/v1/flashcard_feedback_medical?select=*&limit=1`, {
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
    return res.text().then(text => console.error('Error details:', text));
  }
})
.then(data => console.log('Table data:', data))
.catch(err => console.error('❌ Connection error:', err));
