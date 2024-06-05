import React, { useState, useEffect } from "react";
import { useFirebase } from "../utils/context";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';

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
        data: null,
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
  const handleLogout =()=>{
    signOut(auth)
  }

  return (
    <div className="flex h-screen pt-20">
      <Navbar />
      <Toaster />
      <div className="w-200px p-20px shadow-xl hover:shadow-none bg-[#181616] border-r-2 border-[#808080] ">
        <ul className="list-none p-0 m-0">
          <li className="mb-10 my-4 px-5 py-2 cursor-pointer text-white bg-blue-500 rounded-lg transition-colors duration-300 hover:bg-white hover:text-black text-center" onClick={handleCreateDocument}>Create Note</li>
          <li className="my-4 px-5 py-2 cursor-pointer text-white bg-blue-500 rounded-lg transition-colors duration-300 hover:bg-white hover:text-black text-center" onClick={handleCollaborate}>Join</li>
        </ul>
        <button className="absolute text-xl text-white font-bold bottom-5 text-center ml-10" onClick={handleLogout}>Logout</button>
      </div>
      <div className="content bg-[#201C1C] flex-1 p-5 overflow-y-auto">
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
              className="document-item flex flex-col items-center justify-center text-center h-[150px] w-[150px] border border-gray-300 rounded-md p-2 relative overflow-hidden bg-white rounded-lg p-15 shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-none hover:transform hover:translate-y-[-5px]"
              onClick={() => handleDocument(document._id)}
            >
              <h3 className="absolute font-bold truncate w-full pl-2 px-2">{document.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LandingPage;