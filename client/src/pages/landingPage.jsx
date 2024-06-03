import React, { useState } from 'react';
import './LandingPage.css'; // You can add some styling in this CSS file

function LandingPage() {
  const [selectedOption, setSelectedOption] = useState('create');

  const handleCreateDocument = () => {
''
  };

  const handleCollaborate = () => {
 ''
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li 
            className={selectedOption === 'create' ? 'active' : ''} 
            onClick={handleCreateDocument}
          >
            Create Document
          </li>
          <li 
            className={selectedOption === 'collab' ? 'active' : ''} 
            onClick={handleCollaborate}
          >
            Collaborate
          </li>
        </ul>
      </div>
      <div className="content">
       
      </div>
    </div>
  );
}

export default LandingPage;
