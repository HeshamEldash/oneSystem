import React, { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import externalLink from "../../../assets/images/externalLink.svg";
import "../../../svg.css";
import NewWindow from "./NewWindow";

function DocumentElement(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [fileType, setFileType] = useState("");
  const [open, setOpen] = useState(false);
  const uploadDate = new Date(props.dateUploaded)
    .toLocaleString()
    .split(",")[0];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleOpen() {
    setOpen(true);
  }
  function getFileType(file) {
    const type = file?.split(/[#?]/)[0].split(".").pop().trim();
    if (type === "png") {
      return "image";
    } else if (type === "pdf") {
      return "pdf";
    }
  }

  useEffect(() => {
    const type = getFileType(props.file);
    setFileType(type);
  }, [props.file]);

  return (
    <div className="file_component_row">
      <span className="recordElement--name">{props.name}</span>
      <span className="recordElement">{uploadDate}</span>

      <span className="recordElement"> {props.uploadedBy}</span>
      <span className="recordElement">
        <img
          className="svg20 svg_cursor"
          src={externalLink}
          onClick={() => handleOpen()}
        />
        <a
          href={props.file}
          without="true"
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: "red" }}
        >
          {" "}
          <img
            className="svg20 svg_cursor"
            src={externalLink}
            // onClick={() => handleOpen()}
          />
        </a>
      </span>

      <span className="recordElement"> {fileType}</span>

      {open && (
        <NewWindow closeDocument={setOpen}>
          {props.file}

          {fileType === "pdf" && (
            <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          )}

          {fileType === "image" && <img src={props.file} />}
        </NewWindow>
      )}
    </div>
  );
}

export default DocumentElement;