import React, { useEffect, useState, useRef } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import APIENDPOINT from "../../../api/apiEndpoint.jsx";
import { Upload } from "antd";

import "antd/dist/antd.css";
import { InboxOutlined } from "@ant-design/icons";

function FileUploader({ uploadFunction }) {
  const [file, setFile] = useState();

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData();
    fd.append("file", file);
    fd.append("file_name", file.name);
    uploadFunction(fd);
    
  }

  const { Dragger } = Upload;

  return (
    <div className="ddUpload">
      <form onSubmit={handleSubmit}>
        <Dragger
          multiple={false}
          maxCount={1}
          onChange={(e) => {
            setFile(e.file.originFileObj);
          }}
          onDrop={(e) => {
            setFile(e.dataTransfer.files[0].originFileObj);
          }}
          customRequest={() => {}}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <button className="ddUpload--button" type="submit" disabled={!file && true}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUploader;
