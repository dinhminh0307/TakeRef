import React, { useState } from 'react';

interface AddCitationModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (citation: { url: string; type: string; result: string }) => void;
}

interface CitationType {
  value: string;
  label: string;
}

const AddCitationModal: React.FC<AddCitationModalProps> = ({ show, onHide, onSave }) => {
  const [url, setUrl] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [citationResult, setCitationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const citationTypes: CitationType[] = [
    { value: 'journal-article', label: 'Journal Article' },
    { value: 'book', label: 'Book' },
    { value: 'book-chapter', label: 'Book Chapter' },
    { value: 'conference-paper', label: 'Conference Paper' },
    { value: 'thesis', label: 'Thesis' },
    { value: 'webpage', label: 'Webpage' },
    { value: 'blog-post', label: 'Blog Post' },
    { value: 'report', label: 'Report' },
    { value: 'article', label: 'Article' }
  ];

  const handleCite = async () => {
    if (!url || !selectedType) {
      alert('Please fill in both URL and Type fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const mockCitation = generateMockCitation(url, selectedType);
      setCitationResult(mockCitation);
    } catch (error) {
      console.error('Error generating citation:', error);
      alert('Error generating citation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockCitation = (url: string, type: string): string => {
    // Mock citation generator - replace with actual citation API
    const domain = new URL(url).hostname;
    const currentDate = new Date().toISOString().split('T')[0];
    
    switch (type) {
      case 'journal-article':
        return `Author, A. (${new Date().getFullYear()}). "Sample Article Title from ${domain}." Journal Name, 10(2), 123-145. Retrieved from ${url}`;
      case 'webpage':
        return `Website Author. (${new Date().getFullYear()}). "Page Title." ${domain}. Retrieved ${currentDate}, from ${url}`;
      case 'book':
        return `Author, A. (${new Date().getFullYear()}). Book Title. Publisher. Retrieved from ${url}`;
      case 'conference-paper':
        return `Author, A. (${new Date().getFullYear()}). "Paper Title." In Conference Proceedings (pp. 123-130). ${domain}.`;
      default:
        return `Author, A. (${new Date().getFullYear()}). "Title from ${domain}." Retrieved ${currentDate}, from ${url}`;
    }
  };

  const handleSave = () => {
    if (!citationResult) {
      alert('Please generate a citation first by clicking the "Cite" button');
      return;
    }

    onSave({
      url,
      type: selectedType,
      result: citationResult
    });

    // Reset form
    setUrl('');
    setSelectedType('');
    setCitationResult('');
    onHide();
  };

  const handleClose = () => {
    setUrl('');
    setSelectedType('');
    setCitationResult('');
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Add New Citation</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body">
            <form>
              {/* URL Field */}
              <div className="mb-3">
                <label htmlFor="citationUrl" className="form-label fw-semibold">
                  URL <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="citationUrl"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              {/* Type Dropdown */}
              <div className="mb-3">
                <label htmlFor="citationType" className="form-label fw-semibold">
                  Citation Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="citationType"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  required
                >
                  <option value="">Select citation type...</option>
                  {citationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cite Button */}
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleCite}
                  disabled={!url || !selectedType || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-quote me-2"></i>
                      Cite
                    </>
                  )}
                </button>
              </div>

              {/* Citation Result */}
              <div className="mb-3">
                <label htmlFor="citationResult" className="form-label fw-semibold">
                  Citation Result
                </label>
                <textarea
                  className="form-control"
                  id="citationResult"
                  rows={4}
                  placeholder="Generated citation will appear here..."
                  value={citationResult}
                  readOnly
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-warning fw-semibold"
              onClick={handleSave}
              disabled={!citationResult}
            >
              Save Citation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCitationModal;