import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import '../assets/styles.css';
import { io } from "socket.io-client";
import logo from '../assets/Logo.png';
import Navbar from "../component/Navbar";
import { IoClose } from "react-icons/io5";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  [{ size: ['small', false, 'large', 'huge'] }]
];

const SAVE_INTERVAL_MS = 1000;

export default function TextEditor() {
  const { documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [showDocumentId, setShowDocumentId] = useState(false);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);

  const handleShowDocumentId = () => {
    setShowDocumentId(true);
    // setTimeout(() => {
    //   setShowDocumentId(false);
    // }, 10000);
  };
  
  const closePopup = () => {
    setShowDocumentId(false);
  }

  return (
    <div className="container pt-20" ref={wrapperRef}>
      {quill && (
        <>
          <Navbar />
          <button className="floating-button"  onClick={handleShowDocumentId}>
            Share Document
          </button>
          {showDocumentId && (
            <div className="floating-button h-[200px] w-100px">
              <p className="w-[150px]">
                Share this Document by copying this document ID
              </p>
              <br />
              <p>Document ID:</p>
              {documentId}
              <button className="absolute right-2 top-2" onClick={closePopup}><IoClose size={22} /></button>
            </div>
          )}
          <button className="floating-button left-10 w-[140px]">
            Delete Note
          </button>
        </>
      )}
      
    </div>
  );
}
