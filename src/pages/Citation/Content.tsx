import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/Content';
import AddCitationModal from './AddCitation/Content';
import type { LLMCitationResponse } from '../../utils/format/format';
import type { CitationResponse } from '../../utils/interfaces/CitationResponse';
import { ResourceNotFoundError } from '../../utils/exceptions/exception';
import { getAllCitation } from './apis/CitationApis';
import LoadingSpinner from '../../components/LoadingSpiner/Content';

const CitationPage: React.FC<{setNotifier: any}> = ({setNotifier}) => {
  const [citations, setCitations] = useState<CitationResponse[]>([
    
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const handleNewCitation = () => {
    setShowAddModal(true);
  };

  const handleSaveCitation = (newCitation: CitationResponse) => {
    setCitations([...citations, newCitation]);
  };

  const handleAction = (action: string, citationId: number) => {
    console.log(`${action} citation ${citationId}`);
    
  };

  const fetchCitationData = async () => {
    try {
      setLoading(true)
      const data = await getAllCitation();
      setCitations(data);
    } catch(e) {
      if(e instanceof ResourceNotFoundError) {
        setNotifier({
          type: 'warning',
          message: e.message
        })
      } else {
        setNotifier({
          type: 'warning',
          message: e
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCitationData();
  }, [])


  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar activeItem="citation" onItemClick={handleSidebarClick} setNotifier={setNotifier} setLoading={setLoading}/>
      
      {/* Main Content */}
      {loading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>Citation History</h1>
            <button 
              className="btn fw-semibold px-4 py-2 rounded-pill"
              onClick={handleNewCitation}
              style={{ backgroundColor: '#ffc107', color: '#000', border: 'none' }}
            >
              <i className="bi bi-plus me-2"></i>
              New Citation
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', width: '30%' }}>TITLE</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', width: '15%' }}>TYPE</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', width: '35%' }}>URL</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', width: '15%' }}>DATE</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', width: '5%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {citations.map((citation, index) => (
                    <tr key={citation.citationid} className={index < citations.length - 1 ? 'border-bottom' : ''}>
                      <td className="px-4 py-3 border-0" style={{ maxWidth: '200px' }}>
                        <a 
                          href="#" 
                          className="text-primary text-decoration-none fw-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(`View citation: ${citation.title}`);
                          }}
                          title={citation.title} // Show full title on hover
                        >
                          {citation.title && citation.title.length > 40 
                            ? `${citation.title.substring(0, 40)}...` 
                            : citation.title
                          }
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted border-0">{citation.citationType.name}</td>
                      <td className="px-4 py-3 text-muted border-0" style={{ 
                        maxWidth: '250px',
                        wordBreak: 'break-all',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <a 
                          href={citation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none text-muted"
                          title={citation.url} // Show full URL on hover
                          style={{ fontSize: '0.85rem' }}
                        >
                          {citation.url && citation.url.length > 50 
                            ? `${citation.url.substring(0, 50)}...` 
                            : citation.url
                          }
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted border-0" style={{ fontSize: '0.875rem' }}>
                        {citation.created_at}
                      </td>
                      <td className="px-4 py-3 border-0">
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('view', citation.citationid)}
                            title="View"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-eye text-info"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('edit', citation.citationid)}
                            title="Edit"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-pencil text-primary"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('delete', citation.citationid)}
                            title="Delete"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Citation Modal */}
      <AddCitationModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleSaveCitation}
        setNotifier={setNotifier}
      />
    </div>
  );
};

export default CitationPage;