import React from "react";

function Circle(props) {
  return (


    <div className="circle__background">
      <div className="circle">
        <span className="circle__child"> {props.children}</span>
      </div>
    </div>
  );
}

export default Circle;


    // <svg width="100%" height="100%" viewBox="0 0 38 38" class="donut">
    // <circle class="donut-hole" cx="19" cy="19" r="15.91549430918954">

    // </circle>
    // <circle class="donut-ring" cx="19" cy="19" r="15.91549430918954">

    // </circle><circle class="donut-segment" data-testid="donut-segment" cx="19" cy="19" r="15.91549430918954" stroke-dasharray="10.843373493975903, 89.1566265060241" stroke-dashoffset="25" stroke="#3DB0F7">
    // </circle>
    // </svg>