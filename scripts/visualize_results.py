#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
This script visualizes the results from the trained RandomForestClassifier,
including career distribution and feature importance.
"""

import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

# Import functions from train_model.py
from train_model import generate_sample_data

def load_model(model_path='models/career_prediction_model.pkl'):
    """Load the trained model from disk."""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}. Please run train_model.py first.")
    
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    return model

def plot_career_distribution(data):
    """Plot the distribution of careers in the dataset."""
    plt.figure(figsize=(12, 6))
    career_counts = data['Career'].value_counts()
    
    career_counts.plot(kind='bar', color='skyblue')
    plt.title('Distribution of Careers in Dataset', fontsize=15)
    plt.xlabel('Career', fontsize=12)
    plt.ylabel('Count', fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    # Save the plot
    os.makedirs('plots', exist_ok=True)
    plt.savefig('plots/career_distribution.png')
    plt.close()
    
    print(f"Career distribution plot saved to plots/career_distribution.png")

def plot_feature_importance(model, feature_names):
    """Plot feature importance from the trained model."""
    # Get feature importance
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(10, 6))
    plt.bar(range(len(importances)), importances[indices], color='skyblue')
    plt.title('Feature Importance', fontsize=15)
    plt.xlabel('Feature', fontsize=12)
    plt.ylabel('Importance', fontsize=12)
    plt.xticks(range(len(importances)), [feature_names[i] for i in indices], rotation=45, ha='right')
    plt.tight_layout()
    
    # Save the plot
    os.makedirs('plots', exist_ok=True)
    plt.savefig('plots/feature_importance.png')
    plt.close()
    
    print(f"Feature importance plot saved to plots/feature_importance.png")

def plot_trait_correlations(data):
    """Plot correlations between personality traits."""
    traits = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']
    
    # Calculate correlation matrix
    corr = data[traits].corr()
    
    plt.figure(figsize=(10, 8))
    plt.imshow(corr, cmap='coolwarm', vmin=-1, vmax=1)
    
    # Add correlation values
    for i in range(len(traits)):
        for j in range(len(traits)):
            plt.text(j, i, f'{corr.iloc[i, j]:.2f}', 
                     ha='center', va='center', color='black')
    
    plt.colorbar()
    plt.title('Correlation Between Personality Traits', fontsize=15)
    plt.xticks(range(len(traits)), traits, rotation=45)
    plt.yticks(range(len(traits)), traits)
    plt.tight_layout()
    
    # Save the plot
    os.makedirs('plots', exist_ok=True)
    plt.savefig('plots/trait_correlations.png')
    plt.close()
    
    print(f"Trait correlations plot saved to plots/trait_correlations.png")

def plot_traits_by_career(data):
    """Plot average personality traits for each career."""
    # Group by career and calculate mean of traits
    career_traits = data.groupby('Career')[['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']].mean()
    
    plt.figure(figsize=(14, 8))
    career_traits.plot(kind='bar', figsize=(14, 8))
    plt.title('Average Personality Traits by Career', fontsize=15)
    plt.xlabel('Career', fontsize=12)
    plt.ylabel('Average Score (1-10)', fontsize=12)
    plt.legend(title='Personality Trait')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    # Save the plot
    os.makedirs('plots', exist_ok=True)
    plt.savefig('plots/traits_by_career.png')
    plt.close()
    
    print(f"Traits by career plot saved to plots/traits_by_career.png")

def plot_confusion_matrix(model, X_test, y_test):
    """Plot confusion matrix for the model predictions."""
    y_pred = model.predict(X_test)
    
    # Create and plot confusion matrix
    cm = confusion_matrix(y_test, y_pred, labels=model.classes_)
    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=model.classes_)
    
    plt.figure(figsize=(12, 10))
    disp.plot(cmap='Blues', xticks_rotation=45)
    plt.title('Confusion Matrix', fontsize=15)
    plt.tight_layout()
    
    # Save the plot
    os.makedirs('plots', exist_ok=True)
    plt.savefig('plots/confusion_matrix.png')
    plt.close()
    
    print(f"Confusion matrix plot saved to plots/confusion_matrix.png")

def main():
    print("Visualizing model results...")
    
    try:
        # Generate the same data used for training
        data = generate_sample_data()
        
        # Load the trained model
        model = load_model()
        
        # Create visualizations
        plot_career_distribution(data)
        plot_feature_importance(model, data.drop('Career', axis=1).columns)
        plot_trait_correlations(data)
        plot_traits_by_career(data)
        
        # Split for confusion matrix
        from sklearn.model_selection import train_test_split
        X = data.drop('Career', axis=1)
        y = data['Career']
        _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        plot_confusion_matrix(model, X_test, y_test)
        
        print("\nAll visualizations have been saved to the 'plots' directory.")
        
    except FileNotFoundError as e:
        print(e)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main() 