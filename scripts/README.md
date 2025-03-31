# Career Prediction with Machine Learning

This folder contains Python scripts for training and using a machine learning model to predict career recommendations based on personality traits.

## Overview

The scripts use the Big Five personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) to predict suitable career paths. The model is trained using a Random Forest Classifier from scikit-learn.

## Files

- `train_model.py`: Generates sample data and trains the RandomForestClassifier
- `predict_career.py`: Takes user input for personality traits and makes career predictions
- `visualize_results.py`: Creates visualizations of model results and feature importance
- `flask_server.py`: Runs a Flask API server to serve the model via HTTP endpoints
- `test_api.py`: Tests the Flask API with sample personality trait data
- `requirements.txt`: Lists required Python packages

## Requirements

- Python 3.6+
- Packages listed in requirements.txt

## Setup

1. Install required packages:

```bash
pip install -r requirements.txt
```

2. Train the model:

```bash
python train_model.py
```

This will:
- Generate synthetic data for training
- Train a RandomForestClassifier model
- Save the model to `models/career_prediction_model.pkl`
- Print evaluation metrics and feature importance

3. Make predictions (command line):

```bash
python predict_career.py
```

This will:
- Prompt you to input your personality trait scores (1-10)
- Load the trained model
- Predict the most suitable career options
- Provide an explanation of how your traits influenced the prediction

4. Visualize results:

```bash
python visualize_results.py
```

This will generate visualizations including:
- Career distribution in the dataset
- Feature importance
- Trait correlations
- Average personality traits by career
- Confusion matrix

## Running the API Server

The Flask API server provides HTTP endpoints for making predictions:

1. Start the server:

```bash
python flask_server.py
```

This will start a server at http://localhost:5000 with the following endpoints:

- `GET /health`: Health check endpoint
- `POST /predict`: Endpoint for making career predictions

2. Example API request:

```json
POST /predict
Content-Type: application/json

{
  "personality_traits": [7.5, 8.0, 6.2, 7.0, 4.5]
}
```

Where the array values correspond to:
1. Openness
2. Conscientiousness 
3. Extraversion
4. Agreeableness
5. Neuroticism

3. Example API response:

```json
{
  "status": "success",
  "prediction": "Research Scientist",
  "top_careers": [
    {
      "career": "Research Scientist",
      "probability": 0.75
    },
    {
      "career": "Software Developer",
      "probability": 0.15
    },
    {
      "career": "Healthcare Professional",
      "probability": 0.10
    }
  ],
  "trait_levels": {
    "openness": "high",
    "conscientiousness": "high",
    "extraversion": "high",
    "agreeableness": "high",
    "neuroticism": "low"
  }
}
```

4. Test the API:

```bash
python test_api.py
```

This will send sample trait data to the API and display the results.

## Personality Traits Explained

The Big Five personality traits used in this model:

1. **Openness to Experience**: Appreciation for art, emotion, adventure, unusual ideas, and variety of experience.
   
2. **Conscientiousness**: Tendency to show self-discipline, act dutifully, and aim for achievement.
   
3. **Extraversion**: Energy, positive emotions, sociability, and tendency to seek stimulation in the company of others.
   
4. **Agreeableness**: Tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others.
   
5. **Neuroticism**: Tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability.

## Integration with React Frontend

To integrate this model with the React application:

1. Start the Flask API server:
   ```bash
   python flask_server.py
   ```

2. Make API calls from your React frontend:
   ```javascript
   // Example React code to call the API
   const predictCareer = async (personalityTraits) => {
     try {
       const response = await fetch('http://localhost:5000/predict', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           personality_traits: personalityTraits
         }),
       });
       
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Error predicting career:', error);
       throw error;
     }
   };
   ```

3. Display the results in your React UI 