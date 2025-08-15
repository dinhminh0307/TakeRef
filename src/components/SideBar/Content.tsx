import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendLogoutRequest } from '../../pages/Auth/apis/AuthAPI';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isActive?: boolean;
}

interface SidebarProps {
  onItemClick?: (itemId: string) => void;
  activeItem?: string;
  onLogout?: () => void;
  setNotifier?: any,
  setLoading?:any,
  admin?: boolean
}

const SideBar: React.FC<SidebarProps> = ({ 
  onItemClick, 
  activeItem,
  onLogout,
  setNotifier,
  setLoading,
  admin
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active item based on current path if not provided
  const getCurrentActiveItem = () => {
    if (activeItem) return activeItem;
    
    const currentPath = location.pathname;
    const item = sidebarItems.find(item => item.path === currentPath);
    return item?.id || 'citation';
  };

  const [selectedItem, setSelectedItem] = useState<string>(getCurrentActiveItem());

  const sidebarItems: SidebarItem[] = [
    {
      id: 'citation',
      label: 'Citation',
      icon: 'bi-bookmark-fill',
      path: '/',
      isActive: true
    },
    {
      id: 'citationType',
      label: 'Citation Types',
      icon: 'bi-collection',
      path: '/citation-types'
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: 'bi-chat-dots',
      path: '/courses'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'bi-arrow-left-right',
      path: '/transactions'
    }
  ];

  // Filter sidebar items based on admin status
  const filteredSidebarItems = sidebarItems.filter(item => {
  // Always show citation for all users
  if (item.id === 'citation') {
    return true;
  }
  
  // Hide courses, citationType, and transactions when admin is false
  if (item.id === 'courses' || item.id === 'citationType' || item.id === 'transactions') {
    return admin === true;
  }

  return true;
});

  const handleItemClick = (item: SidebarItem) => {
    setSelectedItem(item.id);
    navigate(item.path);
    
    if (onItemClick) {
      onItemClick(item.id);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      if (onLogout) {
        onLogout();
      }
      const response = await sendLogoutRequest();
      // Clear any stored auth data
      localStorage.removeItem('isLogin');
      setNotifier(
        {
          type: 'success',
          message: 'Logout successfully'
        }
      )
      setLoading(false);
      navigate('/login');
    } catch(e) {
      setNotifier(
        {
          type: 'danger',
          message: 'Logout not successfully'
        }
      )
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: '200px', minHeight: '100vh' }}>
      {/* Main navigation items */}
      <div className="p-2 flex-grow-1">
        <ul className="list-unstyled mb-0">
          {filteredSidebarItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                className={`btn w-100 text-start d-flex align-items-center py-2 px-3 border-0 rounded ${
                  selectedItem === item.id
                    ? 'text-dark fw-semibold'
                    : 'btn-light text-muted'
                }`}
                onClick={() => handleItemClick(item)}
                style={{
                  backgroundColor: selectedItem === item.id ? '#c8d64b' : 'transparent',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem'
                }}
              >
                <i className={`${item.icon} me-2`} style={{ fontSize: '14px' }}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button at the bottom */}
      <div className="p-2 border-top">
        <button
          className="btn w-100 text-start d-flex align-items-center py-2 px-3 border-0 rounded btn-light text-muted"
          onClick={handleLogout}
          style={{
            transition: 'all 0.2s ease',
            fontSize: '0.9rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc3545';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6c757d';
          }}
        >
          <i className="bi-box-arrow-right me-2" style={{ fontSize: '14px' }}></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;