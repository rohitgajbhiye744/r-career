import React, { useState } from 'react';
import './PersonalityForm.css';

const PersonalityForm = () => {
  // State for form inputs
  const [traits, setTraits] = useState({
    openness: 5,
    conscientiousness: 5,
    extraversion: 5,
    agreeableness: 5,
    neuroticism: 5
  });

  // State for API response and loading state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle slider changes
  const handleTraitChange = (e) => {
    const { name, value } = e.target;
    setTraits(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  // Send data to API and handle response
  const predictCareer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Convert traits object to array in the correct order
    const traitsArray = [
      traits.openness,
      traits.conscientiousness,
      traits.extraversion,
      traits.agreeableness,
      traits.neuroticism
    ];
    
    try {
      // Replace with your Render API URL after deployment
      const apiUrl = process.env.REACT_APP_API_URL || 
                    'https://career-prediction-api.onrender.com/predict';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personality_traits: traitsArray
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data);
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error predicting career:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render trait description based on value
  const getTraitDescription = (trait, value) => {
    const descriptions = {
      openness: {
        low: 'Practical, conventional, prefers routine',
        high: 'Curious, creative, open to new experiences'
      },
      conscientiousness: {
        low: 'Spontaneous, flexible, sometimes disorganized',
        high: 'Organized, responsible, self-disciplined'
      },
      extraversion: {
        low: 'Reserved, thoughtful, prefers solitude',
        high: 'Outgoing, energetic, seeks social stimulation'
      },
      agreeableness: {
        low: 'Analytical, questioning, competitive',
        high: 'Cooperative, compassionate, values harmony'
      },
      neuroticism: {
        low: 'Emotionally stable, calm under pressure',
        high: 'Sensitive, reactive to stress, experiences mood swings'
      }
    };
    
    return value > 5.5 ? descriptions[trait].high : descriptions[trait].low;
  };

  return (
    <div className="personality-form-container">
      <h2>Career Personality Assessment</h2>
      <p className="form-description">
        Rate yourself on each personality dimension to get career recommendations.
      </p>
      
      <form onSubmit={predictCareer} className="personality-form">
        {Object.entries(traits).map(([trait, value]) => (
          <div key={trait} className="trait-slider">
            <div className="trait-header">
              <label htmlFor={trait}>{trait.charAt(0).toUpperCase() + trait.slice(1)}</label>
              <span className="trait-value">{value}</span>
            </div>
            <input
              type="range"
              id={trait}
              name={trait}
              min="1"
              max="10"
              step="0.1"
              value={value}
              onChange={handleTraitChange}
            />
            <div className="trait-description">
              {getTraitDescription(trait, value)}
            </div>
          </div>
        ))}
        
        <button 
          type="submit" 
          className="predict-button"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Predict Career'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      
      {result && (
        <div className="results-container">
          <h3>Your Career Recommendation</h3>
          
          <div className="primary-result">
            <h4>{result.prediction}</h4>
          </div>
          
          <div className="other-matches">
            <h4>Other Potential Matches</h4>
            <ul>
              {result.top_careers.map((career, index) => (
                <li key={index}>
                  <span className="career-name">{career.career}</span>
                  <span className="career-probability">
                    {Math.round(career.probability * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="trait-analysis">
            <h4>Your Personality Profile</h4>
            <ul>
              {Object.entries(result.trait_levels).map(([trait, level]) => (
                <li key={trait}>
                  <span className="trait-name">
                    {trait.charAt(0).toUpperCase() + trait.slice(1)}:
                  </span>
                  <span className={`trait-level ${level}`}>
                    {level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityForm; 