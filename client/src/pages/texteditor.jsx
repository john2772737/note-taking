import { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import '../assets/styles.css'
import { io } from "socket.io-client"
import Navbar from "../component/Navbar2"

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
]

export default function TextEditor() {
  const { documentId } = useParams(); // Renaming to avoid conflict
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])



  
  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q)
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="container pt-20" ref={wrapperRef} ></div>
      
    </div>
  );
}