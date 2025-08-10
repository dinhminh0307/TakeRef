import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
}

const SideBar: React.FC<SidebarProps> = ({ 
  onItemClick, 
  activeItem 
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

  const handleItemClick = (item: SidebarItem) => {
    setSelectedItem(item.id);
    navigate(item.path);
    
    if (onItemClick) {
      onItemClick(item.id);
    }
  };

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: '200px', minHeight: '100vh' }}>
      <div className="p-2">
        <ul className="list-unstyled mb-0">
          {sidebarItems.map((item) => (
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
    </div>
  );
};

export default SideBar;