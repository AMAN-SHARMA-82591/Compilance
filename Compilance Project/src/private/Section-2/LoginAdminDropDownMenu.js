import React from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
function LoginAdminDropDownMenu() {
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
                <div className="drop-down-menu-admin-button-items">
                    <button>Manage Account</button>
                </div>
                <div className="drop-down-menu-admin-add-comp-items">
                    <AddCircleOutlineIcon />
                    <p> Add Another
                        Company</p>
                </div>
            </div>
        </>
    )
}

export default LoginAdminDropDownMenu
