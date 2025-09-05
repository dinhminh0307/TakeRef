import type React from "react";
import { useEffect, useState, type HtmlHTMLAttributes } from "react";

interface FunctionTableProp {
    functionData: any[];
    handleNewFunction?: any;
    handlePermissionAction?: any;
    isModal: boolean;
    selectFunction?: (data: any) => void;
    selectedId?: number | null;
}
const FunctionTableComponent: React.FC<FunctionTableProp> = ({
  functionData,
  handleNewFunction,
  handlePermissionAction,
  isModal,
  selectFunction,
  selectedId: externalSelectedId
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 5;
  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentRows = functionData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(functionData.length / rowPerPage);

  // Only use local state if not provided by parent
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Use externalSelectedId if provided
  const highlightId = isModal && externalSelectedId !== undefined ? externalSelectedId : selectedId;

  const handleRowClick = (data: any) => {
    if (isModal && selectFunction) {
      selectFunction(data);
      setSelectedId(data.function_id);
    } else {
      setSelectedId(data.function_id);
    }
  };

    useEffect(() => {
      console.log('Selected: ', selectedId)
    }, [selectedId])

    const styles = {
      rowHighlight: {
        backgroundColor: "#ffeeba",
        transition: "background-color 0.3s ease"
      }
    };

    return(
        <>
        <style>
        {`
          .row-highlight {
            background-color: #c8e6c9 !important; /* light green */
            transition: background-color 0.3s ease;
          }
        `}
        </style>
            <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>Functions Management</h2>
              {!isModal && 
              <button 
                className="btn fw-semibold px-4 py-2 rounded-pill"
                onClick={handleNewFunction}
                style={{ backgroundColor: '#28a745', color: '#fff', border: 'none' }}
              >
                <i className="bi bi-plus me-2"></i>
                New Function
              </button>}
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Function ID</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>API Endpoint</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Frontend Path</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Type</th>
                      {!isModal && <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>}      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentRows.map((func, index) => (
                      <tr
                        onClick={() => handleRowClick(func)}
                        key={func.function_id + '-' + index}
                        className={
                          `${index < currentRows.length - 1 ? 'border-bottom' : ''} ` +
                          `${highlightId === func.function_id ? 'row-highlight' : ''}`
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
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
                        {!isModal && <td className="px-4 py-3 border-0">
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('edit', func)}
                              title="Edit"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-pencil text-primary"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('view', func)}
                              title="View Details"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-eye text-info"></i>
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              onClick={() => handlePermissionAction('delete', func)}
                              title="Delete"
                              style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                            >
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </div>
                        </td>}
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
           <nav aria-label="Page navigation">
              <ul className="pagination">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    type="button"
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
                      type="button" 
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    type="button"
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

export default FunctionTableComponent