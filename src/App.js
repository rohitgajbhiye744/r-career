import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import DataSeeder from './components/DataSeeder';
import Auth from './components/Auth';
import AdminSetup from './components/AdminSetup';

function AppContent() {
  const [careerData, setCareerData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is admin
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAssessmentComplete = (results) => {
    console.log('Assessment completed:', results);
    setCareerData(results);
    navigate('/results');
  };

  const handleLogout = () => {
    getAuth().signOut();
  };

  // Protected Route component
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" />;
    if (adminOnly && !isAdmin) return <Navigate to="/" />;
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Career Recommendation System</h1>
        {user && (
          <div className="user-controls">
            <span className="user-email">{user.email}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/assessment" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Assessment
            </NavLink>
          )}
          {user && careerData && (
            <NavLink to="/results" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Results
            </NavLink>
          )}
          {user && isAdmin && (
            <NavLink to="/seed" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Seed Data
            </NavLink>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/auth" element={
          user ? <Navigate to="/" /> : <Auth onAuthStateChange={(isLoggedIn) => setUser(isLoggedIn)} />
        } />
        
        <Route path="/" element={
          <main>
            {user ? (
              <>
                <div className="welcome-message">
                  <h2>Welcome to Your Career Journey</h2>
                  <p>Discover your ideal career path through our comprehensive assessment that analyzes your personality traits, skills, and preferences.</p>
                  <div className="assessment-options">
                    <Link to="/assessment" className="assessment-button">Start Assessment</Link>
                  </div>
                </div>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <h3>Personality Analysis</h3>
                    <p>Our assessment considers your unique personality traits to match you with careers that align with your natural tendencies.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Career Matching</h3>
                    <p>Get personalized career recommendations based on your assessment results and explore alternative career paths.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Resource Library</h3>
                    <p>Access curated resources and guides to help you learn more about your recommended career paths.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="welcome-message">
                <h2>Discover Your Perfect Career Path</h2>
                <p>Take our scientifically designed assessment to uncover career opportunities that match your personality, skills, and aspirations. Join thousands of others who have found their ideal career path with our guidance.</p>
                <Link to="/auth" className="auth-button">Get Started</Link>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <h3>Smart Analysis</h3>
                    <p>Our advanced algorithm analyzes multiple factors to provide accurate career recommendations.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Personalized Results</h3>
                    <p>Receive tailored career suggestions based on your unique combination of traits and preferences.</p>
                  </div>
                  <div className="feature-card">
                    <h3>Expert Guidance</h3>
                    <p>Get access to professional resources and guidance to help you make informed career decisions.</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        } />

        <Route path="/assessment" element={
          <ProtectedRoute>
            <main>
              <Quiz onComplete={handleAssessmentComplete} />
            </main>
          </ProtectedRoute>
        } />

        <Route path="/results" element={
          <ProtectedRoute>
            <main>
              {careerData ? (
                <div className="results-section">
                  <h3>Your Career Recommendations</h3>
                  <Dashboard careerData={careerData} />
                </div>
              ) : (
                <div className="welcome-message">
                  <h2>Complete Your Assessment</h2>
                  <p>Please complete the assessment to view your career recommendations.</p>
                  <Link to="/assessment" className="assessment-button">Start Assessment</Link>
                </div>
              )}
            </main>
          </ProtectedRoute>
        } />

        <Route path="/seed" element={
          <ProtectedRoute adminOnly={true}>
            <main>
              <DataSeeder />
            </main>
          </ProtectedRoute>
        } />

        {/* Temporary admin setup route */}
        <Route path="/admin-setup" element={
          <ProtectedRoute>
            <main>
              <AdminSetup />
            </main>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
