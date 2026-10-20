import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import SecurityIcon from "@mui/icons-material/Security"
import { redirect } from 'next/navigation';
import { ROUTES } from '@/routes';
import { auth } from '@/auth';

export default function ProfileDropdown({ userRole }) {
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
                <MenuItem onClick={() => {
                    handleClose()
                    redirect(ROUTES.PROFILE)
                }}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    redirect(ROUTES.TIMELINE)
                }}>
                    <ListItemIcon>
                        <TimelineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Timeline</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    redirect(ROUTES.PERMISSION_FORM)
                }}>
                    <ListItemIcon>
                        <SecurityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{userRole == 'Doctor' ? 'Request Permission' : 'Grant Permission'}</ListItemText>
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
