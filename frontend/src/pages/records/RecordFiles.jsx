import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router";
import APIENDPOINT from "../../api/apiEndpoint.jsx";
import { getRecordFiles } from "./apiCalls/recordsApiCalls";
import { useRecordContext } from "./context/RecordContextHook";
import DocumentElement from "./recordDocuments/DocumentElement";
import DocumentsContainer from "./recordDocuments/DocumentsContainer";
import FileUploader from "./recordDocuments/FileUploader";

function RecordFiles() {
  const token = JSON.parse(localStorage.getItem("authTokens"));

  const [files, setFiles] = useState([]);
  const { upload } = useOutletContext();
  const { patientId } = useRecordContext();

  const handleUpload = async (fileData) => {
    fileData.append("patient", patientId);
    const response = await fetch(
      `${APIENDPOINT}/records/patients-records-files/${patientId}/`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens"))?.access),
        },
        body: fileData,
      }
    ).then((response) => {
      console.log(response);
      if (response.ok) {
        return response;
      }
    });

    const newFile = await response.json();
    setFiles((prev) => [...prev, newFile]);
  };

  const getFiles = async () => {
    const data = await getRecordFiles(patientId);
    setFiles(data);
  };

  useEffect(() => {
    getFiles();
  }, [patientId]);

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      {upload && <FileUploader uploadFunction={handleUpload} />}
      <div className="files_box">
        <div className="fileHeader">
          <span className="recordElement--name ">name</span>
          <span className="recordElement">date uploaded</span>
          <span className="recordElement"> uploaded by</span>
          <span className="recordElement"> open</span>
          <span className="recordElement"> file type</span>
        </div>
        <DocumentsContainer>
          {files?.map((file) => {
            return (
              <DocumentElement
                key={file.id}
                name={file?.file_name}
                dateUploaded={file?.date_uploaded}
                uploadedBy={file?.uploading_staff_name}
                file={file?.file}
              />
            );
          })}
        </DocumentsContainer>
      </div>
    </div>
  );
}

export default RecordFiles;
