import React from 'react';

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: number;
  period: string;
  isPopular?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  price,
  period,
  isPopular = false,
  buttonText = "Start Free Trial",
  onButtonClick
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card h-100 position-relative ${isPopular ? 'border-warning' : 'border-light'}`}>
        {isPopular && (
          <div className="position-absolute top-0 start-50 translate-middle">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
              Most Popular
            </span>
          </div>
        )}
        
        <div className="card-body text-center d-flex flex-column">
          <h3 className="card-title fw-bold mb-2 mt-3">{title}</h3>
          <p className="text-muted mb-4">{description}</p>
          
          <div className="mb-4">
            <span className="display-4 fw-bold">{price}.000</span>
            <span className="text-muted ms-2"> VND/{period}</span>
          </div>
          
          <button 
            className="btn btn-warning btn-lg w-100 mb-4 fw-semibold"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        
        </div>
      </div>
    </div>
  );
};

// Example usage component
const SubscriptionCards: React.FC = () => {
  const handleStartTrial = () => {
    console.log('Start trial clicked');
  };

  return (
    <div className="container py-5">
      <div className="row">
        <SubscriptionCard
          title="Pro Monthly"
          description="For growing businesses and agencies"
          price={19}
          period="per month"
          isPopular={true}
          onButtonClick={handleStartTrial}
        />
      </div>
    </div>
  );
};

export default SubscriptionCard;
export { SubscriptionCards };