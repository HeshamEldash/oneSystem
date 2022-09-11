import React, { useState } from "react";
import "./records.css";
import UpdateIcon from "@mui/icons-material/Update";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RecordEntry from "./RecordEntry";
import RecordUpdate from "./RecordUpdate";

function RecordDisplay(props) {
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [mount, setMount] = useState(true);


  const handleOpen = (address) => {
    setOpen(true);
    setMount(true)
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="record">
      <div className="record__header">
        <span>
          created by: {props.author} @ {props.dateCreated}{" "}
        </span>
        <span>
          shared:
          {props.isPublic?.toString()}
        </span>
      </div>

      <div className="record_body">
        <div className="record__entry_container">
          <span className="record__entry_begining">Hx:</span>
          {props.history}
        </div>

        <div className="record__entry_container">
          <span className="record__entry_begining">Ex:</span>
          {props.examination}
        </div>

        <div className="record__entry_container">
          <span className="record__entry_begining">Dx:</span>
          {props.diagnosis}
        </div>

        <div className="record__entry_container">
          <span className="record__entry_begining">Mx:</span>
          {props.plan}
        </div>
      </div>
      <div className="records__actions_container">any actions</div>

      {props.actions && (
        <div className="records__actions_container">any actions</div>
      )}

      <div className="record_display__buttons_container">
        <Tooltip title={"change_the_share_status"}>
          <ShareIcon className="action_button" />
        </Tooltip>

        <Tooltip title={"update_record"}>
          <UpdateIcon
            className="action_button"
            onClick={() => {
              setUpdating(true);
              handleOpen(true);
            }}
          />
        </Tooltip>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted={mount}
      >
        <Box sx={style}>
          <RecordUpdate
            recordId={props.id}
            history={props.history}
            examination={props.examination}
            diagnosis={props.diagnosis}
            plan={props.plan}
            isPublic={props.isPublic}
            closeModal={() => handleClose()}
          />
          <input 
          className="discard_button position" type="button" value={"discard"}
            onClick={()=>{
                setMount(false)
                handleClose()
                
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default RecordDisplay;
