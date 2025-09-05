import type React from "react";
import { useEffect, useState } from "react";
import { addFunction, addFunctionRole, updateFunction, updateFunctionRole } from "../apis/FunctionRoleApi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpiner/Content";
import FunctionTableComponent from "../../../components/AuthTable/FunctionTableComponent";

interface FunctionRoleModalProp {
    show: boolean
    onHide: () => void;
    onSave: (functionRoleRequest: any) => void;
    setNotifier?: any;
    action?: string;
    data?: any;
    rolesData?: any
    functionData?: any
}

export default function FunctionRoleModal({show, onHide, onSave, setNotifier, action, data, rolesData, functionData}: FunctionRoleModalProp) {
    const [role, setRole] = useState();
    const [selectedFunction, setSelectedFunction] = useState<any | null>(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSave = async () => {
      try {
        if((role === null || role === undefined) && (selectedFunction === null || selectedFunction === undefined)) {
          setNotifier({
              type: "warning",
              message: 'Please do not leave both field empty'
          })
          return;
        }
        setLoading(true);
        const body = {
          function_role_id: data ? data.function_role_id : 0,
          function: selectedFunction,
          role: role,
          created_at: null,
          modified_at: null
        }

        let response:any;
        if(action === 'edit') {
          response = await updateFunctionRole(body);
        } else {
          response = await addFunctionRole(body);
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
        setRole(undefined);
        setSelectedFunction(null);
        onHide();
    }

    useEffect(() => {
      if(data) {
        setRole(data.role || undefined);
        setSelectedFunction(data.function.function || null);
      }
    }, [data])

    useEffect(() => {
        console.log('Select Function: ', selectedFunction);
    }, [selectedFunction])

    if(!show) {
        return;
    }

    return(
        <>
          <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Add New Function Role</h5>
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
                    <label htmlFor="role" className="form-label fw-semibold">
                        Role <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-select"
                        id="role"
                        value={role ? JSON.stringify(role) : ""}
                        onChange={(e) => {
                            const object = JSON.parse(e.target.value)
                            setRole(object)
                        }}
                    >
                        <option value="">-- Select Role --</option>
                        {rolesData.map((r: any) => (
                            <option key={r.role_id} value={JSON.stringify(r)}>
                            {r.role}
                            </option>
                        ))}
                    </select>
                    </div>

                  {/* Frontend Path Field */}
                  <div className="mb-3">
                    <FunctionTableComponent selectFunction={setSelectedFunction} isModal={true} functionData={functionData}/>
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
                  Save Function Role
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
