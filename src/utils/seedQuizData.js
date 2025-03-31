/**
 * Utility script to seed the Firestore database with sample quiz questions.
 * 
 * To use: 
 * 1. Import this function where needed (e.g., a setup component or admin page)
 * 2. Run the function once to add sample data
 */

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// Sample quiz questions
const sampleQuizQuestions = [
  {
    text: "Which of these work environments do you prefer?",
    options: [
      "Corporate office setting",
      "Remote work from home",
      "Outdoor field work",
      "Creative studio space"
    ]
  },
  {
    text: "What type of task energizes you the most?",
    options: [
      "Solving complex problems",
      "Creating something artistic",
      "Helping and teaching others",
      "Organizing and managing details"
    ]
  },
  {
    text: "How do you prefer to work?",
    options: [
      "Independently with autonomy",
      "In a collaborative team",
      "Leading a group of people",
      "Following structured procedures"
    ]
  },
  {
    text: "Which skill are you most interested in developing?",
    options: [
      "Technical or analytical skills",
      "Creative or design skills",
      "Communication or people skills",
      "Organization or management skills"
    ]
  },
  {
    text: "What motivates you most in your career?",
    options: [
      "Financial compensation",
      "Making a positive impact",
      "Learning and personal growth",
      "Recognition and advancement"
    ]
  }
];

/**
 * Seeds the database with sample quiz questions.
 * Only adds questions if they don't already exist.
 */
export const seedQuizQuestions = async () => {
  try {
    // Check if questions already exist
    const querySnapshot = await getDocs(collection(db, 'quiz_questions'));
    
    // If there are already questions, don't add more
    if (!querySnapshot.empty) {
      console.log('Quiz questions already exist in the database.');
      return;
    }
    
    // Add each question
    for (const question of sampleQuizQuestions) {
      await addDoc(collection(db, 'quiz_questions'), question);
    }
    
    console.log('Successfully added sample quiz questions to Firestore!');
  } catch (error) {
    console.error('Error seeding quiz questions:', error);
  }
};

export default seedQuizQuestions; 