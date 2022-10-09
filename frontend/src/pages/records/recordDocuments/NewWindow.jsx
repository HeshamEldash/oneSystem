import React, { useEffect, useState, useRef } from "react";
import * as ReactDOM from "react-dom";

function NewWindow(props) {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(null);
  useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      props.closeDocument(false);
    };

    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        "",
        "",
        "width=800,height=600,left=200,top=200"
      );
      // Append container
      newWindow.current.document.body.appendChild(container);

      // Save reference to window for cleanup
      const curWindow = newWindow.current;
      curWindow.addEventListener("beforeunload", handleTabClose);


      // Return cleanup function
      return () => {
        //   window.removeEventListener('beforeunload', handleTabClose);

        curWindow.close();
      };
    }
  }, [container]);

  return container && ReactDOM.createPortal(props.children, container);
}

export default NewWindow;
