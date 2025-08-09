import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  text?: string;
  overlay?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text = 'Loading...',
  overlay = false,
  className = ''
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm':
        return { width: '1rem', height: '1rem' };
      case 'lg':
        return { width: '3rem', height: '3rem' };
      default:
        return { width: '2rem', height: '2rem' };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'small';
      case 'lg':
        return 'h5';
      default:
        return '';
    }
  };

  const spinnerContent = (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div
        className={`spinner-border text-${color}`}
        role="status"
        style={getSpinnerSize()}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <div className={`mt-2 text-${color} ${getTextSize()}`}>
          {text}
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
          backdropFilter: 'blur(2px)'
        }}
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Alternative spinner designs
export const DotSpinner: React.FC<Omit<LoadingSpinnerProps, 'overlay'>> = ({
  size = 'md',
  color = 'primary',
  text,
  className = ''
}) => {
  const dotSize = size === 'sm' ? '8px' : size === 'lg' ? '16px' : '12px';
  
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div className="d-flex gap-1 align-items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`bg-${color} rounded-circle`}
            style={{
              width: dotSize,
              height: dotSize,
              animation: `dotBounce 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`
            }}
          />
        ))}
      </div>
      {text && (
        <div className={`mt-2 text-${color} ${size === 'sm' ? 'small' : size === 'lg' ? 'h5' : ''}`}>
          {text}
        </div>
      )}
      <style>
        {`
          @keyframes dotBounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

// Pulse spinner
export const PulseSpinner: React.FC<Omit<LoadingSpinnerProps, 'overlay'>> = ({
  size = 'md',
  color = 'primary',
  text,
  className = ''
}) => {
  const pulseSize = size === 'sm' ? '2rem' : size === 'lg' ? '4rem' : '3rem';
  
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div
        className={`bg-${color} rounded-circle`}
        style={{
          width: pulseSize,
          height: pulseSize,
          animation: 'pulse 2s infinite'
        }}
      />
      {text && (
        <div className={`mt-2 text-${color} ${size === 'sm' ? 'small' : size === 'lg' ? 'h5' : ''}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;