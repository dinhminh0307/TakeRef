import type React from "react";
import { useEffect, useState } from "react";
import { addFunction, updateFunction } from "../apis/FunctionRoleApi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpiner/Content";

interface FunctionModalProp {
    show: boolean
    onHide: () => void;
    onSave: (functionRequest: any) => void;
    setNotifier?: any;
    action?: string;
    data?: any;
}

export default function FunctionModal({show, onHide, onSave, setNotifier, action, data}: FunctionModalProp) {
    const [endPoint, setEndPoint] = useState('');
    const [frontendUrl, setFrontendUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSave = async () => {
      try {
        if(!endPoint.trim() && !frontendUrl.trim()) {
          setNotifier({
              type: "warning",
              message: 'Please do not leave both field empty'
          })
          return;
        }
        setLoading(true);
        const body = {
          function_id: data ? data.function_id : 0,
          frontendUrl: frontendUrl.trim() ?? null,
          apiEndpoint: endPoint.trim() ?? null,
          sideBarItems: null
        }

        let response:any;
        if(action === 'edit') {
          response = await updateFunction(body);
        } else {
          response = await addFunction(body);
        }
        if(response.data && response.ok) {
          onSave(response.data);
          handleClose();
        } else if(response.status === 403) {
          setNotifier({
              type: "danger",
              message: response.error
          })
          navigate('/auth-error')
        } else {
          setNotifier({
              type: "danger",
              message: response.error
          })
        }
      } catch(e) {
        setNotifier({
              type: "danger",
              message: e
        })
      } finally {
        setLoading(false);
      }
    }

    const handleClose = () => {
        setEndPoint('');
        setFrontendUrl('');
        onHide();
    }

    useEffect(() => {
      if(data) {
        setEndPoint(data.apiEndpoint || '');
        setFrontendUrl(data.frontendUrl || '');
      }
    }, [data])

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
              {loading ? (<LoadingSpinner/>) : (
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
              )}
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
