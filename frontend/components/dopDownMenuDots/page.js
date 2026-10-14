import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DropdownMenuDots({ type, setShowCard }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = Boolean(anchorEl);
  const params = new URLSearchParams(searchParams.toString());
  let trueToShowAssocTable = params.get("revealAssocTable") == 'true'
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
    params.delete("revealAssocTable")
    router.push(`?${params.toString()}`)
  }

  function revealAssocConditionsOrActionsTable() {
    handleClose()
    if (trueToShowAssocTable) {
      params.set("revealAssocTable", "false");
      router.push(`?${params.toString()}`)
    } else {
      params.set("revealAssocTable", "true");
      router.push(`?${params.toString()}`)
    }
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
        <MenuItem onClick={revealAssocConditionsOrActionsTable} component="a">
          {trueToShowAssocTable ? 'View Body Info' : `View Assoc ${type == 'Action' ? 'Conditions' : 'Actions'}`}
        </MenuItem>
      </Menu>
    </div>
  );
}
