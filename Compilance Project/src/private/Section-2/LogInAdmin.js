import React,{useState,useEffect, useRef} from 'react'
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import AlarmIcon from '@material-ui/icons/Alarm';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Button from '@material-ui/core/Button'
import '../App.css'
import LoginAdminDropDownMenu from './LoginAdminDropDownMenu';

function LogInAdmin() {
    const [show,setShow] = useState(false);
    
    let menuRef = useRef(null);
    useEffect(() => {
        let handler = (event)=>{
            if(!menuRef.current.contains(event.target)){
                setShow(false)
            }
            // console.log(event.target)
        }
        document.addEventListener('mousedown',handler);
        return () =>{
            document.removeEventListener('mousedown',handler)
        }
    });
    return (
        <div>
            <div ref={menuRef} className="admin-section">
                                <div className="admin-sec-logo">
                                          <EmailIcon className="admin-images-item-1"/>
                                          <SettingsIcon  className="admin-images-item-1" />
                                          <AlarmIcon  className="admin-images-item-1" />
                                </div>
                                <div className="admin-sec-info">
                                    <div className="admin-image"></div>
                                    <div>
                                        <h1  className="admin-name">Vicky Kaushal</h1>
                                        <p>Admin <ArrowDropDownIcon style={{fontSize:'30px'}}  onClick={() => setShow(!show)}  className="admin-drop-down" />   </p>
                                        {
                                            show? <LoginAdminDropDownMenu /> :null
                                        }
                                       
                                    </div>
                                </div>
                        </div>
        </div>
    )
}

export default LogInAdmin
