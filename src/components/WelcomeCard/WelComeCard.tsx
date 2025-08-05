import React from 'react';
import './WelComeCard.css';

interface WelcomeCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const WelComeCard: React.FC<WelcomeCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`col-12 col-md-6 col-lg-4 mb-4 ${className}`}>
      <div className="card welcome-card h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
          {/* Icon Section */}
          <div className="welcome-card-icon mb-3">
            {icon || (
              <div className="default-icon">
                <i className="fas fa-bolt"></i>
              </div>
            )}
          </div>
          
          {/* Title */}
          <h5 className="card-title welcome-card-title mb-3">
            {title}
          </h5>
          
          {/* Description */}
          <p className="card-text welcome-card-description text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelComeCard;