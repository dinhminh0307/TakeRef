import React, { useState } from 'react';
import SideBar from '../../components/SideBar/Content';
import AddCitationModal from './AddCitation/Content';

interface Citation {
  id: string;
  title: string;
  author: string;
  journal: string;
  year: number;
  type: string;
  status: 'Published' | 'In Review' | 'Draft';
  date: string;
}

const CitationPage: React.FC = () => {
  const [citations, setCitations] = useState<Citation[]>([
    {
      id: '1',
      title: 'Advanced Web Development Techniques',
      author: 'John Smith',
      journal: 'Web Development Quarterly',
      year: 2023,
      type: 'Journal Article',
      status: 'Published',
      date: '2023-10-15'
    },
    {
      id: '2',
      title: 'Modern CSS Grid Layouts',
      author: 'Sarah Johnson',
      journal: 'Frontend Magazine',
      year: 2023,
      type: 'Article',
      status: 'In Review',
      date: '2023-09-22'
    },
    {
      id: '3',
      title: 'JavaScript Performance Optimization',
      author: 'Mike Chen',
      journal: 'Tech Review',
      year: 2022,
      type: 'Conference Paper',
      status: 'Published',
      date: '2022-12-08'
    },
    {
      id: '4',
      title: 'Responsive Design Best Practices',
      author: 'Emily Davis',
      journal: 'Design Weekly',
      year: 2023,
      type: 'Blog Post',
      status: 'Draft',
      date: '2023-11-02'
    },
    {
      id: '5',
      title: 'API Security in Modern Applications',
      author: 'Robert Wilson',
      journal: 'Security Journal',
      year: 2023,
      type: 'Research Paper',
      status: 'Published',
      date: '2023-08-14'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSidebarClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    // Add navigation logic here
  };

  const handleNewCitation = () => {
    setShowAddModal(true);
  };

  const handleSaveCitation = (newCitation: { url: string; type: string; result: string }) => {
    // Create a new citation object
    const citation: Citation = {
      id: (citations.length + 1).toString(),
      title: `New Citation from ${new URL(newCitation.url).hostname}`,
      author: 'Unknown Author',
      journal: 'Unknown Journal',
      year: new Date().getFullYear(),
      type: newCitation.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      status: 'Draft',
      date: new Date().toISOString().split('T')[0]
    };

    setCitations([citation, ...citations]);
    console.log('New citation saved:', newCitation);
  };

  const handleAction = (action: string, citationId: string) => {
    console.log(`${action} citation ${citationId}`);
    // Add action logic here
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-warning text-dark';
      case 'In Review':
        return 'bg-warning text-dark';
      case 'Draft':
        return 'bg-light text-dark border';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar activeItem="citation" onItemClick={handleSidebarClick} />
      
      {/* Main Content */}
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
                  <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>TITLE</th>
                  <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>TYPE</th>
                  <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>STATUS</th>
                  <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>DATE</th>
                  <th className="px-4 py-3 fw-semibold text-muted border-0" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {citations.map((citation, index) => (
                  <tr key={citation.id} className={index < citations.length - 1 ? 'border-bottom' : ''}>
                    <td className="px-4 py-3 border-0">
                      <a 
                        href="#" 
                        className="text-primary text-decoration-none fw-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(`View citation: ${citation.title}`);
                        }}
                      >
                        {citation.title}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted border-0">{citation.type}</td>
                    <td className="px-4 py-3 border-0">
                      <span className={`badge rounded-pill px-3 py-1 ${getStatusBadgeClass(citation.status)}`} style={{ fontSize: '0.75rem' }}>
                        {citation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted border-0" style={{ fontSize: '0.875rem' }}>
                      {citation.date}
                    </td>
                    <td className="px-4 py-3 border-0">
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => handleAction('view', citation.id)}
                          title="View"
                          style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                        >
                          <i className="bi bi-check-lg text-success"></i>
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => handleAction('edit', citation.id)}
                          title="Edit"
                          style={{ width: '24px', height: '24px', border: 'none', backgroundColor: 'transparent' }}
                        >
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => handleAction('delete', citation.id)}
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

      {/* Add Citation Modal */}
      <AddCitationModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleSaveCitation}
      />
    </div>
  );
};

export default CitationPage;