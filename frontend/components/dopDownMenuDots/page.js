import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DropdownMenuDots({ type, setShowCard }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function closeActionOrConditionCard() {
    handleClose()
    setShowCard({
      id: "",
      type: "", // action - condition
      isShowing: false
    })
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: `${type == 'Action' ? '#A411D9' : '#23BAE7'}` }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={closeActionOrConditionCard} component="a">
          Close
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="#">
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="#">
          {`View Assoc ${type}s`}
        </MenuItem>
      </Menu>
    </div>
  );
}
