import type React from "react";
import { useState } from "react";

interface FunctionRoleProp {
    handleNewFunctionRole? : any;
    handleFunctionRoleAction?: any;
    functionRole: any[];
}
const FunctionRoleTableComponent: React.FC<FunctionRoleProp> = ({handleNewFunctionRole, handleFunctionRoleAction, functionRole}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 5;

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentRows = functionRole.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(functionRole.length / rowPerPage);

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
                    {
                      currentRows.map((funcRole, index) => (
                      <tr key={funcRole.functionRoleId} className={index < currentRows.length - 1 ? 'border-bottom' : ''}>
                        <td className="px-4 py-3 border-0">
                          <span className="fw-medium">{funcRole.role.role}</span>
                        </td>
                        <td className="px-4 py-3 border-0">
                          {funcRole.function !== null ? (
                            <a 
                              className="text-primary text-decoration-none fw-medium"
                            >
                              {funcRole.function.function_id}
                            </a>
                          ) : (
                            <span className="text-muted">No Function ID</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-0">
                          {funcRole.createdAt !== null ? (
                            <span className="badge bg-info text-dark">
                              {funcRole.createdAt}
                            </span>
                          ) : (
                            <span className="text-muted">No Created At Date</span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-0">
                          <span className= "badge  bg-success">
                            {funcRole.modifiedAt !== null  ? funcRole.modifiedAt : 'Not modified yet'}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-0">
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handleFunctionRoleAction('edit', funcRole)}
                              title="Edit"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-pencil text-primary"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handleFunctionRoleAction('view', funcRole)}
                              title="View Details"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-eye text-info"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handleFunctionRoleAction('delete', funcRole)}
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
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                </li>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <li 
                    key={i} 
                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
    )
}

export default FunctionRoleTableComponent;