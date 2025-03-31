#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
This script loads the trained RandomForestClassifier model and makes career
predictions based on personality trait inputs.
"""

import pickle
import numpy as np
import pandas as pd
import os

def load_model(model_path='models/career_prediction_model.pkl'):
    """Load the trained model from disk."""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}. Please run train_model.py first.")
    
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    return model

def predict_career(openness, conscientiousness, extraversion, agreeableness, neuroticism):
    """
    Predict career based on personality traits.
    
    Parameters:
    -----------
    openness : float
        Openness to experience score (1-10)
    conscientiousness : float
        Conscientiousness score (1-10)
    extraversion : float
        Extraversion score (1-10)
    agreeableness : float
        Agreeableness score (1-10)
    neuroticism : float
        Neuroticism score (1-10)
        
    Returns:
    --------
    str
        Predicted career
    """
    # Load model
    model = load_model()
    
    # Create input data frame
    input_data = pd.DataFrame({
        'Openness': [openness],
        'Conscientiousness': [conscientiousness],
        'Extraversion': [extraversion],
        'Agreeableness': [agreeableness],
        'Neuroticism': [neuroticism]
    })
    
    # Make prediction
    prediction = model.predict(input_data)[0]
    
    # Get probability scores
    probabilities = model.predict_proba(input_data)[0]
    
    # Get top 3 career predictions with probabilities
    career_probs = list(zip(model.classes_, probabilities))
    top_careers = sorted(career_probs, key=lambda x: x[1], reverse=True)[:3]
    
    return prediction, top_careers

def main():
    print("Career Prediction Tool")
    print("=====================")
    print("Please rate your personality traits on a scale of 1-10:")
    
    try:
        openness = float(input("Openness to experience: "))
        conscientiousness = float(input("Conscientiousness: "))
        extraversion = float(input("Extraversion: "))
        agreeableness = float(input("Agreeableness: "))
        neuroticism = float(input("Neuroticism: "))
        
        # Validate input ranges
        traits = [openness, conscientiousness, extraversion, agreeableness, neuroticism]
        trait_names = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"]
        
        for trait, name in zip(traits, trait_names):
            if trait < 1 or trait > 10:
                print(f"Error: {name} must be between 1 and 10.")
                return
        
        # Make prediction
        prediction, top_careers = predict_career(openness, conscientiousness, extraversion, agreeableness, neuroticism)
        
        print("\nResults:")
        print(f"Best career match: {prediction}")
        
        print("\nTop 3 career matches:")
        for career, probability in top_careers:
            print(f"- {career}: {probability:.2f}")
        
        print("\nPersonality traits explanation:")
        explain_prediction(openness, conscientiousness, extraversion, agreeableness, neuroticism)
        
    except ValueError:
        print("Error: All inputs must be numerical values.")
    except FileNotFoundError as e:
        print(e)
    except Exception as e:
        print(f"An error occurred: {e}")

def explain_prediction(openness, conscientiousness, extraversion, agreeableness, neuroticism):
    """Provide a simple explanation of how personality traits relate to career prediction."""
    
    traits_explanation = {
        "Openness": {
            "high": "high openness indicates creativity and curiosity, suitable for research, arts, and innovation-focused roles.",
            "low": "lower openness often indicates preference for structure and routine, suitable for operational and practical roles."
        },
        "Conscientiousness": {
            "high": "high conscientiousness indicates organization and reliability, suitable for management, finance, and detail-oriented work.",
            "low": "lower conscientiousness may indicate flexibility and spontaneity, suitable for creative or adaptive roles."
        },
        "Extraversion": {
            "high": "high extraversion indicates sociability and assertiveness, suitable for sales, leadership, and public-facing roles.",
            "low": "lower extraversion (introversion) indicates thoughtfulness and independence, suitable for analytical, technical, or creative individual work."
        },
        "Agreeableness": {
            "high": "high agreeableness indicates cooperation and empathy, suitable for healthcare, education, and supportive roles.",
            "low": "lower agreeableness may indicate competitiveness and critical thinking, suitable for executive, legal, or analytical roles."
        },
        "Neuroticism": {
            "high": "higher neuroticism indicates sensitivity and awareness of risks, which can be valuable in certain analytical or artistic contexts.",
            "low": "lower neuroticism indicates emotional stability and stress tolerance, suitable for high-pressure environments like management or emergency services."
        }
    }
    
    trait_values = {
        "Openness": openness,
        "Conscientiousness": conscientiousness,
        "Extraversion": extraversion,
        "Agreeableness": agreeableness,
        "Neuroticism": neuroticism
    }
    
    for trait, value in trait_values.items():
        category = "high" if value > 5.5 else "low"
        print(f"- Your {trait} score ({value:.1f}) is {category}: {traits_explanation[trait][category]}")

if __name__ == "__main__":
    main()