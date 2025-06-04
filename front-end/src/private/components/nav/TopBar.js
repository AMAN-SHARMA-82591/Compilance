import React, { useState } from "react";
import { compose } from "ramda";
import * as PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
// import EmailIcon from "@mui/icons-material/Email";
import withStyles from "@mui/styles/withStyles";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AlarmIcon from "@mui/icons-material/Alarm";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AppBar, Avatar, Popover } from "@mui/material";
import LoginAdminDropDownMenu from "../../Common/LoginAdminDropDownMenu";
import "../../../App.css";
import TopMenuCommon from "./TopMenuCommon";
import TopMenuOrganization from "./TopMenuOrganization";

const styles = () => ({
  appBar: {
    display: "flex",
    height: "60px",
    marginLeft: "100px",
    position: "relative",
    backgroundColor: "#1976d2",
    justifyContent: "space-between",
  },
});
function TopBar({ classes }) {
  const location = useLocation();
  const [show, setShow] = useState(null);
  const profileDetails = useSelector(
    (state) => state.basicInformation?.data?.profile
  );

  function handleOpenPopover(event) {
    setShow(event.currentTarget);
  }

  function handleClosePopover(event) {
    setShow(null);
  }

  return (
    <AppBar>
      <div className={classes.appBar}>
        <div className="top-bar-left-section">
          {location.pathname.includes("/home") && (
            <TopMenuCommon path="/home" title="home" />
          )}
          {location.pathname.includes("/people") && (
            <TopMenuCommon path="/people" title="people" />
          )}
          {location.pathname.includes("/tasks") && (
            <TopMenuCommon path="/tasks" title="tasks" />
          )}
          {location.pathname.includes("/organization") && (
            <TopMenuOrganization path="/organization" title="organization" />
          )}
        </div>
        <div className="top-bar-right-section">
          {/* <div className="admin-sec-logo">
            <EmailIcon className="admin-images-item-1" />
            <SettingsIcon className="admin-images-item-1" />
            <AlarmIcon className="admin-images-item-1" />
          </div> */}
          <Avatar src={profileDetails?.image} onClick={handleOpenPopover} />

          <Popover
            id="simple-popover"
            anchorEl={show}
            open={show}
            keepMounted={false}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ borderRadius: "20px" }}
          >
            <LoginAdminDropDownMenu
              profileDetails={profileDetails}
              handleClosePopover={handleClosePopover}
            />
          </Popover>
        </div>
      </div>
    </AppBar>
  );
}

TopBar.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(TopBar);
