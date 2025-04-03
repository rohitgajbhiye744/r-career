import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Career resources mapping
const careerResources = {
  'Software Developer': [
    { 
      title: 'Full Stack Web Development', 
      provider: 'Coursera', 
      type: 'Course',
      url: 'https://www.coursera.org/specializations/full-stack-web-development'
    },
    { 
      title: 'Computer Science Career Path', 
      provider: 'Codecademy', 
      type: 'Path',
      url: 'https://www.codecademy.com/learn/paths/computer-science'
    },
    { 
      title: 'GitHub', 
      provider: 'Project Hosting', 
      type: 'Tool',
      url: 'https://github.com'
    }
  ],
  'Data Scientist': [
    { 
      title: 'Data Science Specialization', 
      provider: 'Johns Hopkins University', 
      type: 'Course',
      url: 'https://www.coursera.org/specializations/jhu-data-science'
    },
    { 
      title: 'Kaggle', 
      provider: 'Data Science Community', 
      type: 'Platform',
      url: 'https://www.kaggle.com'
    },
    { 
      title: 'Python for Data Science', 
      provider: 'DataCamp', 
      type: 'Course',
      url: 'https://www.datacamp.com/tracks/data-scientist-with-python'
    }
  ],
  'UX Designer': [
    { 
      title: 'Google UX Design Certificate', 
      provider: 'Google', 
      type: 'Certificate',
      url: 'https://www.coursera.org/professional-certificates/google-ux-design'
    },
    { 
      title: 'Dribbble', 
      provider: 'Design Portfolio', 
      type: 'Platform',
      url: 'https://dribbble.com'
    },
    { 
      title: 'Figma', 
      provider: 'Design Tool', 
      type: 'Tool',
      url: 'https://www.figma.com'
    }
  ],
  'Physician': [
    { 
      title: 'Pre-Med Courses', 
      provider: 'Khan Academy', 
      type: 'Course',
      url: 'https://www.khanacademy.org/science'
    },
    { 
      title: 'Association of American Medical Colleges', 
      provider: 'AAMC', 
      type: 'Organization',
      url: 'https://www.aamc.org'
    },
    { 
      title: 'Medical Ethics', 
      provider: 'edX', 
      type: 'Course',
      url: 'https://www.edx.org/learn/medical-ethics'
    }
  ],
  'Teacher': [
    { 
      title: 'Teaching Certificate Programs', 
      provider: 'Teach.org', 
      type: 'Program',
      url: 'https://www.teach.org/becoming-teacher/teaching-certification'
    },
    { 
      title: 'Educational Psychology', 
      provider: 'Coursera', 
      type: 'Course',
      url: 'https://www.coursera.org/learn/educational-psychology'
    },
    { 
      title: 'Teachers Pay Teachers', 
      provider: 'Resource Marketplace', 
      type: 'Platform',
      url: 'https://www.teacherspayteachers.com'
    }
  ],
  'Marketing Specialist': [
    { 
      title: 'Digital Marketing Certificate', 
      provider: 'Google', 
      type: 'Certificate',
      url: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing'
    },
    { 
      title: 'HubSpot Academy', 
      provider: 'HubSpot', 
      type: 'Training',
      url: 'https://academy.hubspot.com'
    },
    { 
      title: 'SEMrush Academy', 
      provider: 'SEMrush', 
      type: 'Course',
      url: 'https://www.semrush.com/academy/'
    }
  ],
  'Entrepreneur': [
    { 
      title: 'MBA Entrepreneurship Specialization', 
      provider: 'Wharton School', 
      type: 'Course',
      url: 'https://www.coursera.org/specializations/wharton-entrepreneurship'
    },
    { 
      title: 'Y Combinator Startup School', 
      provider: 'Y Combinator', 
      type: 'Program',
      url: 'https://www.startupschool.org/'
    },
    { 
      title: 'Lean Startup Methodology', 
      provider: 'Eric Ries', 
      type: 'Resources',
      url: 'http://theleanstartup.com/'
    }
  ],
  'Business Development Manager': [
    { 
      title: 'Business Development Fundamentals', 
      provider: 'LinkedIn Learning', 
      type: 'Course',
      url: 'https://www.linkedin.com/learning/business-development-foundations'
    },
    { 
      title: 'Strategic Partnerships', 
      provider: 'Harvard Business School', 
      type: 'Course',
      url: 'https://online.hbs.edu/courses/'
    },
    { 
      title: 'Lead Generation Techniques', 
      provider: 'HubSpot Academy', 
      type: 'Certificate',
      url: 'https://academy.hubspot.com/courses/lead-generation'
    }
  ],
  'Sales Director': [
    { 
      title: 'Sales Leadership', 
      provider: 'Northwestern Kellogg', 
      type: 'Course',
      url: 'https://www.coursera.org/learn/sales-leadership'
    },
    { 
      title: 'Strategic Sales Management', 
      provider: 'LinkedIn Learning', 
      type: 'Course',
      url: 'https://www.linkedin.com/learning/sales-management-fundamentals'
    },
    { 
      title: 'Sales Force Management', 
      provider: 'Salesforce', 
      type: 'Platform',
      url: 'https://trailhead.salesforce.com/'
    }
  ],
  'Marketing Manager': [
    { 
      title: 'Digital Marketing Specialization', 
      provider: 'University of Illinois', 
      type: 'Course',
      url: 'https://www.coursera.org/specializations/digital-marketing'
    },
    { 
      title: 'Marketing Analytics', 
      provider: 'Google Analytics Academy', 
      type: 'Certificate',
      url: 'https://analytics.google.com/analytics/academy/'
    },
    { 
      title: 'Content Marketing', 
      provider: 'HubSpot Academy', 
      type: 'Certificate',
      url: 'https://academy.hubspot.com/courses/content-marketing'
    }
  ],
  // Default resources if career not found
  'default': [
    { 
      title: 'LinkedIn Learning', 
      provider: 'LinkedIn', 
      type: 'Platform',
      url: 'https://www.linkedin.com/learning'
    },
    { 
      title: 'Career Development', 
      provider: 'Coursera', 
      type: 'Course',
      url: 'https://www.coursera.org/browse/business/career-development'
    },
    { 
      title: 'Indeed Job Search', 
      provider: 'Indeed', 
      type: 'Tool',
      url: 'https://www.indeed.com'
    }
  ]
};

const Dashboard = ({ careerData }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get resources based on predicted career
    const fetchResources = async () => {
      if (!careerData) return;
      
      // Wait for 1 second to simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get resources based on predicted career
      const career = careerData.prediction || '';
      const careerSpecificResources = careerResources[career] || careerResources.default;
      
      setResources(careerSpecificResources);
      setLoading(false);
    };

    fetchResources();
  }, [careerData]);

  if (!careerData) {
    return (
      <div className="dashboard-placeholder">
        <h2>No data available</h2>
        <p>Complete the personality assessment to see your career recommendations</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your personalized resources...</p>
      </div>
    );
  }

  // Helper function to get a description for a personality trait
  const getTraitDescription = (trait, level) => {
    const descriptions = {
      'Openness': {
        high: 'You are curious, creative, and open to new experiences. You appreciate art, adventure, and innovative ideas.',
        low: 'You prefer routine, practical matters, and traditional approaches. You may be more conventional in your outlook.'
      },
      'Conscientiousness': {
        high: 'You are organized, reliable, and focused on achieving your goals. You plan ahead and pay attention to details.',
        low: 'You are more flexible, spontaneous, and relaxed about deadlines and organization.'
      },
      'Extraversion': {
        high: 'You are energized by social interaction and tend to be outgoing, talkative, and assertive in group settings.',
        low: 'You prefer solitary activities and quieter environments. You may be more reflective and reserved.'
      },
      'Agreeableness': {
        high: 'You are cooperative, compassionate, and value harmony. You care about others and try to avoid conflict.',
        low: 'You tend to be more analytical, competitive, and willing to challenge others\' views when necessary.'
      },
      'Neuroticism': {
        high: 'You may experience emotions more intensely and be more sensitive to stress or negative feedback.',
        low: 'You are emotionally stable, calm under pressure, and less affected by stressful situations.'
      }
    };

    return descriptions[trait][level] || '';
  };

  // Determine trait levels based on the numerical values
  const getTraitLevels = () => {
    if (!careerData.trait_levels) return {};
    
    const traitLevels = {};
    Object.entries(careerData.trait_levels).forEach(([trait, level]) => {
      const formattedTrait = trait.charAt(0).toUpperCase() + trait.slice(1);
      traitLevels[formattedTrait] = level === 'high' ? 'high' : 'low';
    });
    
    return traitLevels;
  };

  const traitLevels = getTraitLevels();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Career Dashboard</h2>
        <div className="user-welcome">Based on your personality profile</div>
      </div>

      <section className="career-recommendation">
        <h3>Career Recommendation</h3>
        <div className="career-card">
          <h4>{careerData.prediction}</h4>
          {careerData.explanations && careerData.explanations.primaryCareer && (
            <p className="career-explanation">{careerData.explanations.primaryCareer}</p>
          )}
          
          {careerData.alternativeCareers && careerData.alternativeCareers.length > 0 && (
            <div className="alternative-careers">
              <h5>Alternative Career Paths</h5>
              <ul>
                {careerData.alternativeCareers.map((career, index) => (
                  <li key={index}>
                    <strong>{career}</strong>
                    {careerData.explanations && careerData.explanations.alternativeCareers && careerData.explanations.alternativeCareers[career] && (
                      <p className="career-explanation">{careerData.explanations.alternativeCareers[career]}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {careerData.confidence && (
            <div className="confidence-score">
              <p>Confidence: <strong>{Math.round(careerData.confidence * 100)}%</strong></p>
            </div>
          )}
          
          {careerData.note && (
            <div className="result-note">
              <p><em>{careerData.note}</em></p>
            </div>
          )}
        </div>
      </section>

      <section className="resources-section">
        <h3>Recommended Resources</h3>
        <div className="resources-grid">
          {resources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resource-card"
            >
              <div className="resource-icon">
                {resource.type === 'Course' ? '📚' : 
                 resource.type === 'Tool' ? '🛠️' : 
                 resource.type === 'Platform' ? '🌐' : 
                 resource.type === 'Certificate' ? '🏆' : 
                 resource.type === 'Organization' ? '🏢' : '📋'}
              </div>
              <div className="resource-details">
                <h4>{resource.title}</h4>
                <p className="provider">By {resource.provider}</p>
                <p className="resource-type">{resource.type}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="personality-insights">
        <h3>Personality Insights</h3>
        <div className="traits-grid">
          {Object.entries(traitLevels).map(([trait, level]) => (
            <div key={trait} className={`trait-card ${level}`}>
              <h4>{trait}</h4>
              <div className="trait-level">{level.toUpperCase()}</div>
              <p className="trait-desc">
                {getTraitDescription(trait, level)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="action-section">
        <h3>Next Steps</h3>
        <div className="action-cards">
          <div className="action-card">
            <div className="action-icon">🎯</div>
            <h4>Research</h4>
            <p>Explore job descriptions, required skills, and career paths in your recommended field.</p>
          </div>
          <div className="action-card">
            <div className="action-icon">🧩</div>
            <h4>Skill Building</h4>
            <p>Identify and develop key skills needed for your career through courses and projects.</p>
          </div>
          <div className="action-card">
            <div className="action-icon">👥</div>
            <h4>Networking</h4>
            <p>Connect with professionals in your field through LinkedIn and industry events.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 