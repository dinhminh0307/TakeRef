import React, { useRef, useState } from 'react';
import './Content.css';
import { useNavigate } from 'react-router-dom';
import { sendLoginRequest, sendRegisterRequest } from './apis/AuthAPI';

const AuthPage: React.FC<{setLogin: any}> = ({setLogin}) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  // const university = useRef<HTMLInputElement>(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if(!isSignUp) {
      try {
        const response = await sendLoginRequest(formData);
        if(response === null) {
          console.log("error");
        } else {
          console.log("Response: ", response);
          setLogin(true);
          navigate('/');
        }
      } catch(e) {
        console.log(e);
      }
    } else {
      try {
        const body = {
          student_id: 0,
          email: formData.email,
          password: formData.password,
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          university: "RMIT University"
        }

        const response = await sendRegisterRequest(body);
        if(response !== null) {
          console.log(response);
          navigate('/dashboard')
        } 
      } catch(e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center auth-container">
      <div className="row w-100 justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          {/* Square-shaped card container */}
          <div className="card auth-card">
            <div className="card-body auth-card-body">
              {/* Logo/Icon */}
              <div className="text-center mb-3">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center auth-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3 className="fw-bold text-dark auth-title">
                  {isSignUp ? 'Create Account' : 'Welcome back'}
                </h3>
                <p className="text-muted auth-subtitle">
                  {isSignUp ? 'Create your TakeRef account' : 'Sign in to your TakeRef account'}
                </p>
              </div>

              {/* Tab Buttons */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <button
                    type="button"
                    className={`btn w-100 auth-tab-btn ${!isSignUp ? 'active' : 'inactive'}`}
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className={`btn w-100 auth-tab-btn ${isSignUp ? 'active' : 'inactive'}`}
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="auth-form-group">
                  <label htmlFor="email" className="form-label text-muted auth-form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control auth-input"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="auth-form-group">
                  <label htmlFor="password" className="form-label text-muted auth-form-label">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="form-control auth-input auth-input-password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-2"
                      style={{ border: 'none', color: '#6c757d', fontSize: '12px' }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                {!isSignUp && (
                  <div className="d-flex justify-content-between align-items-center auth-remember-forgot">
                    <div className="form-check">
                      <input
                        className="form-check-input auth-checkbox"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label text-muted auth-checkbox-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="auth-link">
                      Forgot your password?
                    </a>
                  </div>
                )}

                {/* Confirm Password for Sign Up */}
                {isSignUp && (
                  <div className="auth-form-group">
                    <label htmlFor="firstName" className="form-label text-muted auth-form-label">
                      First Name
                    </label>
                    <input
                      type='input'
                      className="form-control auth-input"
                      ref={firstNameRef}
                      name="firstName"
                      placeholder="First Name"
                      required
                    />
                    <br />

                    <label htmlFor="lastName" className="form-label text-muted auth-form-label">
                      Last Name
                    </label>
                    <input
                      type="input"
                      className="form-control auth-input"
                      ref={lastNameRef}
                      name="lastName"
                      placeholder="Last Name"
                      required
                    />
                    <br />

                    <label htmlFor="confirmPassword" className="form-label text-muted auth-form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control auth-input"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn w-100 mb-3 auth-submit-btn">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className="auth-divider">
                <span className="auth-divider-text">Or continue with</span>
              </div>

              {/* Social Login Buttons */}
              <div className="row g-2 auth-social-section">
                <button type="button" className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center auth-social-btn">
                    <i className="fab fa-google me-1" style={{ color: '#db4437' }}></i>
                    <span>Google</span>
                  </button>
              </div>

              {/* Footer Text */}
              <div className="text-center">
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    className="auth-toggle-btn"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;