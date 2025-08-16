import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar/Content';
import { AuthorizationError, ResourceNotFoundError } from '../../../utils/exceptions/exception';
import LoadingSpinner from '../../../components/LoadingSpiner/Content';
import { useNavigate } from 'react-router-dom';
import { fetchAllSubscriptionType } from '../apis/SubscriptionTypeApi';
import AddSubscriptionTypeModal from './AddSubscriptionType/Content';

interface SubscriptionTypePageProps {
  setNotifier?: any
}

const SubscriptionTypePage: React.FC<SubscriptionTypePageProps> = ({setNotifier}) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const handleSaveSubscription = (newSubscription: {type_id: number, name: string; price: number; interval: number, active: boolean }) => {
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const getSubscriptionType = async () => {
    setLoading(true)
    try {
        const result = await fetchAllSubscriptionType();
        const roleId = result.headers.get('X-Role-Headers');
        console.log(roleId)
        if(roleId === '1') {
          setAdmin(true)
        } else {
          setAdmin(false)
        }

        if(result.ok && result.data) {
            console.log('Subscription data:', result.data);
          setSubscriptions(result.data);
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
    getSubscriptionType();
  }, [])

  const handleNewSubscription = () => {
    setShowAddModal(true);
    console.log('Opening new subscription modal');
  };

  const handleAction = (action: string, subscriptionId: number) => {
    console.log(`${action} subscription ${subscriptionId}`);
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar admin={admin} activeItem="subscriptions" onItemClick={handleSidebarClick} setNotifier={setNotifier} setLoading={setLoading}/>
      
      {loading ? (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>Subscription Plans</h1>
            <button 
              className="btn fw-semibold px-4 py-2 rounded-pill"
              onClick={handleNewSubscription}
              style={{ backgroundColor: '#ffc107', color: '#000', border: 'none' }}
            >
              <i className="bi bi-plus me-2"></i>
              New Subscription
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>PLAN NAME</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>PRICE</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>DURATION</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>AcTIVE</th>
                    <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                {subscriptions.map((subscription, index) => (
                    <tr key={subscription.type_id} className={index < subscriptions.length - 1 ? 'border-bottom' : ''}>
                    <td className="px-4 py-3 border-0">
                        <a 
                        href="#" 
                        className="text-primary text-decoration-none fw-medium"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log(`View subscription: ${subscription.name}`);
                        }}
                        >
                        {subscription.name}
                        </a>
                    </td>
                    <td className="px-4 py-3 border-0">
                        <span className="fw-semibold text-success">
                        ₫{subscription.price.toLocaleString('vi-VN')}
                        </span>
                    </td>
                    <td className="px-4 py-3 border-0">
                        <span className="badge bg-light text-dark border">
                        {subscription.interval} day{subscription.interval !== 1 ? 's' : ''}
                        </span>
                    </td>
                    <td className="px-4 py-3 border-0">
                        <span className={`badge ${subscription.active !== false ? 'bg-success' : 'bg-secondary'}`}>
                        {subscription.active !== false ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="px-4 py-3 border-0">
                        <div className="d-flex gap-1">
                        <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('toggle', subscription.type_id)}
                            title={subscription.active !== false ? 'Deactivate' : 'Activate'}
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                        >
                            <i className={`bi ${subscription.active !== false ? 'bi-toggle-on text-success' : 'bi-toggle-off text-muted'}`}></i>
                        </button>
                        <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('edit', subscription.type_id)}
                            title="Edit"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                        >
                            <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('view', subscription.type_id)}
                            title="View Details"
                            style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                        >
                            <i className="bi bi-eye text-info"></i>
                        </button>
                        <button
                            className="btn btn-sm p-1"
                            onClick={() => handleAction('delete', subscription.type_id)}
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

            {/* Empty State */}
            {subscriptions.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-credit-card text-muted" style={{ fontSize: '3rem' }}></i>
                <h5 className="text-muted mt-3">No subscription plans found</h5>
              </div>
            )}
          </div>
          
          <AddSubscriptionTypeModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSave={handleSaveSubscription}
            setNotifier={setNotifier}
          />
        </div>
      )}
    </div>
  );
};

export default SubscriptionTypePage;