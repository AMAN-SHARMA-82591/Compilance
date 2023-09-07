import React, { useState, useEffect, useRef } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import AlarmIcon from '@mui/icons-material/Alarm';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Button from '@mui/material/Button'
import '../../App.css'
import LoginAdminDropDownMenu from './LoginAdminDropDownMenu';

function LogInAdmin() {
    const [show, setShow] = useState(false);

    let menuRef = useRef(null);
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });
    return (
        <div>
            <div ref={menuRef} className="admin-section">
                <div className="admin-sec-logo">
                    <EmailIcon className="admin-images-item-1" />
                    <SettingsIcon className="admin-images-item-1" />
                    <AlarmIcon className="admin-images-item-1" />
                </div>
                <div className="admin-sec-info">
                    <div className="admin-image"></div>
                    <div>
                        <h1 className="admin-name">Vicky Kaushal</h1>
                        <p>Admin <ArrowDropDownIcon style={{ fontSize: '30px' }} onClick={() => setShow(!show)} className="admin-drop-down" />   </p>
                        {
                            show ? <LoginAdminDropDownMenu /> : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInAdmin
