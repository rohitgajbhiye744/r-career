#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Flask API server to serve the career prediction model.
This script loads the pre-trained RandomForestClassifier model and exposes
an endpoint for making predictions.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
# Configure CORS to allow requests from both production and development environments
CORS(app, origins=["https://r-career-fe999.web.app", "http://localhost:3000", "http://127.0.0.1:3000"])

# Traits expected by the model
EXPECTED_TRAITS = [
    'Openness', 
    'Conscientiousness', 
    'Extraversion', 
    'Agreeableness', 
    'Neuroticism'
]

# Load the model when the server starts
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models/career_prediction_model.pkl')

def load_model():
    """Load the pre-trained model from disk."""
    try:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. "
                                "Please run train_model.py first.")
        
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        # For production, we'll return None and handle this case
        return None

try:
    # Load model at startup
    model = load_model()
    print(f"Successfully loaded model from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/', methods=['GET'])
def home():
    """Root endpoint to verify the API is running."""
    return jsonify({
        'message': 'Career Prediction API is running',
        'endpoints': {
            'health': '/health (GET)',
            'predict': '/predict (POST)'
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running."""
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded properly'
        }), 500
    
    return jsonify({
        'status': 'healthy',
        'message': 'API is running and model is loaded'
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint for career prediction based on personality traits.
    
    Expected JSON request format:
    {
        "personality_traits": [
            <openness_score>,
            <conscientiousness_score>,
            <extraversion_score>,
            <agreeableness_score>,
            <neuroticism_score>
        ]
    }
    
    All scores should be floats between 1 and 10.
    """
    # Check if model is loaded
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded properly'
        }), 500
    
    # Get data from request
    data = request.get_json()
    
    # Validate input
    if not data or 'personality_traits' not in data:
        return jsonify({
            'status': 'error',
            'message': 'Request must include personality_traits array'
        }), 400
    
    traits = data['personality_traits']
    
    # Check if the right number of traits is provided
    if not isinstance(traits, list) or len(traits) != 5:
        return jsonify({
            'status': 'error',
            'message': f'personality_traits must be an array with 5 values (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)'
        }), 400
    
    # Validate trait values
    try:
        traits = [float(trait) for trait in traits]
        for i, trait in enumerate(traits):
            if trait < 1 or trait > 10:
                return jsonify({
                    'status': 'error',
                    'message': f'{EXPECTED_TRAITS[i]} score must be between 1 and 10'
                }), 400
    except ValueError:
        return jsonify({
            'status': 'error',
            'message': 'All personality trait scores must be numbers'
        }), 400
    
    # Create input DataFrame for prediction
    input_data = pd.DataFrame({
        'Openness': [traits[0]],
        'Conscientiousness': [traits[1]],
        'Extraversion': [traits[2]],
        'Agreeableness': [traits[3]],
        'Neuroticism': [traits[4]]
    })
    
    # Make prediction
    prediction = model.predict(input_data)[0]
    
    # Get probability scores
    probabilities = model.predict_proba(input_data)[0]
    
    # Get top 3 career predictions with probabilities
    career_probs = list(zip(model.classes_, probabilities))
    top_careers = sorted(career_probs, key=lambda x: x[1], reverse=True)[:3]
    
    top_careers_formatted = []
    for career, prob in top_careers:
        top_careers_formatted.append({
            'career': career,
            'probability': float(prob)
        })
    
    # Get trait levels (high/low) for explanations
    trait_levels = {}
    for i, trait_name in enumerate(EXPECTED_TRAITS):
        trait_level = "high" if traits[i] > 5.5 else "low"
        trait_levels[trait_name.lower()] = trait_level
    
    # Return prediction results
    return jsonify({
        'status': 'success',
        'prediction': prediction,
        'top_careers': top_careers_formatted,
        'trait_levels': trait_levels
    })

if __name__ == '__main__':
    # Run the Flask app
    # In production, you would use a proper WSGI server instead of the built-in dev server
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True) 