// Debug environment variables
console.log('DeepSeek API URL:', process.env.REACT_APP_DEEPSEEK_API_URL);
console.log('DeepSeek API Key available:', process.env.REACT_APP_DEEPSEEK_API_KEY ? 'Yes' : 'No');
console.log('DeepSeek API Key length:', process.env.REACT_APP_DEEPSEEK_API_KEY ? process.env.REACT_APP_DEEPSEEK_API_KEY.length : 0);
console.log('DeepSeek API Key first 10 chars:', process.env.REACT_APP_DEEPSEEK_API_KEY ? process.env.REACT_APP_DEEPSEEK_API_KEY.substring(0, 10) : 'none');

// For OpenRouter integration
// Full model reference: https://openrouter.ai/docs#models
export const DEEPSEEK_CONFIG = {
  API_URL: process.env.REACT_APP_DEEPSEEK_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
  API_KEY: process.env.REACT_APP_DEEPSEEK_API_KEY,
  MODEL: 'deepseek/deepseek-chat', // Model ID for OpenRouter format
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
  SYSTEM_PROMPT: `You are an expert career counselor with deep knowledge of various career paths, personality assessments, and job market trends. Your role is to analyze career assessment responses and provide personalized career recommendations.

When analyzing responses:
1. Consider both explicit answers and implicit patterns
2. Look for strong indicators of specific skills, interests, and personality traits
3. Match these indicators to suitable career paths
4. Provide clear explanations for your recommendations
5. Consider multiple career options that align with the candidate's profile

Your recommendations should be:
- Specific and actionable
- Based on the candidate's actual responses
- Include both primary and alternative career paths
- Accompanied by clear explanations of why each career is a good fit

Format your response as JSON with the following structure:
{
  "primaryCareer": "Career Name",
  "alternativeCareers": ["Career 1", "Career 2", "Career 3"],
  "explanations": {
    "primaryCareer": "Detailed explanation of why this career is the best fit",
    "alternativeCareers": {
      "Career 1": "Explanation for first alternative",
      "Career 2": "Explanation for second alternative",
      "Career 3": "Explanation for third alternative"
    }
  }
}`
}; 