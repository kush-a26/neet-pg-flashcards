import { useState, useEffect } from 'react';
import './FlashcardSession.css';
import { flashcards } from '../data/flashcards';

function FlashcardSession({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [responses, setResponses] = useState({});
  const [startTime] = useState(Date.now());
  const [stats, setStats] = useState({ no: 0, notSure: 0, yes: 0 });

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (response) => {
    const newResponses = {
      ...responses,
      [currentCard.id]: response
    };
    setResponses(newResponses);

    // Update stats
    const newStats = { no: 0, notSure: 0, yes: 0 };
    Object.values(newResponses).forEach(r => {
      newStats[r]++;
    });
    setStats(newStats);

    // Move to next card or complete
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Session complete
      const duration = Math.floor((Date.now() - startTime) / 1000);
      onComplete({
        duration,
        cardsCompleted: flashcards.length,
        responses: newResponses,
        stats: newStats
      });
    }
  };

  const getProgressColor = () => {
    const total = stats.no + stats.notSure + stats.yes;
    if (total === 0) return '#E5E7EB';
    
    const noPercent = (stats.no / total) * 100;
    const notSurePercent = (stats.notSure / total) * 100;
    
    return `linear-gradient(to right, 
      #FF6B6B 0%, 
      #FF6B6B ${noPercent}%, 
      #FFD93D ${noPercent}%, 
      #FFD93D ${noPercent + notSurePercent}%, 
      #6BCF7F ${noPercent + notSurePercent}%, 
      #6BCF7F 100%)`;
  };

  return (
    <div className="session-container">
      {/* Header */}
      <div className="session-header">
        <div className="card-counter">{currentIndex + 1} / {flashcards.length}</div>
        <button className="close-btn" onClick={() => onComplete(null)}>×</button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${progress}%`,
            background: getProgressColor()
          }}
        />
      </div>

      {/* Card Container */}
      <div className="flashcard-container">
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-content">
            <div className="card-meta">
              {currentCard.subject} • {currentCard.topic}
            </div>

            {!isFlipped ? (
              <>
                <div className="question-text">{currentCard.question}</div>
                {currentCard.questionImage && (
                  <img 
                    src={currentCard.questionImage} 
                    alt="Question" 
                    className="card-image"
                  />
                )}
                <button className="flip-button" onClick={handleFlip}>
                  Show Answer
                </button>
              </>
            ) : (
              <>
                <div className="answer-label">Answer</div>
                <div className="answer-text">{currentCard.answer}</div>
                {currentCard.answerImage && (
                  <img 
                    src={currentCard.answerImage} 
                    alt="Answer" 
                    className="card-image"
                  />
                )}
                {currentCard.clinical && (
                  <div className="clinical-note">
                    <div className="clinical-label">Clinical Note</div>
                    <div className="clinical-text">{currentCard.clinical}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Response Buttons (only show when flipped) */}
        {isFlipped && (
          <div className="response-section">
            <div className="response-prompt">Did you get it right?</div>
            <div className="response-buttons">
              <button 
                className="response-btn no"
                onClick={() => handleResponse('no')}
              >
                No
              </button>
              <button 
                className="response-btn not-sure"
                onClick={() => handleResponse('notSure')}
              >
                Not Sure
              </button>
              <button 
                className="response-btn yes"
                onClick={() => handleResponse('yes')}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardSession;
