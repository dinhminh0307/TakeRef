import type React from "react";
import { useState } from "react";

interface FunctionModalProp {
    show: boolean
    onHide: () => void;
    onSave: (functionRequest: any) => void;
}

const FunctionModal: React.FC<FunctionModalProp> = ({show, onHide, onSave}) => {
    const [endPoint, setEndPoint] = useState('');
    const [frontendUrl, setFrontendUrl] = useState('')

    const handleSave = () => {
        onHide();
    }

    const handleClose = () => {
        onSave(null);
        onHide();
    }

    if(!show) {
        return;
    }

    return(
        <>
            <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Add New Function</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <form>
              {/* API Field */}
              <div className="mb-3">
                <label htmlFor="citationUrl" className="form-label fw-semibold">
                  API Endpoint <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="endpoint"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                />
              </div>

              {/* Frontend Path Field */}
              <div className="mb-3">
                <label htmlFor="citationUrl" className="form-label fw-semibold">
                  Frontend Path <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="frontendUrl"
                  value={frontendUrl}
                  onChange={(e) => setFrontendUrl(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-warning fw-semibold"
              onClick={handleSave}
            >
              Save Function
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default FunctionModal;