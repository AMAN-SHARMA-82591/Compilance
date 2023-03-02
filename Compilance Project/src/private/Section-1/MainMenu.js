import React from 'react'
import HouseIcon from '@material-ui/icons/House';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {NavLink} from 'react-router-dom';

function MainMenu() {
    return (
        <div className="main-menu-section">
                <div className="dashboard-logo-contents">
                       <ul className="unordered-list-items">
                            <li className="dashboard-main-logo">
                                    <NavLink className="list-item" to="/"><HouseIcon fontSize="large" /></NavLink>
                            </li>
                            <li className="dashboard-main-logo">
                                    <NavLink className="list-item" to="/community"><QuestionAnswerIcon  fontSize="large"/></NavLink>
                            </li>
                            <li className="dashboard-main-logo">
                                    <NavLink className="list-item" to="/people"><PeopleAltIcon fontSize="large" /></NavLink>
                            </li>
                            <li className="dashboard-main-logo">
                                    <NavLink className="list-item" to="/publish"><PublishIcon  fontSize="large"/></NavLink>
                            </li>
                       </ul>
                      

                </div>
                <div className="dashboard-settings">
                            <li className="dashboard-main-logo-settings">
                                    <NavLink className="list-item" to="/settings"><SettingsIcon fontSize="large" /></NavLink>
                            </li>
                </div>
        </div>
    )
}

export default MainMenu
