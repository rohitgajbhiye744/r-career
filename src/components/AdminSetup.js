import React, { useState } from 'react';
import { setCurrentUserAsAdmin } from '../utils/setAdmin';

const AdminSetup = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetAdmin = async () => {
    setLoading(true);
    setStatus('Setting up admin access...');
    
    try {
      const success = await setCurrentUserAsAdmin();
      if (success) {
        setStatus('Successfully set up admin access! Please refresh the page.');
      } else {
        setStatus('Failed to set up admin access. Please make sure you are logged in.');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-setup">
      <h2>Admin Setup</h2>
      <p>Click the button below to set up admin access for your current account.</p>
      <button 
        onClick={handleSetAdmin} 
        disabled={loading}
        className="admin-button"
      >
        {loading ? 'Setting up...' : 'Set Up Admin Access'}
      </button>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default AdminSetup; 