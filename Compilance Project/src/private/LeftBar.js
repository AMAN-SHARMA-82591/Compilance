import React from 'react'
import HouseIcon from '@mui/icons-material/House';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PublishIcon from '@mui/icons-material/Publish';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@mui/material';

function LeftBar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
    >
      <div className="main-menu-section">
        <div className="dashboard-logo-contents">
          <ul className="unordered-list-items">
            <li className="dashboard-main-logo">
              <NavLink className="list-item" to="/home"><HouseIcon fontSize="large" /></NavLink>
            </li>
            <li className="dashboard-main-logo">
              <NavLink className="list-item" to="/community"><QuestionAnswerIcon fontSize="large" /></NavLink>
            </li>
            <li className="dashboard-main-logo">
              <NavLink className="list-item" to="/people"><PeopleAltIcon fontSize="large" /></NavLink>
            </li>
          </ul>
        </div>
        <div className="dashboard-settings">
          <li className="dashboard-main-logo-settings">
            <NavLink className="list-item" to="/settings"><SettingsIcon fontSize="large" /></NavLink>
          </li>
        </div>
      </div>
    </Drawer>
  )
}

export default LeftBar
