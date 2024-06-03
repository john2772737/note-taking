import React from 'react';

function DocumentList({ documents }) {
  // Check if documents is undefined or not an array
  if (!Array.isArray(documents)) {
    return <div className="document-list">No documents available</div>;
  }

  return (
    <div className="document-list">
      {documents.map(document => (
        <div key={document.id} className="document-item">
          <p>{document.name}</p>
          {/* Render other properties of the document here */}
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
