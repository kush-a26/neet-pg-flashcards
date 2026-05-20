import { useState } from 'react';
import './FeedbackForm.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function FeedbackForm({ sessionData, onComplete }) {
  const [formData, setFormData] = useState({
    user_name: '',
    phone_number: '',
    mbbs_year: '',
    why_use_flashcards: [], // Array for multi-select
    biggest_barrier: '',
    most_important_feature: '',
    want_mcqs_after: '',
    session_feeling: '',
    additional_comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dropdownQuestions = [
    {
      id: 'why_use_flashcards',
      label: 'Why would you use flashcards? (Select all that apply)',
      type: 'multiselect',
      options: [
        'Quick recall practice',
        'Image-based learning',
        'Active recall vs passive reading',
        'Spaced repetition',
        'Test myself before exams',
        'Fill knowledge gaps',
        'I wouldn\'t use flashcards'
      ]
    },
    {
      id: 'biggest_barrier',
      label: 'What\'s the biggest barrier to using flashcards regularly?',
      options: [
        'Select an option',
        'Takes too much time',
        'Boring / not engaging',
        'Don\'t trust the accuracy',
        'Prefer reading notes',
        'Nothing, would use it'
      ]
    },
    {
      id: 'most_important_feature',
      label: 'What\'s the most important missing feature?',
      options: [
        'Select an option',
        'More subjects (Medicine, Surgery)',
        'Topic/subject selection',
        'Progress tracking over time',
        'Spaced repetition reminders',
        'Nothing major missing'
      ]
    },
    {
      id: 'want_mcqs_after',
      label: 'Would you want to solve MCQs after flashcard review?',
      options: [
        'Select an option',
        'Yes, essential',
        'Yes, but only high-yield',
        'No, flashcards are enough',
        'No, I use QBank separately'
      ]
    },
    {
      id: 'session_feeling',
      label: 'How did this session feel?',
      options: [
        'Select an option',
        'Like actual studying',
        'Good for quick revision',
        'Just testing myself',
        'Didn\'t feel productive',
        'Somewhere in between'
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleMultiSelect = (questionId, option) => {
    setFormData(prev => {
      const currentValues = prev[questionId] || [];
      const isSelected = currentValues.includes(option);
      
      if (isSelected) {
        // Remove option
        return {
          ...prev,
          [questionId]: currentValues.filter(v => v !== option)
        };
      } else {
        // Add option
        return {
          ...prev,
          [questionId]: [...currentValues, option]
        };
      }
    });
    setError('');
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if Supabase is configured
    if (!supabase) {
      setError('Database not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env file');
      return;
    }

    // Validation
    if (!formData.user_name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validatePhone(formData.phone_number)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!formData.mbbs_year) {
      setError('Please select your MBBS year');
      return;
    }

    // Check if all dropdown questions are answered
    const unansweredQuestions = dropdownQuestions.filter(q => {
      if (q.type === 'multiselect') {
        // For multi-select, check if at least one option is selected
        return !formData[q.id] || formData[q.id].length === 0;
      } else {
        // For regular select, check if option is selected and not default
        return !formData[q.id] || formData[q.id] === 'Select an option';
      }
    });

    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: supabaseError } = await supabase
        .from('flashcard_feedback')
        .insert([
          {
            ...formData,
            session_duration: sessionData?.duration || 0,
            cards_completed: sessionData?.cardsCompleted || 0,
            responses: sessionData?.responses || {}
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        throw supabaseError;
      }

      alert('Thank you for your feedback! 🎉');
      onComplete();
    } catch (err) {
      console.error('Error submitting feedback:', err);
      
      // More helpful error messages
      if (err.message?.includes('relation') || err.message?.includes('does not exist')) {
        setError('Database table not found. Please run SUPABASE_SETUP.sql in Supabase SQL Editor.');
      } else if (err.message?.includes('violates')) {
        setError('Validation error. Please check phone number is 10 digits starting with 6-9.');
      } else {
        setError('Failed to submit. Check console for details.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Quick Feedback</h2>
        <p>Help us improve! Takes 2 minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        {/* User Info Section */}
        <div className="form-section">
          <label className="form-label">
            Your Name
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="form-input"
            />
          </label>

          <label className="form-label">
            Phone Number
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className="form-input"
              maxLength="10"
            />
          </label>

          <label className="form-label">
            MBBS Year
            <select
              name="mbbs_year"
              value={formData.mbbs_year}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="before_2019">Before 2019</option>
            </select>
          </label>
        </div>

        {/* Dropdown Questions */}
        <div className="form-section">
          {dropdownQuestions.map(question => (
            <label key={question.id} className="form-label">
              {question.label}
              
              {question.type === 'multiselect' ? (
                /* Multi-select checkbox UI */
                <div className="checkbox-group">
                  {question.options.map(option => {
                    const isChecked = (formData[question.id] || []).includes(option);
                    return (
                      <label 
                        key={option} 
                        className={`checkbox-item ${isChecked ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleMultiSelect(question.id, option)}
                          className="checkbox-input"
                        />
                        <span className="checkbox-label">{option}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                /* Regular dropdown */
                <select
                  name={question.id}
                  value={formData[question.id]}
                  onChange={handleChange}
                  className="form-select"
                >
                  {question.options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>
          ))}
        </div>

        {/* Additional Comments */}
        <div className="form-section">
          <label className="form-label">
            Anything else? (Optional)
            <textarea
              name="additional_comments"
              value={formData.additional_comments}
              onChange={handleChange}
              placeholder="Any other thoughts..."
              className="form-textarea"
              rows="3"
            />
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
