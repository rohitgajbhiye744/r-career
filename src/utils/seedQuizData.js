/**
 * Utility script to seed the Firestore database with sample quiz questions.
 * 
 * To use: 
 * 1. Import this function where needed (e.g., a setup component or admin page)
 * 2. Run the function once to add sample data
 */

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// Comprehensive quiz questions covering all career assessment aspects
const sampleQuizQuestions = [
  // Self-Awareness and Personality
  {
    text: "Which statement best describes your core values?",
    options: [
      "Making a positive impact on society and helping others",
      "Innovation and pushing boundaries of what's possible",
      "Creating beauty and expressing creativity",
      "Building success and achieving recognition"
    ],
    category: "self_awareness",
    trait: "empathy"
  },
  {
    text: "How do you typically recharge after a long day?",
    options: [
      "Spending time with friends and socializing",
      "Engaging in solitary activities like reading or meditation",
      "Being creative through art, music, or writing",
      "Planning and organizing future activities"
    ],
    category: "personality",
    trait: "extraversion"
  },
  // Academic Preferences
  {
    text: "Which subjects did you find most engaging in school?",
    options: [
      "STEM subjects (Science, Technology, Engineering, Mathematics)",
      "Arts and Humanities (Literature, History, Languages)",
      "Social Sciences (Psychology, Sociology, Economics)",
      "Business and Commerce related subjects"
    ],
    category: "academic_preferences",
    trait: "analytical"
  },
  {
    text: "How do you prefer to learn new concepts?",
    options: [
      "Through practical experiments and hands-on experience",
      "Through reading and theoretical understanding",
      "Through group discussions and collaborative learning",
      "Through visual aids and creative presentations"
    ],
    category: "learning_style",
    trait: "creative"
  },
  // Extracurricular Activities
  {
    text: "What types of extracurricular activities interest you most?",
    options: [
      "Leadership roles and organizing events",
      "Technical clubs and competitions",
      "Arts, music, or performance groups",
      "Sports and physical activities"
    ],
    category: "extracurricular",
    trait: "leadership"
  },
  // Skills and Competencies
  {
    text: "Which skills would you most like to develop further?",
    options: [
      "Technical and analytical skills",
      "Creative and artistic abilities",
      "Leadership and management skills",
      "Communication and interpersonal skills"
    ],
    category: "current_skills",
    trait: "analytical"
  },
  // Work Environment
  {
    text: "What type of work environment energizes you?",
    options: [
      "Dynamic and fast-paced environment",
      "Structured and organized setting",
      "Creative and flexible workspace",
      "Collaborative and social atmosphere"
    ],
    category: "work_environment",
    trait: "adaptability"
  },
  // Team Dynamics
  {
    text: "How do you prefer to work on projects?",
    options: [
      "Independently with full autonomy",
      "In a small, close-knit team",
      "Leading a group of people",
      "As part of a large, diverse team"
    ],
    category: "team_dynamics",
    trait: "leadership"
  },
  // Problem-Solving
  {
    text: "When faced with a challenge, what's your typical approach?",
    options: [
      "Analyze data and look for patterns",
      "Brainstorm creative solutions",
      "Consult with others and gather opinions",
      "Break it down into smaller, manageable tasks"
    ],
    category: "problem_solving",
    trait: "analytical"
  },
  // Career Aspirations
  {
    text: "What impact do you want to have through your career?",
    options: [
      "Drive technological innovation and progress",
      "Inspire and help others reach their potential",
      "Create meaningful artistic or cultural contributions",
      "Build successful businesses and create jobs"
    ],
    category: "career_impact",
    trait: "innovative"
  },
  // Industry Interests
  {
    text: "Which industry sectors interest you most?",
    options: [
      "Technology and Digital Innovation",
      "Healthcare and Wellness",
      "Arts, Media, and Entertainment",
      "Business and Finance"
    ],
    category: "industry_interest",
    trait: "strategic"
  },
  // Learning and Adaptability
  {
    text: "How do you handle change and new situations?",
    options: [
      "Embrace change and seek new experiences",
      "Carefully analyze before adapting",
      "Go with the flow and adjust naturally",
      "Prepare and plan for different scenarios"
    ],
    category: "adaptability",
    trait: "adaptability"
  },
  // Risk Tolerance
  {
    text: "What's your approach to career decisions?",
    options: [
      "Willing to take calculated risks for potential high rewards",
      "Prefer stable, predictable career progression",
      "Balance between stability and new opportunities",
      "Ready to pursue entrepreneurial ventures"
    ],
    category: "risk_tolerance",
    trait: "leadership"
  },
  // Long-term Goals
  {
    text: "Where do you see yourself in 10 years?",
    options: [
      "Leading innovation in your field",
      "Making a significant social impact",
      "Achieving creative or artistic recognition",
      "Running a successful business enterprise"
    ],
    category: "long_term_goals",
    trait: "strategic"
  },
  // Work-Life Integration
  {
    text: "What's your ideal work-life arrangement?",
    options: [
      "Flexible schedule with remote work options",
      "Traditional office hours with clear boundaries",
      "Project-based work with varying schedules",
      "Entrepreneurial lifestyle with integrated work-life"
    ],
    category: "work_life_balance",
    trait: "adaptability"
  }
];

/**
 * Seeds the database with sample quiz questions.
 * Only adds questions if they don't already exist.
 */
export const seedQuizQuestions = async () => {
  try {
    // Get reference to quiz_questions collection
    const quizCollection = collection(db, 'quiz_questions');
    
    // Add each question
    const addPromises = sampleQuizQuestions.map(question => 
      addDoc(quizCollection, question)
    );
    
    await Promise.all(addPromises);
    console.log('Successfully added sample quiz questions to Firestore!');
  } catch (error) {
    console.error('Error seeding quiz questions:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default seedQuizQuestions; 