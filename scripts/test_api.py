#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Test script for the Flask career prediction API.
This sends sample personality trait data to the API and prints the response.
"""

import requests
import json
import sys

def test_api(url='http://127.0.0.1:5000'):
    """Test the career prediction API with sample data."""
    
    # Test health endpoint
    try:
        health_response = requests.get(f"{url}/health")
        print(f"Health check status: {health_response.status_code}")
        print(json.dumps(health_response.json(), indent=2))
        print("\n" + "-"*50 + "\n")
    except requests.RequestException as e:
        print(f"Error checking health: {e}")
        print("Make sure the Flask server is running.")
        sys.exit(1)
    
    # Sample personality trait data
    test_cases = [
        {
            "name": "Research-oriented person",
            "traits": [8.5, 8.2, 4.5, 6.2, 5.0]  # High openness, high conscientiousness
        },
        {
            "name": "Sales-oriented person",
            "traits": [5.5, 5.0, 9.2, 8.5, 3.0]  # High extraversion, high agreeableness
        },
        {
            "name": "Creative marketer",
            "traits": [8.0, 5.5, 8.0, 6.5, 4.0]  # High openness, high extraversion
        },
        {
            "name": "Finance-oriented person",
            "traits": [5.0, 9.0, 5.5, 5.0, 3.0]  # High conscientiousness, low neuroticism
        }
    ]
    
    # Test predict endpoint with each test case
    for test_case in test_cases:
        print(f"Testing with profile: {test_case['name']}")
        print(f"Personality traits: {test_case['traits']}")
        
        try:
            # Prepare request data
            request_data = {
                "personality_traits": test_case['traits']
            }
            
            # Send POST request to /predict endpoint
            response = requests.post(
                f"{url}/predict",
                json=request_data,
                headers={"Content-Type": "application/json"}
            )
            
            # Check if request was successful
            if response.status_code == 200:
                result = response.json()
                print(f"Status: {result['status']}")
                print(f"Predicted Career: {result['prediction']}")
                
                print("\nTop Career Matches:")
                for career in result['top_careers']:
                    print(f"  - {career['career']}: {career['probability']:.2f}")
                
                print("\nTrait Levels:")
                for trait, level in result['trait_levels'].items():
                    print(f"  - {trait.capitalize()}: {level}")
            else:
                print(f"Error: {response.status_code}")
                print(response.text)
                
        except requests.RequestException as e:
            print(f"Request error: {e}")
            
        print("\n" + "-"*50 + "\n")

if __name__ == "__main__":
    # Allow specifying a different base URL as command line argument
    base_url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:5000'
    test_api(base_url) 