import type React from "react";

interface FunctionRoleProp {
    handleNewFunctionRole? : any;
    handleFunctionRoleAction?: any;
    functionRole: any[];
}
const FunctionRoleTableComponent: React.FC<FunctionRoleProp> = ({handleNewFunctionRole, handleFunctionRoleAction, functionRole}) => {
    return(
        <>
            <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>Function Role Management</h2>
              <button 
                className="btn fw-semibold px-4 py-2 rounded-pill"
                onClick={handleNewFunctionRole}
                style={{ backgroundColor: '#2e40bbff', color: '#fff', border: 'none' }}
              >
                <i className="bi bi-plus me-2"></i>
                New Function Role
              </button>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Role</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Function ID</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Created At</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Modified At</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample rows for demonstration */}
                    <tr className="border-bottom">
                      <td className="px-4 py-3 border-0">
                        <span className="fw-medium">User</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <a 
                          href="#" 
                          className="text-primary text-decoration-none fw-medium"
                        >
                          1
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted border-0" style={{ maxWidth: '200px' }}>
                        <span>
                          Thursday
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted border-0" style={{ maxWidth: '200px' }}>
                        <span>
                          Friday
                        </span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleFunctionRoleAction('edit', 1)}
                            title="Edit"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-pencil text-primary"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleFunctionRoleAction('delete', 1)}
                            title="Delete"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Add more sample rows if needed */}
                  </tbody>
                </table>
              </div>

              {/* Empty State for Function Role */}
              {functionRole.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-shield-check text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted mt-3">No Function Role found</h5>
                  <button 
                    className="btn fw-semibold px-4 py-2 rounded-pill"
                    onClick={handleNewFunctionRole}
                    style={{ backgroundColor: '#2e40bbff', color: '#fff', border: 'none' }}
                  >
                    <i className="bi bi-plus me-2"></i>
                    Add First Function Role
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
    )
}

export default FunctionRoleTableComponent;