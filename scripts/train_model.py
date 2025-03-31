#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
This script trains a RandomForestClassifier on personality traits data 
to predict career recommendations.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import pickle
import os

# Create directory for model if it doesn't exist
os.makedirs('models', exist_ok=True)

# Generate sample data - in a real scenario, you would load your data
def generate_sample_data(n_samples=1000):
    """Generate synthetic data for personality traits and careers."""
    np.random.seed(42)
    
    # Personality traits (Big Five)
    openness = np.random.uniform(1, 10, n_samples)
    conscientiousness = np.random.uniform(1, 10, n_samples)
    extraversion = np.random.uniform(1, 10, n_samples)
    agreeableness = np.random.uniform(1, 10, n_samples)
    neuroticism = np.random.uniform(1, 10, n_samples)
    
    # Define careers based on personality traits
    careers = []
    for i in range(n_samples):
        if openness[i] > 7 and conscientiousness[i] > 7:
            careers.append('Research Scientist')
        elif openness[i] > 7 and extraversion[i] > 7:
            careers.append('Marketing Creative')
        elif conscientiousness[i] > 7 and agreeableness[i] > 7:
            careers.append('Healthcare Professional')
        elif extraversion[i] > 7 and agreeableness[i] > 7:
            careers.append('Sales Representative')
        elif conscientiousness[i] > 7 and neuroticism[i] < 4:
            careers.append('Financial Analyst')
        elif openness[i] > 7 and neuroticism[i] < 4:
            careers.append('Software Developer')
        elif extraversion[i] > 7 and neuroticism[i] < 4:
            careers.append('Entrepreneur')
        else:
            # Assign randomly for other combinations
            career_options = ['Project Manager', 'Teacher', 'HR Professional', 'Designer']
            careers.append(np.random.choice(career_options))
    
    # Create DataFrame
    data = pd.DataFrame({
        'Openness': openness,
        'Conscientiousness': conscientiousness,
        'Extraversion': extraversion,
        'Agreeableness': agreeableness,
        'Neuroticism': neuroticism,
        'Career': careers
    })
    
    return data

def main():
    print("Generating sample personality traits data...")
    data = generate_sample_data()
    
    print("\nData overview:")
    print(f"Shape: {data.shape}")
    print("\nSample data:")
    print(data.head())
    
    print("\nCareer distribution:")
    print(data['Career'].value_counts())
    
    # Split features and target
    X = data.drop('Career', axis=1)
    y = data['Career']
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"\nTraining set size: {X_train.shape}")
    print(f"Testing set size: {X_test.shape}")
    
    # Train Random Forest Classifier
    print("\nTraining Random Forest Classifier...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Evaluate model
    print("\nEvaluating model...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Print feature importance
    feature_importance = pd.DataFrame({
        'Feature': X.columns,
        'Importance': model.feature_importances_
    }).sort_values('Importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    # Save model
    model_path = 'models/career_prediction_model.pkl'
    print(f"\nSaving model to {model_path}...")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    
    print("\nModel training and saving completed!")

if __name__ == "__main__":
    main() 