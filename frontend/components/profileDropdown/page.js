import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// Import the Person icon and any others you need
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import SecurityIcon from "@mui/icons-material/Security"

export default function ProfileDropdown() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    };

    function logout() {
        handleClose()
        signOut()
    }
    return (
        <div>
            <IconButton onClick={handleClick} color="info">
                <PersonIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Timeline</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SecurityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Grant Permission</ListItemText>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}
