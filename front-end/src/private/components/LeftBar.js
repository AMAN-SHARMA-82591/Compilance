import React from "react";
import HouseIcon from "@mui/icons-material/House";
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import PublishIcon from '@mui/icons-material/Publish';
// import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import List from "@mui/icons-material/List";
import { NavLink } from "react-router";
import { Drawer } from "@mui/material";
import reactIcon from "../../images/react-icon-original.svg";

function LeftBar() {
  return (
    <Drawer variant="permanent" anchor="left">
      <div className="main-menu-section">
        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
        >
          <img
            src={reactIcon}
            style={{ width: 40, height: 40 }}
            alt="main-log"
          />
        </div>
        <div className="home-logo-contents">
          <ul className="unordered-list-items">
            <li className="home-main-logo">
              <NavLink className="list-item" to="/home">
                <HouseIcon fontSize="large" />
              </NavLink>
            </li>
            {/* <li className='home-main-logo'>
              <NavLink className='list-item' to='/community'><QuestionAnswerIcon fontSize='large' /></NavLink>
            </li> */}
            <li className="home-main-logo">
              <NavLink className="list-item" to="/people">
                <PeopleAltIcon fontSize="large" />
              </NavLink>
            </li>
            <li className="home-main-logo">
              <NavLink className="list-item" to="/organization">
                <CorporateFareIcon fontSize="large" />
              </NavLink>
            </li>
            <li className="home-main-logo">
              <NavLink className="list-item" to="/tasks">
                <List fontSize="large" />
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className='home-settings'>
          <li className='home-main-logo-settings'>
            <NavLink className='list-item' to='/settings'><SettingsIcon fontSize='large' /></NavLink>
          </li>
        </div> */}
      </div>
    </Drawer>
  );
}

export default LeftBar;
