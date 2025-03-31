#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
This script ensures that a trained model exists for deployment.
If no model exists, it will run the training script to create one.
"""

import os
import sys
from pathlib import Path

def ensure_model_exists():
    # Get the directory of this script
    script_dir = Path(__file__).parent.absolute()
    
    # Path to the model file
    model_path = script_dir / 'models' / 'career_prediction_model.pkl'
    
    # Create models directory if it doesn't exist
    os.makedirs(script_dir / 'models', exist_ok=True)
    
    # Check if model exists
    if not model_path.exists():
        print("Model not found. Training a new model...")
        
        # Import train_model and run it
        try:
            sys.path.append(str(script_dir))
            from train_model import main as train_model_main
            train_model_main()
            print("Model trained successfully.")
        except Exception as e:
            print(f"Error training model: {e}")
            sys.exit(1)
    else:
        print(f"Model found at {model_path}")

if __name__ == "__main__":
    ensure_model_exists() 