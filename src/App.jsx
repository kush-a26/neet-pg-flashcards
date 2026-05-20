import { useState } from 'react';
import './App.css';
import LandingScreen from './components/LandingScreen';
import FlashcardSession from './components/FlashcardSession';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [screen, setScreen] = useState('landing'); // landing, session, feedback
  const [sessionData, setSessionData] = useState(null);

  const handleStartSession = () => {
    setScreen('session');
  };

  const handleSessionComplete = (data) => {
    setSessionData(data);
    setScreen('feedback');
  };

  const handleFeedbackComplete = () => {
    // Reset to landing
    setScreen('landing');
    setSessionData(null);
  };

  return (
    <div className="app-container">
      <div className="iphone-frame">
        <div className="iphone-notch"></div>
        <div className="iphone-screen">
          {screen === 'landing' && (
            <LandingScreen onStart={handleStartSession} />
          )}
          {screen === 'session' && (
            <FlashcardSession onComplete={handleSessionComplete} />
          )}
          {screen === 'feedback' && (
            <FeedbackForm 
              sessionData={sessionData}
              onComplete={handleFeedbackComplete}
            />
          )}
        </div>
        <div className="iphone-home-indicator"></div>
      </div>
    </div>
  );
}

export default App;
