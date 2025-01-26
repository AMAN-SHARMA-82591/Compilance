import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function LoginAdminDropDownMenu({ handleClosePopover, data }) {


    function handleLogout() {
        localStorage.removeItem('token');
        window.location.reload(false);
    }
    return (
        <>
            <div className="admin-drop-down-menu">
                <div className="drop-down-menu-admin-items">
                    <div className="drop-down-sec-logo-cont2">
                        <h1>{data.name}</h1>
                        <p>{data.admin ? 'Admin' : 'User'}</p>
                    </div>
                    <div className="drop-down-sec-help-cont3">
                        <p>Help </p>
                        <HelpOutlineIcon fontSize="small" />
                    </div>
                </div>
                <List>
                    <ListItem onClick={handleClosePopover} button={true} component={Link} to='/home'>Home</ListItem>
                    {/* <ListItem onClick={handleClosePopover} button={true} component={Link} to='/profile'>Profile</ListItem> */}
                    <ListItem onClick={handleLogout} button={true} style={{ color: 'red', fontWeight: 'bold' }}>Logout</ListItem>
                </List>

            </div>
        </>
    )
}

export default LoginAdminDropDownMenu
