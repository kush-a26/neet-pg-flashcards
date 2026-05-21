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
    comparison_to_normal_revision: '',  // NEW QUESTION ADDED
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
    },
    // NEW 6TH QUESTION ADDED HERE
    {
      id: 'comparison_to_normal_revision',
      label: 'How is this compared to how you normally revise?',
      options: [
        'Select an option',
        'Better than my usual method',
        'Worse than my usual method',
        'About the same',
        'I don\'t have a regular revision method'
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
    const phoneRegex = /^[6-9][0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.user_name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validatePhone(formData.phone_number)) {
      setError('Phone number must be 10 digits starting with 6-9');
      return;
    }

    if (!formData.mbbs_year) {
      setError('Please select your MBBS year');
      return;
    }

    // Validate dropdown questions (all except why_use_flashcards which is multi-select)
    const dropdownIds = dropdownQuestions
      .filter(q => q.type !== 'multiselect')
      .map(q => q.id);
    
    for (const id of dropdownIds) {
      if (!formData[id] || formData[id] === 'Select an option') {
        setError('Please answer all questions');
        return;
      }
    }

    // Validate multi-select has at least one option
    if (!formData.why_use_flashcards || formData.why_use_flashcards.length === 0) {
      setError('Please select at least one reason for using flashcards');
      return;
    }

    if (!supabase) {
      setError('Unable to connect to database. Please check your configuration.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: submitError } = await supabase
        .from('flashcard_feedback')
        .insert([
          {
            user_name: formData.user_name.trim(),
            phone_number: formData.phone_number.trim(),
            mbbs_year: formData.mbbs_year,
            session_duration: sessionData.duration,
            cards_completed: sessionData.cardsCompleted,
            responses: sessionData.responses,
            why_use_flashcards: formData.why_use_flashcards,
            biggest_barrier: formData.biggest_barrier,
            most_important_feature: formData.most_important_feature,
            want_mcqs_after: formData.want_mcqs_after,
            session_feeling: formData.session_feeling,
            comparison_to_normal_revision: formData.comparison_to_normal_revision,  // NEW FIELD
            additional_comments: formData.additional_comments.trim()
          }
        ]);

      if (submitError) throw submitError;

      onComplete();
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form">
      <div className="form-header">
        <h2>📝 Your Feedback</h2>
        <p>Help us improve the flashcard experience</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="user_name">Name *</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number *</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="10-digit number"
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mbbs_year">MBBS Year *</label>
            <select
              id="mbbs_year"
              name="mbbs_year"
              value={formData.mbbs_year}
              onChange={handleChange}
              required
            >
              <option value="">Select year</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="Intern">Intern</option>
              <option value="PG">PG</option>
            </select>
          </div>
        </div>

        {/* Feedback Questions */}
        <div className="form-section">
          {dropdownQuestions.map((question) => (
            <div key={question.id} className="form-group">
              <label>{question.label}</label>
              
              {question.type === 'multiselect' ? (
                <div className="checkbox-group">
                  {question.options.map((option) => (
                    <label key={option} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData[question.id]?.includes(option) || false}
                        onChange={() => handleMultiSelect(question.id, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <select
                  name={question.id}
                  value={formData[question.id]}
                  onChange={handleChange}
                  required
                >
                  {question.options.map((option) => (
                    <option 
                      key={option} 
                      value={option}
                      disabled={option === 'Select an option'}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        {/* Additional Comments */}
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="additional_comments">Additional Comments (Optional)</label>
            <textarea
              id="additional_comments"
              name="additional_comments"
              value={formData.additional_comments}
              onChange={handleChange}
              placeholder="Any other thoughts or suggestions?"
              rows="4"
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
