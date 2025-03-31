import React, { useState } from 'react';
import seedQuizQuestions from '../utils/seedQuizData';

const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedQuizData = async () => {
    setIsSeeding(true);
    setMessage('Seeding quiz data...');
    
    try {
      await seedQuizQuestions();
      setMessage('Quiz questions successfully seeded!');
    } catch (error) {
      console.error('Error in seeding data:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="data-seeder">
      <h3>Admin Tools</h3>
      <button 
        onClick={handleSeedQuizData} 
        disabled={isSeeding}
      >
        {isSeeding ? 'Seeding...' : 'Seed Quiz Questions'}
      </button>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      <p className="note">
        Note: This will only add quiz questions if none exist in the database.
      </p>
    </div>
  );
};

export default DataSeeder; 