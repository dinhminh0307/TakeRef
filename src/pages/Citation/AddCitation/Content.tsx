import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpiner/Content';
import { saveCitationRequest, sendRmitHarvardWebsiteCitationRequest } from './apis/CitationAPI';
import FormattedCitation, { formatCitationWithItalics, type LLMCitationResponse} from '../../../utils/format/format';
import type { CitationType } from '../../../utils/interfaces/CitationType';
import { getAllCitationType } from '../CitationType/apis/GetCitationTypes';
import type { CitationResponse } from '../../../utils/interfaces/CitationResponse';

interface AddCitationModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (citationRequest: any) => void;
  setNotifier: any;
}


const AddCitationModal: React.FC<AddCitationModalProps> = ({ show, onHide, onSave, setNotifier }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [citationResult, setCitationResult] = useState('');
  const [italicSentences, setItalicSentences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [citationTypes, setCitationTypes] = useState<CitationType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState(0);


  const fetchCitationType = async () => {
    try {
        const data = await getAllCitationType();
        setCitationTypes(data);
        console.log(citationTypes)
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCitationType()
  }, [])

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
      const response: LLMCitationResponse = await sendRmitHarvardWebsiteCitationRequest(body);
      setCitationResult(response.content);
      setItalicSentences(response.italic_sentence || []);
      setTitle(response.title);
    } catch (error) {
      if(error instanceof Error) {
        console.error('Error generating citation:', error);
        setNotifier({
          type: 'danger',
          message: error instanceof Error ? error.message : 'An error occurred'
        })
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!citationResult) {
        alert('Please generate a citation first by clicking the "Cite" button');
        return;
      }

      // Save the formatted citation with italics
      const formattedCitation = formatCitationWithItalics(citationResult, italicSentences);
      const body = {
        citation_id: 0,
        title: title,
        content: citationResult,
        url: url,
        type: selectedType,
        typeid: selectedTypeId,
        created_at: new Date().toISOString(),
        modified_at: null,
      }
      const response : CitationResponse = await saveCitationRequest(body);
      onSave(response);

      // set notifier
      setNotifier({
        type: 'success',
        message: 'Saved successfully'
      })

      // Reset form
      setUrl('');
      setSelectedType('');
      setCitationResult('');
      setItalicSentences([]);
      onHide();
    } catch(e) {
      if(e instanceof Error) {
        setNotifier({
          type: 'danger',
          message: e.message
        })
      }
    }
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
                  onChange={(e) => {
                    setSelectedType(e.target.value)
                    const selectedTypeObj = citationTypes.find(
                      type => {
                        return type.name === e.target.value
                      }
                    )
                    setSelectedTypeId( selectedTypeObj ? selectedTypeObj.type_id : 0);
                  }}
                  required
                >
                  <option value="">Select citation type...</option>
                  {citationTypes.map((type) => (
                    <option key={type.type_id} value={type.name}>
                      {type.name}
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