import React, { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpiner/Content';
import { saveCitationType } from './apis/CitationTypeApi';

interface AddCitationTypeModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (citationType: { type_id: number, name: string; description: string }) => void;
}

const AddCitationTypeModal: React.FC<AddCitationTypeModalProps> = ({ show, onHide, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      alert('Please fill in both Name and Description fields');
      return;
    }

    setIsLoading(true);

    try {
        const body = {
            type_id: 0,
            name: name,
            description: description
        }
      const response = await saveCitationType(body);
      
      onSave({
        type_id: response.type_id,
        name: response.name.trim(),
        description: response.description.trim()
      });

      // Reset form
      setName('');
      setDescription('');
      onHide();
    } catch (error) {
      console.error('Error saving citation type:', error);
      alert('Error saving citation type. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Add New Citation Type</h5>
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
                <label htmlFor="citationTypeName" className="form-label fw-semibold">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="citationTypeName"
                  placeholder="e.g., Journal Article, Book, Website..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Description Field */}
              <div className="mb-3">
                <label htmlFor="citationTypeDescription" className="form-label fw-semibold">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="citationTypeDescription"
                  rows={4}
                  placeholder="Describe what this citation type is used for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Preview Section */}
              {(name || description) && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Preview</label>
                  <div
                    className="form-control"
                    style={{ 
                      backgroundColor: '#f8f9fa', 
                      minHeight: '80px',
                      padding: '12px'
                    }}
                  >
                    {name || description ? (
                      <div>
                        <div className="fw-semibold text-primary mb-1">
                          {name || 'Citation Type Name'}
                        </div>
                        <div className="text-muted">
                          {description || 'Citation type description will appear here...'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted">Preview will appear here as you type...</span>
                    )}
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
              disabled={!name.trim() || !description.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-plus me-2"></i>
                  Save Citation Type
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCitationTypeModal;