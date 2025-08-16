import React, { useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpiner/Content';
import { saveSubscriptionTypeRequest } from '../../apis/SubscriptionTypeApi';
import { useNavigate } from 'react-router-dom';


interface AddSubscriptionTypeModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (subscriptionType: any) => void;
  setNotifier: any;
}

const AddSubscriptionTypeModal: React.FC<AddSubscriptionTypeModalProps> = ({ 
  show, 
  onHide, 
  onSave, 
  setNotifier 
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // Validation
      if (!name.trim()) {
        setNotifier({
          type: 'warning',
          message: 'Please enter a subscription name'
        });
        return;
      }

      if (!price || parseFloat(price) < 0) {
        setNotifier({
          type: 'warning',
          message: 'Please enter a valid price'
        });
        return;
      }

      if (!timeInterval || parseInt(timeInterval) <= 0) {
        setNotifier({
          type: 'warning',
          message: 'Please enter a valid time interval in days'
        });
        return;
      }

      setIsLoading(true);

      const body = {
        type_id: 0,
        name: name.trim(),
        price: parseFloat(price),
        interval: parseInt(timeInterval),
      };

      const response = await saveSubscriptionTypeRequest(body);
      if(response.ok && response.data) {
        onSave(response.data);
        setNotifier({
            type: 'success',
            message: 'Subscription type saved successfully'
        });
        handleClose();
      } else if(response.status === 403) {
        setNotifier({
              type: "warning",
              message: response.error
            })
        navigate('/auth-error')
      } else {
        setNotifier({
              type: "danger",
              message: response.error
        })
      }
    } catch (e) {
      if (e instanceof Error) {
        setNotifier({
          type: 'danger',
          message: e.message
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setPrice('');
    setTimeInterval('');
    setIsLoading(false);
    onHide();
  };

  // Format price input to show currency
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  // Format time interval to only allow integers
  const handleTimeIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only positive integers
    if (value === '' || /^\d+$/.test(value)) {
      setTimeInterval(value);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              Add New Subscription Type
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <form>
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="subscriptionName" className="form-label fw-semibold">
                  Subscription Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subscriptionName"
                  placeholder="e.g., Premium Plan, Basic Plan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <small className="form-text text-muted">
                  Enter a descriptive name for this subscription plan
                </small>
              </div>

              {/* Price Field */}
              <div className="mb-3">
                <label htmlFor="subscriptionPrice" className="form-label fw-semibold">
                  Price (VND) <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">VND</span>
                  <input
                    type="text"
                    className="form-control"
                    id="subscriptionPrice"
                    placeholder="0.00"
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                <small className="form-text text-muted">
                  Enter the subscription price (e.g., 9.99)
                </small>
              </div>

              {/* Time Interval Field */}
              <div className="mb-3">
                <label htmlFor="timeInterval" className="form-label fw-semibold">
                  Time Interval (Days) <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="timeInterval"
                  placeholder="30"
                  value={timeInterval}
                  onChange={handleTimeIntervalChange}
                  required
                />
                <small className="form-text text-muted">
                  Enter the subscription duration in days (e.g., 30 for monthly, 365 for yearly)
                </small>
              </div>

              {/* Preview Section */}
              {name && price && timeInterval && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Preview</label>
                  <div
                    className="form-control"
                    style={{ 
                      backgroundColor: '#f8f9fa', 
                      minHeight: '60px',
                      padding: '12px'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 fw-bold">{name}</h6>
                        <small className="text-muted">
                          Valid for {timeInterval} day{parseInt(timeInterval) !== 1 ? 's' : ''}
                        </small>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0 text-success fw-bold">${price}</h5>
                        <small className="text-muted">
                          ${(parseFloat(price) / parseInt(timeInterval)).toFixed(4)}/day
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-warning fw-semibold"
              onClick={handleSave}
              disabled={!name || !price || !timeInterval || isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Save Subscription Type
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptionTypeModal;