import React, { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpiner/Content';
import { sendRmitHarvardWebsiteCitationRequest } from '../apis/CitationAPI';
import FormattedCitation, { formatCitationWithItalics, type CitationResponse } from '../../../utils/format/format';

interface AddCitationModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (citationRequest: any) => void;
}

interface CitationType {
  value: string;
  label: string;
}

const AddCitationModal: React.FC<AddCitationModalProps> = ({ show, onHide, onSave }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [citationResult, setCitationResult] = useState('');
  const [italicSentences, setItalicSentences] = useState<string[]>([]);
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

    const body = {
      "citationid": 0,
      "title": "",
      "typeid": 0,
      "type": "",
      "url": url
    }
    
    try {
      const response: CitationResponse = await sendRmitHarvardWebsiteCitationRequest(body);
      setCitationResult(response.content);
      setItalicSentences(response.italic_sentence || []);
      setTitle(response.title);
    } catch (error) {
      console.error('Error generating citation:', error);
      alert('Error generating citation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!citationResult) {
      alert('Please generate a citation first by clicking the "Cite" button');
      return;
    }

    // Save the formatted citation with italics
    const formattedCitation = formatCitationWithItalics(citationResult, italicSentences);

    onSave({
      citation_id: 0,
      url: url,
      type: selectedType,
      type_id: 0,
      created_at: Date.now.toString,
      modified_at: null,
      result: formattedCitation
    });

    // Reset form
    setUrl('');
    setSelectedType('');
    setCitationResult('');
    setItalicSentences([]);
    onHide();
  };

  const handleClose = () => {
    setUrl('');
    setSelectedType('');
    setCitationResult('');
    setItalicSentences([]);
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Add New Citation: <span className="fw-normal">{title}</span></h5>
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
                      <LoadingSpinner size="sm" className="me-2" />
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
                <div
                  className="form-control"
                  style={{ 
                    backgroundColor: '#f8f9fa', 
                    minHeight: '100px',
                    padding: '12px'
                  }}
                >
                  {citationResult ? (
                    <FormattedCitation 
                      content={citationResult} 
                      italicSentences={italicSentences} 
                    />
                  ) : (
                    <span className="text-muted">Generated citation will appear here...</span>
                  )}
                </div>
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