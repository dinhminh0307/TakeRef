import React, { useEffect, useState } from 'react';

export type NotifierType = 'success' | 'warning' | 'danger' | null;

export interface NotifierData {
  type: NotifierType;
  message: string;
  duration?: number; // Auto-hide duration in milliseconds
}

interface NotifierProps {
  notifier: NotifierData | null;
  onClose: () => void;
}

const Notifier: React.FC<NotifierProps> = ({ notifier, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notifier) {
      setIsVisible(true);
      
      // Auto-hide after specified duration (default 5 seconds)
      const duration = notifier.duration || 5000;
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [notifier]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  const getAlertClass = (type: NotifierType) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'danger':
        return 'alert-danger';
      default:
        return 'alert-info';
    }
  };

  const getIcon = (type: NotifierType) => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'danger':
        return 'bi-x-circle-fill';
      default:
        return 'bi-info-circle-fill';
    }
  };

  if (!notifier) return null;

  return (
    <div
      className={`position-fixed top-0 end-0 p-3`}
      style={{
        zIndex: 9999,
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <div className={`alert ${getAlertClass(notifier.type)} alert-dismissible d-flex align-items-center shadow-lg border-0`}>
        <i className={`${getIcon(notifier.type)} me-3`} style={{ fontSize: '1.25rem' }}></i>
        <div className="flex-grow-1">
          <strong className="me-2">
            {notifier.type === 'success' && 'Success!'}
            {notifier.type === 'warning' && 'Warning!'}
            {notifier.type === 'danger' && 'Error!'}
          </strong>
          <span>{notifier.message}</span>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Notifier;