import React from 'react';
import './App.css';
import AuthContainer from './components/AuthContainer';
import Quiz from './components/Quiz';
import PersonalityForm from './components/PersonalityForm';
import DataSeeder from './components/DataSeeder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Career Recommendation</h1>
        <p>
          Your journey to finding the perfect career path starts here!
        </p>
      </header>
      <main>
        <div className="auth-section">
          <AuthContainer />
        </div>
        <div className="personality-section">
          <PersonalityForm />
        </div>
        <div className="quiz-section">
          <Quiz />
        </div>
        <div className="firebase-container">
          <DataSeeder />
        </div>
      </main>
    </div>
  );
}

export default App;
