import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function LoginAdminDropDownMenu() {

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
                <Button onClick={handleLogout} style={{ margin: '20px 0px' }} size='small' variant='outlined'>
                    Logout
                </Button>
            </div>
        </>
    )
}

export default LoginAdminDropDownMenu
