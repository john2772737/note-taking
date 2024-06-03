import React, { useState, useEffect } from "react";
import "./LandingPage.css"; // You can add some additional styling in this CSS file
import { useFirebase } from "../utils/context";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for modal
import { Button, Modal } from "react-bootstrap"; // Importing Bootstrap components for the modal
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const { currentUser } = useFirebase();
  const firebaseuid = currentUser.uid;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documents, setDocuments] = useState([]);
  console.log(firebaseuid);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
        data:""
      })
      .then(function (response) {
        console.log(response);
        toast.success("Document created successfully"); // Show a success message after saving the document
        fetchDocuments(firebaseuid);
        handleClose();
         // Close the modal after saving
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
  const handleDocument = (document) => {
    navigate(`/texteditor/${document}`); // Navigate to the document page
  };
  return (
    <div className="containerl">
      <Toaster />
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
