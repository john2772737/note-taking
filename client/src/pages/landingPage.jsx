import React, { useState } from 'react';
import './LandingPage.css'; // You can add some styling in this CSS file
import { useFirebase } from '../utils/context';
import axios from 'axios';

function LandingPage() {
  const { currentUser } = useFirebase();
  const firebaseuid = currentUser.uid;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState('');

  const handleCreateDocument = () => {
    setIsModalOpen(true);
  };

  const handleSaveDocument = () => {
    axios
      .post('http://localhost:5000/user/createDocument', {
        name: documentName,
        firebaseuid: firebaseuid,
      })
      .then(function (response) {
        console.log(response);
        setIsModalOpen(false); // Close the modal after saving
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCollaborate = () => {
    // Handle collaborate functionality
  };

  return (
    <div className="containerl">
      <div className="sidebar">
        <ul>
          <li onClick={handleCreateDocument}>Create Document</li>
          <li onClick={handleCollaborate}>Collaborate</li>
        </ul>
      </div>
      <div className="content">
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <input
                type="text"
                placeholder="Document Name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
              <button onClick={handleSaveDocument}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
