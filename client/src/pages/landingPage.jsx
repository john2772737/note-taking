import React, { useState, useEffect } from "react";
import "./LandingPage.css"; // You can add some additional styling in this CSS file
import { useFirebase } from "../utils/context";
import axios from "axios";
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
          <li onClick={handleCollaborate}>Join</li>
        </ul>
        <button className="absolute text-xl text-white font-bold bottom-5 text-center ml-10">Logout</button>
      </div>
      <div className="content bg-[#201C1C]">
        <h1 className="text-4xl font-bold text-white">NOTES</h1>

        {/* CREATE DOCU MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#201C1C ]">
            <div className="bg-[#181616] rounded-lg overflow-hidden shadow-lg max-w-md w-full">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-white">Create Document</h2>
              </div>
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Document Name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end p-4 border-t">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleCloseCreateModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSaveDocument}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JOIN BUTTON MODAL */}
        {showCollaborateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#201C1C ]">
            <div className="bg-[#181616] rounded-lg overflow-hidden shadow-lg max-w-md w-full">
              <div className="p-4 border-b">
                <h2 className="text-white text-xl font-semibold">Collaborate</h2>
              </div>
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Enter Collaboration Code"
                  value={collaborationCode}
                  onChange={(e) => setCollaborationCode(e.target.value)}
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end p-4 border-t">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleCloseCollaborateModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleJoinCollaboration}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render documents */}
        <div className="document-box flex flex-wrap gap-5 mt-5 h-50 w-full">
          {documents.map((document, index) => (
            <div
              key={index}
              className="document-item flex flex-col items-center justify-center h-40 w-40 border border-gray-300 rounded-md p-2"
              onClick={() => handleDocument(document._id)}
            >
              <h3 className="absolute font-bold -mt-30 text-left justify-left items-left">{document.name}</h3>
              <hr className="w-full -mt-20" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
