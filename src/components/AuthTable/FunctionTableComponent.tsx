import type React from "react";

interface FunctionTableProp {
    functionData: any[];
    handleNewFunction?: any;
    handlePermissionAction?: any;
}
const FunctionTableComponent: React.FC<FunctionTableProp> = ({functionData, handleNewFunction, handlePermissionAction}) => {
    
    return(
        <>
            <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>Functions Management</h2>
              <button 
                className="btn fw-semibold px-4 py-2 rounded-pill"
                onClick={handleNewFunction}
                style={{ backgroundColor: '#28a745', color: '#fff', border: 'none' }}
              >
                <i className="bi bi-plus me-2"></i>
                New Function
              </button>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Function ID</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>API Endpoint</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Frontend Path</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      functionData.map((func, index) => (
                      <tr key={func.function_id} className={index < functionData.length - 1 ? 'border-bottom' : ''}>
                        <td className="px-4 py-3 border-0">
                          <span className="fw-medium">#{func.function_id}</span>
                        </td>
                        <td className="px-4 py-3 border-0">
                          {func.apiEndpoint ? (
                            <a 
                              href="#" 
                              className="text-primary text-decoration-none fw-medium"
                              title={func.apiEndpoint}
                            >
                              {func.apiEndpoint.length > 30 ? `${func.apiEndpoint.substring(0, 30)}...` : func.apiEndpoint}
                            </a>
                          ) : (
                            <span className="text-muted">No API endpoint</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-0">
                          {func.frontendUrl ? (
                            <span className="badge bg-info text-dark">
                              {func.frontendUrl}
                            </span>
                          ) : (
                            <span className="text-muted">No frontend URL</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-0">
                          <span className={`badge ${func.apiEndpoint ? 'bg-success' : 'bg-primary'}`}>
                            {func.apiEndpoint ? 'API' : 'Frontend'}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-0">
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('edit', func.function_id)}
                              title="Edit"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-pencil text-primary"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('view', func.function_id)}
                              title="View Details"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-eye text-info"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('delete', func.function_id)}
                              title="Delete"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>

              {/* Empty State for Permissions */}
              {functionData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-shield-check text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted mt-3">No permissions found</h5>
                  <p className="text-muted">Create permissions to control system access.</p>
                  <button 
                    className="btn fw-semibold px-4 py-2 rounded-pill"
                    onClick={handleNewFunction}
                    style={{ backgroundColor: '#28a745', color: '#fff', border: 'none' }}
                  >
                    <i className="bi bi-plus me-2"></i>
                    Add First Permission
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
    )
}

export default FunctionTableComponent