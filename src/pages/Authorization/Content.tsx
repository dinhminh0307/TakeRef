import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/Content';
import LoadingSpinner from '../../components/LoadingSpiner/Content';
import { useNavigate } from 'react-router-dom';
import { deleteFunction, fetchAllFunctionRole, getAllFunction } from './apis/FunctionRoleApi';
import FunctionTableComponent from '../../components/AuthTable/FunctionTableComponent';
import FunctionRoleTableComponent from '../../components/AuthTable/FunctionRoleTableComponent';
import FunctionModal from './FunctionModal/Content';
import ConfirmDialogComponent from '../../components/ConfirmDialog/Content';
import type { FunctionRoleTableHeaders } from '../../utils/types';

interface AuthorizationPageProps {
  setNotifier?: any
}

type CurrentTableAction = {
    functionTable: boolean;
    functionRoleTable: boolean;
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = ({setNotifier}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [functionRole, setFunctionRole] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogAction, setDialogAction] = useState('');
  const [currentTable, setCurrentTable] = useState<CurrentTableAction>({functionTable: false, functionRoleTable:false});
  const [objectAction, setObjectAction] = useState<any>();

  // function role 
  const navigate = useNavigate();

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} user ${userId}`);
  };

  const handlePermissionAction = (action: string, permission:any) => {
    console.log(action)
    if(action === 'delete') {
      setShowDialog(true);
      setDialogMessage(`Do you want to ${action} the Function ${permission.function_id}`);
      setDialogTitle(`${action} function ${permission.function_id}`);
    } else if(action === 'edit') {
      setShowModal(true);
    }
    setDialogAction(action);
    setCurrentTable({functionTable: true, functionRoleTable : false})
    setObjectAction(permission)
  };

  const handleNewUser = () => {
    console.log('Opening new user modal');
  };

  const handleNewFunction = () => {
    setShowModal(true)
  };

  const handleNewFunctionRole = () => {

  }

  const handleSaveFunction = (newFunction: any) => {
    setPermissions((prev) => {
        if(dialogAction === 'edit') {
          return prev.filter((f) => f.function_id != objectAction.function_id).concat(newFunction);
        } else {
          return [...prev, newFunction];
        }
    })
  }

  const handleFunctionRoleAction = (action: string, function_role_id: number) => {

  }

  const handleFunctionTableDelete = async() => {
    try {
      const response = await deleteFunction(objectAction);
      if(response.data && response.ok) {
        // remove the object out of the function list
        setPermissions((prev) => prev.filter((f) => f.function_id != objectAction.function_id));
      }  else if(response.status === 403){
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
      throw e;
    }
  }

  const handleConfirmDialog = async (confirm: boolean) => {
    if(confirm) {
        try {
            if(currentTable.functionTable && !currentTable.functionRoleTable) {
              await handleFunctionTableDelete();
            }
        } catch(e) {
          
        }
        setShowDialog(false)
    } else {
      console.log('failed')
      setShowDialog(false)
    }
  }

  const fetchAllFunction = async () => {
    try {
        const response = await getAllFunction();
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

  const loadFunctionRole = async () => {
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
            setFunctionRole(response.data);
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
    fetchAllFunction();
    loadFunctionRole();
  }, [])

  const sortFunctionRole = (roleType: string, showUpIcon: boolean) => {
    console.log(roleType)
    if(showUpIcon) {
      const sortedRow = [...functionRole].sort((a,b) => {
        // if function_id of a - function id of b < 0 => mean a comes before b
        if(roleType === 'Function ID') {
          return a.function.function_id - b.function.function_id
        } else if(roleType === 'Created At'){
          return Date.parse(a.createdAt) - Date.parse(b.createdAt);
        } else if(roleType === 'Modified At') {
          return Date.parse(a.modifiedAt) - Date.parse(b.modifiedAt);
        }
        return a.role.role > b.role.role ? -1 : 1
      })
      setFunctionRole(sortedRow)
    } else {
      const sortedRow = [...functionRole].sort((a,b) => {
        // if function_id of a - function id of b < 0 => mean a comes before b
        if(roleType === 'Function ID') {
          return b.function.function_id - a.function.function_id
        } else if(roleType === 'Created At'){
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        } else if(roleType === 'Modified At') {
          return Date.parse(b.modifiedAt) - Date.parse(a.modifiedAt);
        }
        return b.role.role > a.role.role ? -1 : 1
      })
      setFunctionRole(sortedRow)
    }
  }

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
          <FunctionRoleTableComponent sortFunctionRole={sortFunctionRole} handleFunctionRoleAction={handleFunctionRoleAction} handleNewFunctionRole={handleNewFunctionRole} functionRole={functionRole}/>
        </div>
      )}
      <FunctionModal data={objectAction} action={dialogAction} setNotifier={setNotifier} show={showModal} onSave={handleSaveFunction} onHide={() => setShowModal(false)}/>
      <ConfirmDialogComponent dialogMessage={dialogMessage} dialogTitle={dialogTitle} show={showDialog} action={handleConfirmDialog}/>
    </div>
  );
};

export default AuthorizationPage;