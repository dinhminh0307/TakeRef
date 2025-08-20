import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/Content';
import LoadingSpinner from '../../components/LoadingSpiner/Content';
import { useNavigate } from 'react-router-dom';
import { fetchAllFunctionRole } from './apis/FunctionRoleApi';
import FunctionTableComponent from '../../components/AuthTable/FunctionTableComponent';
import FunctionRoleTableComponent from '../../components/AuthTable/FunctionRoleTableComponent';
import FunctionModal from './FunctionModal/Content';

interface AuthorizationPageProps {
  setNotifier?: any
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = ({setNotifier}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [functionRole, setFunctionRole] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} user ${userId}`);
  };

  const handlePermissionAction = (action: string, permissionId: number) => {
    console.log(`${action} permission ${permissionId}`);
  };

  const handleNewUser = () => {
    console.log('Opening new user modal');
  };

  const handleNewFunction = () => {
    setShowModal(true)
    console.log('Opening new permission modal');
  };

  const handleNewFunctionRole = () => {

  }

  const handleSaveFunction = (newFunction: any) => {
    setPermissions([... permissions, newFunction])
  }

  const handleFunctionRoleAction = (action: string, function_role_id: number) => {

  }

  const fetchAllFunction = async () => {
    try {
        const response = await fetchAllFunctionRole();
        const roleId = response.headers.get('X-Role-Headers');
        if(roleId === '1') {
          setAdmin(true)
        } else {
          setAdmin(false)
        }

        // handle error
        if(response.data && response.ok) {
            setPermissions(response.data);
        }else if(response.status === 404) {
          setNotifier({
              type: "warning",
              message: response.error
            })
        } else if(response.status === 403){
          setNotifier({
              type: "warning",
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
    }
  }

  useEffect(() => {
    fetchAllFunction()
  }, [])

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar admin={admin} activeItem="authorization" onItemClick={handleSidebarClick} setNotifier={setNotifier} setLoading={setLoading}/>
      
      {loading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>Authorization Management</h1>
          </div>

          {/* Users Table */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.5rem' }}>User Management</h2>
              <button 
                className="btn fw-semibold px-4 py-2 rounded-pill"
                onClick={handleNewUser}
                style={{ backgroundColor: '#ffc107', color: '#000', border: 'none' }}
              >
                <i className="bi bi-plus me-2"></i>
                New User
              </button>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>USER ID</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>USERNAME</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>EMAIL</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ROLE</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>STATUS</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>LAST LOGIN</th>
                      <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample rows for demonstration */}
                    <tr className="border-bottom">
                      <td className="px-4 py-3 border-0">
                        <span className="fw-medium">#001</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <a 
                          href="#" 
                          className="text-primary text-decoration-none fw-medium"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(`View user details`);
                          }}
                        >
                          john_doe
                        </a>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <span className="text-muted">john@example.com</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <span className="badge bg-primary">Admin</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <span className="text-muted">2024-08-18 10:30</span>
                      </td>
                      <td className="px-4 py-3 border-0">
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleUserAction('toggle', 1)}
                            title="Toggle Status"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-toggle-on text-success"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleUserAction('edit', 1)}
                            title="Edit"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-pencil text-primary"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleUserAction('permissions', 1)}
                            title="Manage Permissions"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                          >
                            <i className="bi bi-shield-check text-warning"></i>
                          </button>
                          <button
                            className="btn btn-sm p-1"
                            onClick={() => handleUserAction('delete', 1)}
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

              {/* Empty State for Users */}
              {users.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-people text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="text-muted mt-3">No users found</h5>
                  <p className="text-muted">Add users to manage system access.</p>
                  <button 
                    className="btn fw-semibold px-4 py-2 rounded-pill"
                    onClick={handleNewUser}
                    style={{ backgroundColor: '#ffc107', color: '#000', border: 'none' }}
                  >
                    <i className="bi bi-plus me-2"></i>
                    Add First User
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Permissions Table */}
          <FunctionTableComponent functionData={permissions} handleNewFunction={handleNewFunction} handlePermissionAction={handlePermissionAction}/>

          {/* Function Role Table */}
          <FunctionRoleTableComponent handleFunctionRoleAction={handleFunctionRoleAction} handleNewFunctionRole={handleNewFunctionRole} functionRole={functionRole}/>
        </div>
      )}
      <FunctionModal setNotifier={setNotifier} show={showModal} onSave={handleSaveFunction} onHide={() => setShowModal(false)}/>
    </div>
  );
};

export default AuthorizationPage;