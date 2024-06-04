import React, { useState, useEffect } from "react";
import "./LandingPage.css"; // You can add some additional styling in this CSS file
import { useFirebase } from "../utils/context";
import axios from "axios";

import { Button, Modal } from "react-bootstrap"; // Importing Bootstrap components for the modal
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

function LandingPage() {
  const { currentUser } = useFirebase();
  const firebaseuid = currentUser.uid;
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCollaborateModal, setShowCollaborateModal] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [collaborationCode, setCollaborationCode] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseCollaborateModal = () => setShowCollaborateModal(false);
  const handleShowCollaborateModal = () => setShowCollaborateModal(true);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/getDocuments/${firebaseuid}`
      );
      const documents = response.data; // Assuming your server sends back an array of documents
      setDocuments(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      // Handle the error if needed
    }
  };

  useEffect(() => {
    // Assuming you have the firebaseuid available in your component
    fetchDocuments();
  }, []); // Fetch documents once when the component mounts

  const handleSaveDocument = () => {
    axios
      .post("http://localhost:3000/user/createDocument", {
        name: documentName,
        firebaseuid: firebaseuid,
        data: "",
      })
      .then(function (response) {
        console.log(response);
        toast.success("Document created successfully"); // Show a success message after saving the document
        fetchDocuments(firebaseuid);
        handleCloseCreateModal(); // Close the modal after saving
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCreateDocument = () => {
    handleShowCreateModal(); // Show the create document modal
  };

  const handleCollaborate = () => {
    handleShowCollaborateModal(); // Show the collaborate modal
  };

  const handleDocument = (documentId) => {
    navigate(`/texteditor/${documentId}`); // Navigate to the document page
  };

  const handleJoinCollaboration = () => {
    navigate(`/texteditor/${collaborationCode}`); // Navigate to the document page with the collaboration code
  };

  return (
    <div className="containerl pt-20">
      <Navbar />
      <Toaster />
      <div className="sidebar bg-[#181616] border-r-2 border-[#808080] ">
        <ul>
          <li onClick={handleCreateDocument}>Create Note</li>
          <li onClick={handleCollaborate}>Collaborate</li>
        </ul>
      </div>
      <div className="content bg-[#201C1C]">
        <h1 className="text-4xl font-bold text-white">NOTES</h1>
        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
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
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveDocument}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showCollaborateModal} onHide={handleCloseCollaborateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Collaborate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Enter Collaboration Code"
              value={collaborationCode}
              onChange={(e) => setCollaborationCode(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCollaborateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleJoinCollaboration}>
              Join
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Render documents */}
        <div className="document-box">
          {documents.map((document, index) => (
            <div
              key={index}
              className="document-item"
              onClick={() => handleDocument(document._id)}
            >
              <h3>{document.name}</h3>
              {/* Render other document information here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
