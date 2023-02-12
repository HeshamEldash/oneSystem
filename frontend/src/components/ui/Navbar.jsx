import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import "../ui/ui.css"


function Navbar({ children }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);




  return (
    <div className="main-navbar " >
      <div className="main-navbar__links">


        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          {/* icon from heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>


        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
                {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isNavExpanded}
        // onClick={handleClose}
      > */}


          <ul>
            {children?.map((item, index) => {
              return (
                <li
                  key={index}
                  className={
                    isNavExpanded ? "navlink_item--expanded" : "navlink_item"
                  }
                >
                  {item}
                </li>
              );
            })}
          </ul>

          
        {/* </Backdrop> */}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
