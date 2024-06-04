const mongoose = require("mongoose");
const User = require("../models/user.models.js");
const Document = require("../models/document.models.js");
const createUser = async (req, res) => {
    try {
      const userReq = req.body;
      const user = await User.findOne({ email: userReq.email });
      if (user) {
        return res.status(200).json({ message: "User already exists.", user }); // Return the user if exists
      }
      const newUser = await User.create(userReq);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user." });
    }
  };
  

const createDocument = async (req, res) => {
  try {
    const documentReq = req.body;
    const document = await Document.findOne({ name: documentReq.name }); // Use findOne to find a single document
    if (document) {
      return res.status(400).json({ error: "Document already exists." });
    }
    const newDocument = await Document.create(documentReq);

    const user = await User.findOne({ firebaseuid: documentReq.firebaseuid });
    user.documents.push(newDocument._id);
    await user.save();

    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ error: "Failed to create document." });
  }
};

const getDocuments = async (req, res) => {
  const { firebaseuid } = req.params; // Extract firebaseuid from params

  try {
    // Find the user with the specified firebaseuid
    const user = await User.findOne({ firebaseuid });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Populate documents associated with the user
    await user.populate("documents");

    res.status(200).json(user.documents); // Send the populated documents
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to get documents." });
  }
};

const getDocumentData = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findOne({ _id: id });
    res.status(200).json(document.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to get document." });
  }
};

const updateDocumentData = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
      const document = await Document.findOneAndUpdate({ _id: id }, { data }, { new: true });
      // The { new: true } option ensures that you get the updated document back
  
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to update document." });
    }
  };
  
const getUser =async(req,res)=>{
    const { firebaseuid } = req.params; 
  
        try {
            const { uid } = req.params;
            const user = await User.findOne({ firebaseuid: uid });
            if (user) {
                res.json({ exists: true });
            } else {
                res.json({ exists: false });
            }
        }catch(error){
            res.status(500).json({ error: "Failed to get user." });
        }
}
module.exports = {
  createUser,
  createDocument,
  getDocuments,
  getDocumentData,
  updateDocumentData,
  getUser,
};
