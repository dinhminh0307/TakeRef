import React from "react";

export interface LLMCitationResponse {
  content: string;
  italic_sentence: string[];
  title: string;
}

// Utility function to format citation with italics
export function formatCitationWithItalics(content: string, italicSentences: string[]) {
  if (!content || !italicSentences || italicSentences.length === 0) {
    return content;
  }

  let formattedContent = content;
  
  // Sort by length (longest first) to avoid partial replacements
  const sortedItalicSentences = [...italicSentences].sort((a, b) => b.length - a.length);
  
  sortedItalicSentences.forEach(sentence => {
    if (sentence && formattedContent.includes(sentence)) {
      formattedContent = formattedContent.replaceAll(sentence, `<em>${sentence}</em>`);
    }
  });
  
  return formattedContent;
};

// Component to render formatted citation
const FormattedCitation: React.FC<{ content: string; italicSentences?: string[] }> = ({ 
  content, 
  italicSentences = [] 
}) => {
  const formattedContent = formatCitationWithItalics(content, italicSentences);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default FormattedCitation;