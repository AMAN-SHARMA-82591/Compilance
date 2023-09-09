import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function LoginAdminDropDownMenu({handleClosePopover}) {


    function handleLogout() {
        localStorage.removeItem('token');
        window.location.reload(false);
    }
    return (
        <>
            <div className="admin-drop-down-menu">
                <div className="drop-down-menu-admin-items">
                    <div className="drop-down-sec-logo-cont1"></div>
                    <div className="drop-down-sec-logo-cont2">
                        <h1>Vicky Kaushal</h1>
                        <p>Admin</p>
                    </div>
                    <div className="drop-down-sec-help-cont3">
                        <p>Help </p>
                        <HelpOutlineIcon fontSize="small" />
                    </div>
                </div>
                <div className="drop-down-menu-admin-text-items">
                    <p>Delhi Land & Finance Ltd.</p>
                </div>
                <List>
                    <ListItem onClick={handleClosePopover} button={true} component={Link} to='/home'>Home</ListItem>
                    <ListItem onClick={handleClosePopover} button={true} component={Link} to='/profile'>Profile</ListItem>
                    <ListItem onClick={handleLogout} button={true} style={{color: 'red' , fontWeight: 'bold'}}>Logout</ListItem>
                </List>
                
            </div>
        </>
    )
}

export default LoginAdminDropDownMenu
