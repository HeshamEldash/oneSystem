import React from "react";
import useContextMenu from "./hooks/useContextMenu";

function ContextMenu({ children, options, targetId }) {
  const { contextRef, contextData } = useContextMenu(targetId);
  return (
    <div
      className="contextMenu"
      ref={contextRef}
      style={{
        display: `${contextData.visible ? "block" : "none"}`,
        left: contextData.posX,
        top: contextData.posY,
      }}
    >
      {children}
      <div>
      
        {options?.map((option) => (
          <li key={option}>{option}</li>
        ))}

      </div>
    </div>
  );
}

export default ContextMenu;
