import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";
import APIENDPOINT from "../../utils/api_calls/apiEndpoint";
// import { Document, Page } from 'react-pdf';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import ResultsBox from "../../components/ResultsBox";
import { useParams, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import DocumentElements from "./recordDocuments/DocumentElements";
import DocumentsContainer from "./recordDocuments/DocumentsContainer";

// function NewWindow(props) {
//   const [container, setContainer] = useState(null);
//   const newWindow = useRef(null);
//   useEffect(() => {
//     // Create container element on client-side
//     setContainer(document.createElement("div"));
//   }, []);

//   useEffect(() => {
//     // When container is ready
//     if (container) {
//       // Create window
//       newWindow.current = window.open(
//         "",
//         "",
//         "width=600,height=400,left=200,top=200"
//       );
//       // Append container
//       newWindow.current.document.body.appendChild(container);

//       // Save reference to window for cleanup
//       const curWindow = newWindow.current;

//       // Return cleanup function
//       //   return () => curWindow.close();
//     }
//   }, [container]);

//   return container && ReactDOM.createPortal(props.children, container);
// }

function RecordFiles(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [files, setFiles] = useState([]);
  const [fileType, setFileType] = useState("pdf");


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const testGetRecordFile = async () => {
    const response = await fetch(
      `${APIENDPOINT}/records/patients-records-files/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setFiles(data);
    }
  };

  useEffect(() => {
    testGetRecordFile();
  }, []);

  return (
    <div className="pruimary--page-box">
      <div className="testingfileHeader">
        <span className="recordElement">name</span>
        <span className="recordElement">date uploaded</span>
        <span className="recordElement"> uploaded by</span>
        <span className="recordElement">  open</span>
        <span className="recordElement">  file type</span>


      </div>
      <DocumentsContainer>
      {files?.map((file)=>{
        return <DocumentElements
          key={file.id}
          name={file?.file_name}
          dateUploaded={file?.date_uploaded}
          uploadedBy={file?.uploaded_by_staff}
          file = {file?.file}

        />
      })}

      </DocumentsContainer>
    </div>
  );
}

export default RecordFiles;
