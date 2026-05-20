import './LandingScreen.css';

function LandingScreen({ onStart }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/9100/9100957.png" 
          alt="Flashcards" 
          className="app-icon"
        />
        <h1 className="app-title">Medical Flashcards</h1>
        <p className="app-subtitle">High-yield anatomy concepts for NEET PG</p>

        <div className="session-info">
          <div className="info-item">
            <div className="info-icon">📚</div>
            <div className="info-text">
              <div className="info-label">Cards</div>
              <div className="info-value">10 concepts</div>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">⏱️</div>
            <div className="info-text">
              <div className="info-label">Time</div>
              <div className="info-value">~5 minutes</div>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">🎯</div>
            <div className="info-text">
              <div className="info-label">Focus</div>
              <div className="info-value">Anatomy</div>
            </div>
          </div>
        </div>

        <button className="start-btn" onClick={onStart}>
          Start Review
        </button>

        <div className="note">
          Image-based active recall with clinical correlations
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;
