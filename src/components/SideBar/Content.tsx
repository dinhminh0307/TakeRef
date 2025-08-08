import React, { useState } from 'react';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

interface SidebarProps {
  onItemClick?: (itemId: string) => void;
  activeItem?: string;
}

const SideBar: React.FC<SidebarProps> = ({ 
  onItemClick, 
  activeItem = 'citation' 
}) => {
  const [selectedItem, setSelectedItem] = useState<string>(activeItem);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'citation',
      label: 'Citation',
      icon: 'bi-bookmark-fill',
      isActive: true
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: 'bi-chat-dots'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'bi-arrow-left-right'
    }
  ];

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    if (onItemClick) {
      onItemClick(itemId);
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
                onClick={() => handleItemClick(item.id)}
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