import React, { useEffect, useState } from 'react';
import { seedQuizQuestions } from '../utils/seedQuizData';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DataSeeder = () => {
  const [status, setStatus] = useState('Initializing...');
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  const checkQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'quiz_questions'));
      const questionsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsList);
      setQuestionCount(questionsList.length);
      return questionsList;
    } catch (error) {
      console.error('Error checking questions:', error);
      return [];
    }
  };

  const clearQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'quiz_questions'));
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      setStatus('All questions cleared');
      await checkQuestions();
    } catch (error) {
      setStatus(`Error clearing questions: ${error.message}`);
    }
  };

  useEffect(() => {
    checkQuestions();
  }, []);

  return (
    <div className="seeder-container">
      <h2>Data Seeder</h2>
      <p>{status}</p>
      <p>Current number of questions in database: {questionCount}</p>
      
      <div className="button-group">
        <button 
          onClick={async () => {
            try {
              setStatus('Clearing existing questions...');
              await clearQuestions();
              setStatus('Seeding new questions...');
              await seedQuizQuestions();
              const updatedQuestions = await checkQuestions();
              setStatus(`Questions seeded successfully! Loaded ${updatedQuestions.length} questions.`);
              console.log('Seeded questions:', updatedQuestions);
            } catch (error) {
              setStatus(`Error: ${error.message}`);
            }
          }}
        >
          Clear & Seed Questions
        </button>
      </div>

      {questions.length > 0 && (
        <div className="questions-list">
          <h3>Current Questions in Database:</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={q.id}>
                {index + 1}. {q.text} (Category: {q.category})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataSeeder; 