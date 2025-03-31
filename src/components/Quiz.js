import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch quiz questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'quiz_questions'));
        const questionsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setQuestions(questionsList);
        // Initialize userResponses with empty values
        const initialResponses = {};
        questionsList.forEach(question => {
          initialResponses[question.id] = '';
        });
        setUserResponses(initialResponses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz questions:', err);
        setError('Failed to load quiz questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle user selection
  const handleOptionSelect = (questionId, selectedOption) => {
    setUserResponses(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  // Calculate quiz results
  const calculateResults = () => {
    // This is a placeholder for result calculation logic
    // In a real app, you might want to analyze responses and provide a result
    return {
      message: 'Quiz completed! Thank you for your responses.'
    };
  };

  // Render loading state
  if (loading) {
    return <div className="quiz-container"><p>Loading quiz questions...</p></div>;
  }

  // Render error state
  if (error) {
    return <div className="quiz-container"><p className="error">{error}</p></div>;
  }

  // If no questions were found
  if (questions.length === 0) {
    return <div className="quiz-container"><p>No quiz questions found.</p></div>;
  }

  // Show results if quiz is completed
  if (quizCompleted) {
    const results = calculateResults();
    return (
      <div className="quiz-container">
        <h2>Quiz Results</h2>
        <p>{results.message}</p>
        <div className="response-summary">
          <h3>Your Responses:</h3>
          {questions.map(question => (
            <div key={question.id} className="response-item">
              <p><strong>Question:</strong> {question.text}</p>
              <p><strong>Your answer:</strong> {userResponses[question.id]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Career Assessment Quiz</h2>
      <div className="progress-indicator">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      
      <div className="question-container">
        <h3>{currentQuestion.text}</h3>
        <div className="options-container">
          {currentQuestion.options.map(option => (
            <div 
              key={option} 
              className={`option ${userResponses[currentQuestion.id] === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(currentQuestion.id, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button 
          onClick={handlePreviousQuestion} 
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNextQuestion} 
          disabled={!userResponses[currentQuestion.id]}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz; 