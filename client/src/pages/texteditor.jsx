import { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import '../assets/styles.css'

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
  console.log(documentId)

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
  }, [])

  return <div className="container" ref={wrapperRef}></div>
}
