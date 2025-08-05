import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  // CSS Variables for styling
  const footerStyles = {
    '--footer-bg': '#1e293b',
    '--footer-text': '#94a3b8',
    '--footer-text-light': '#cbd5e1',
    '--footer-heading': '#ffffff',
    '--footer-link-hover': '#3b82f6',
    '--footer-border': '#334155',
    '--footer-social-bg': '#334155',
    '--footer-social-hover': '#475569',
    width: '100%',
    margin: '0',
    padding: '0'
  } as React.CSSProperties;

  return (
    <footer 
      className={`footer w-100 ${className}`} 
      style={footerStyles}
    >
      <div 
        className="w-100" 
        style={{ 
          backgroundColor: 'var(--footer-bg)', 
          color: 'var(--footer-text)',
          width: '100vw',
          margin: '0',
          padding: '0'
        }}
      >
        <div className="container py-5">
          {/* Your existing footer content here */}
          {/* Main Footer Content */}
          <div className="row">
            {/* Brand Section */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--footer-heading)' }}>
                TakeRef
              </h5>
              <p className="small mb-3" style={{ color: 'var(--footer-text)', lineHeight: '1.6' }}>
                The ultimate platform for creating accurate academic citations for RMIT students. Trusted by students and researchers worldwide.
              </p>
              {/* Social Media Icons */}
              <div className="d-flex gap-2">
                <a 
                  href="#" 
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'var(--footer-social-bg)', 
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    color: 'var(--footer-text)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-bg)'}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href="#" 
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'var(--footer-social-bg)', 
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    color: 'var(--footer-text)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-bg)'}
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a 
                  href="#" 
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'var(--footer-social-bg)', 
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    color: 'var(--footer-text)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-bg)'}
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Citation Styles */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <h6 className="fw-bold mb-3" style={{ color: 'var(--footer-heading)' }}>
                Citation Styles
              </h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    APA Style
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Harvard Referencing
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Chicago Style
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    MLA Format
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    IEEE Citations
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <h6 className="fw-bold mb-3" style={{ color: 'var(--footer-heading)' }}>
                Company
              </h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <h6 className="fw-bold mb-3" style={{ color: 'var(--footer-heading)' }}>
                Support
              </h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Documentation
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    RMIT Guidelines
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none small"
                    style={{ color: 'var(--footer-text)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div 
            className="row pt-4 mt-4"
            style={{ borderTop: '1px solid var(--footer-border)' }}
          >
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <p className="small mb-0" style={{ color: 'var(--footer-text)' }}>
                © 2024 TakeRef. All rights reserved.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-wrap gap-3 justify-content-md-end">
                <a 
                  href="#" 
                  className="text-decoration-none small"
                  style={{ color: 'var(--footer-text)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none small"
                  style={{ color: 'var(--footer-text)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                >
                  Terms of Service
                </a>
                <a 
                  href="#" 
                  className="text-decoration-none small"
                  style={{ color: 'var(--footer-text)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text)'}
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;