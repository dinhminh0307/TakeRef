import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar/Content';
import AddCitationTypeModal from '../AddCitationType/Content';
import { getAllCitationType } from './apis/GetCitationTypes';
import { AuthorizationError, ResourceNotFoundError } from '../../../utils/exceptions/exception';
import type { CitationType } from '../../../utils/interfaces/CitationType';
import LoadingSpinner from '../../../components/LoadingSpiner/Content';
import { useNavigate } from 'react-router-dom';

interface CitationTypeProps {
  setNotifier?: any
}

const CitationTypePage: React.FC<CitationTypeProps> = ({setNotifier}) => {
  const [citationTypes, setCitationTypes] = useState<CitationType[]>([

  ]);

  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const handleSaveCitationType = (newType: {type_id: number, name: string; description: string }) => {
    
    setCitationTypes([...citationTypes, newType]);
    };

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const getCitationType = async () => {
    setLoading(true)
    try {
        const result = await getAllCitationType();
        const roleId = result.headers.get('X-Role-Headers');
        console.log(roleId)
        if(roleId === '1') {
          setAdmin(true)
        } else {
          setAdmin(false)
        }

        if(result.ok && result.data) {
          setCitationTypes(result.data);
        } else if(result.status === 404) {
          setNotifier({
              type: "warning",
              message: result.error
            })
        } else if(result.status === 403){
          setNotifier({
              type: "warning",
              message: result.error
            })
          navigate('/auth-error')
        } else {
          setNotifier({
              type: "danger",
              message: result.error
            })
        }
        
    } catch(e) {
        console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCitationType();
  }, [])

  const handleNewCitationType = () => {
    setShowAddModal(true);
    console.log('Opening new citation type modal');
  };

  const handleAction = (action: string, typeId: number) => {
    console.log(`${action} citation type ${typeId}`);
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar admin={admin} activeItem="citation" onItemClick={handleSidebarClick} setNotifier={setNotifier} setLoading={setLoading}/>
      
      {loading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>Citation Types</h1>
            <button 
              className="btn fw-semibold px-4 py-2 rounded-pill"
              onClick={handleNewCitationType}
              style={{ backgroundColor: '#ffc107', color: '#000', border: 'none' }}
            >
              <i className="bi bi-plus me-2"></i>
              New Citation Type
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>NAME</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>DESCRIPTION</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {citationTypes.map((type, index) => (
                    <tr key={type.type_id} className={index < citationTypes.length - 1 ? 'border-bottom' : ''}>
                      <td className="px-4 py-3 border-0">
                        <a 
                          href="#" 
                          className="text-primary text-decoration-none fw-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(`View citation type: ${type.name}`);
                          }}
                        >
                          {type.name}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted border-0" style={{ maxWidth: '200px' }}>
                        <span title={type.description}>
                          {type.description.length > 50 ? `${type.description.substring(0, 50)}...` : type.description}
                        </span>
                      </td> 
                      <td className="px-4 py-3 border-0">
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('toggle', type.type_id)}
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('edit', type.type_id)}
                            title="Edit"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-pencil text-primary"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('view', type.type_id)}
                            title="View Details"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-eye text-info"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('delete', type.type_id)}
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
          
          <AddCitationTypeModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSave={handleSaveCitationType}
          />
        </div>
      )}
    </div>
  );
};

export default CitationTypePage;