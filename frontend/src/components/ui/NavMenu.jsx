import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Outlet, NavLink, useParams} from "react-router-dom"

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
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        // onMouseOver={handleClick}
        onMouseLeave={handleClose}
        // onMouseOut={handleClose}

      >
        {props?.buttonName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
    
        {props?.menyItems?.map((item)=>{
             
            return <MenuItem
              
            key = {item.name}
            onClick={()=>{
                item.func()
                handleClose()
            }}

            >
                {item.name}
            </MenuItem>

        })}
        {props.children}
      </Menu>
    </div>

  )
}

export default NavMenu
