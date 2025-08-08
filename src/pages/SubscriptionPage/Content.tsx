import React, { useState } from 'react';
import SubscriptionCard from '../../components/SubscriptionCard/Content';

const SubscriptionPageContent: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleStartTrial = (planName: string) => {
    console.log(`Starting trial for ${planName}`);
    // Add your trial logic here
  };

  const handleGetStarted = (planName: string) => {
    console.log(`Getting started with ${planName}`);
    // Add your subscription logic here
  };

  // Plan data
  const plans = {
    monthly: {
      single: {
        title: "Single Ref",
        description: "Counted for each reference",
        price: 5,
        period: "per month",
        buttonText: "Get Started",
        features: [
          "1 Website",
          "Basic Templates",
          "Basic Support",
          "1GB Storage",
          "Basic Analytics"
        ]
      },
      pro: {
        title: "Pro Monthly",
        description: "For growing businesses and agencies",
        price: 90,
        period: "per month",
        buttonText: "Start Free Trial",
        isPopular: true,
      },
      yearly: {
        title: "Pro Semester",
        description: "Counted for each semester",
        price: 199,
        period: "per year",
        buttonText: "Get Started",
        features: [
          "Unlimited Websites",
          "Premium Templates",
          "Priority Support",
          "100GB Storage",
          "Advanced Analytics",
          "Custom Domain",
          "White-label Options",
          "API Access"
        ]
      }
    },
    yearly: {
      single: {
        title: "Single Project",
        description: "Perfect for single creators.",
        price: 290,
        period: "per year",
        buttonText: "Get Started",
        features: [
          "1 Website",
          "Basic Templates",
          "Basic Support",
          "1GB Storage",
          "Basic Analytics"
        ]
      },
      pro: {
        title: "Pro Monthly",
        description: "For growing businesses and agencies",
        price: 190,
        period: "per year",
        buttonText: "Start Free Trial",
        isPopular: true,
        features: [
          "Unlimited Websites",
          "Premium Templates",
          "Priority Support",
          "50GB Storage",
          "Advanced Analytics",
          "Custom Domain",
          "SEO Tools"
        ]
      },
      yearly: {
        title: "Pro Yearly",
        description: "Great for established businesses",
        price: 1990,
        period: "per year",
        buttonText: "Get Started",
        features: [
          "Unlimited Websites",
          "Premium Templates",
          "Priority Support",
          "100GB Storage",
          "Advanced Analytics",
          "Custom Domain",
          "White-label Options",
          "API Access"
        ]
      }
    }
  };

  const currentPlans = plans[billingPeriod];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Choose Your Perfect Plan</h1>
        <p className="text-muted fs-6 mb-4 mx-auto" style={{ maxWidth: '500px' }}>
          Select the subscription that best fits your needs. From single reference to unlimited 
          reference, we have the right plan for every students.
        </p>
      </div>

      {/* Subscription Cards */}
      <div className="row justify-content-center">
        <SubscriptionCard
          title={currentPlans.single.title}
          description={currentPlans.single.description}
          price={currentPlans.single.price}
          period={currentPlans.single.period}
          buttonText={currentPlans.single.buttonText}
          onButtonClick={() => handleGetStarted('Single Project')}
        />
        
        <SubscriptionCard
          title={currentPlans.pro.title}
          description={currentPlans.pro.description}
          price={currentPlans.pro.price}
          period={currentPlans.pro.period}
          isPopular={currentPlans.pro.isPopular}
          buttonText={currentPlans.pro.buttonText}
          onButtonClick={() => handleStartTrial('Pro Monthly')}
        />
        
        <SubscriptionCard
          title={currentPlans.yearly.title}
          description={currentPlans.yearly.description}
          price={currentPlans.yearly.price}
          period={currentPlans.yearly.period}
          buttonText={currentPlans.yearly.buttonText}
          onButtonClick={() => handleGetStarted('Pro Yearly')}
        />
      </div>
    </div>
  );
};

export default SubscriptionPageContent;