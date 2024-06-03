import React, { useState } from 'react';
import './LandingPage.css'; // You can add some additional styling in this CSS file
import { useFirebase } from '../utils/context';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for modal
import { Button, Modal } from 'react-bootstrap'; // Importing Bootstrap components for the modal

function LandingPage() {
  const { currentUser } = useFirebase();
  const firebaseuid = currentUser.uid;

  const [showModal, setShowModal] = useState(false);
  const [documentName, setDocumentName] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSaveDocument = () => {
    axios
      .post('http://localhost:3000/user/createDocument', {
        name: documentName,
        firebaseuid: firebaseuid,
      })
      .then(function (response) {
        console.log(response);
        handleClose(); // Close the modal after saving
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreateDocument = () => {
    handleShow(); // Show the modal
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
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Document Name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveDocument}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default LandingPage;
