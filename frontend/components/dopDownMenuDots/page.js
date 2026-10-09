import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DropdownMenuDots() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "#A411D9" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component="a" href="/profile">
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/profile">
          View Assoc Actions/Conditions
        </MenuItem>
      </Menu>
    </div>
  );
}
