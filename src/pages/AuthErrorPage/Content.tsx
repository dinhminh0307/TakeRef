import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Go back to previous page
  };

  const handleGoHome = () => {
     const isLoggedIn = localStorage.getItem('isLogin');
  
    if (isLoggedIn === 'true') {
        navigate('/', { replace: true });
    } else {
        navigate('/login', { replace: true });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-4">
          <i 
            className="bi bi-shield-exclamation" 
            style={{ 
              fontSize: '4rem', 
              color: '#dc3545' 
            }}
          ></i>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded shadow-sm p-5" style={{ maxWidth: '500px', margin: '0 auto' }}>
          {/* Error Code */}
          <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', color: '#dc3545' }}>
            403
          </h1>

          {/* Error Title */}
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.5rem', color: '#333' }}>
            Access Denied
          </h2>

          {/* Error Message */}
          <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>

          {/* Action Buttons */}
          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn fw-semibold px-4 py-2 rounded-pill"
              onClick={handleGoBack}
              style={{ 
                backgroundColor: '#6c757d', 
                color: '#fff', 
                border: 'none',
                minWidth: '120px'
              }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </button>
            <button 
              className="btn fw-semibold px-4 py-2 rounded-pill"
              onClick={handleGoHome}
              style={{ 
                backgroundColor: '#ffc107', 
                color: '#000', 
                border: 'none',
                minWidth: '120px'
              }}
            >
              <i className="bi bi-house me-2"></i>
              Home
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4">
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>
            Need help? Contact support at{' '}
            <a 
              href="mailto:support@takeref.com" 
              className="text-decoration-none"
              style={{ color: '#007bff' }}
            >
              support@takeref.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;