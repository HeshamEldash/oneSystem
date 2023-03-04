import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Outlet, NavLink, useParams } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClickAwayListener, MenuList, Paper, Popper } from "@mui/material";

function NavMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={
        <KeyboardArrowDownIcon
        sx={{marginInlineStart:"8px"}}
         />
         }
        sx={{ color: "white", paddingInline:"2px" }}
        disableElevation={true}
      >
        {props?.buttonName}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper
                  sx={
            {
              boxShadow:"var(--deepShadow)",
              backgroundColor:"white",
              padding:"10px",
              fontWeight:"bold"
            }
          }
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              id="basic-menu"
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transitionDuration={2}
            >
              {props?.menuItems?.map((item) => {
                return (
                  <MenuItem
                    key={item.name}
                    onClick={() => {
                      item.func();
                      handleClose();
                    }}
                    divider

                  >
                    {item.name}
                  </MenuItem>
                );
              })}
              {props.children}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

export default NavMenu;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { Outlet, NavLink, useParams } from "react-router-dom";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { MenuList } from "@mui/material";

// function NavMenu(props) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button

//         id="basic-button"
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//         endIcon={<KeyboardArrowDownIcon />}
//         sx={{ color: "white" }}

//       >
//         {props?.buttonName}
//       </Button>

//       <MenuList
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//         transitionDuration={2}
//       >
//         {props?.menuItems?.map((item) => {
//           return (

//               <MenuItem
//                 key={item.name}
//                 onClick={() => {
//                   item.func();
//                   handleClose();
//                 }}
//               >
//                 {item.name}
//               </MenuItem>

//           );
//         })}
//         {props.children}
//       </MenuList>
//     </div>
//   );
// }

// export default NavMenu;
