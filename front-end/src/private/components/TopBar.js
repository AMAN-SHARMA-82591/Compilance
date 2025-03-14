import React, { useState } from "react";
import { compose } from "ramda";
import * as PropTypes from "prop-types";
// import EmailIcon from "@mui/icons-material/Email";
import withStyles from "@mui/styles/withStyles";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AlarmIcon from "@mui/icons-material/Alarm";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AppBar, Avatar, Popover } from "@mui/material";
import LoginAdminDropDownMenu from "../Common/LoginAdminDropDownMenu";
import "../../App.css";
import { useSelector } from "react-redux";

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
        {/* <div className="week-table-container-items">
                    <div className="date-section">
                        <WatchLaterIcon fontSize="large" className="date-logo-item" />
                    </div>
                    <div className="week-section">
                        <div className="week-items">
                            <h1>Mon</h1>
                            <p>9</p>
                        </div>
                        <div className="week-items">
                            <h1>Tue</h1>
                            <p>10</p>
                        </div>
                        <div className="week-items">
                            <h1>Wed</h1>
                            <p>11</p>
                        </div>
                        <div className="week-items">
                            <h1>Thu</h1>
                            <p>12</p>
                        </div>
                        <div className="week-items">
                            <h1>Fri</h1>
                            <p>13</p>
                        </div>
                        <div className="week-items">
                            <h1>Sat</h1>
                            <p>14</p>
                        </div>
                        <div className="week-items">
                            <h1>Sun</h1>
                            <p>15</p>
                        </div>

                    </div>
                    <div className="calender-section">
                        <CalendarTodayIcon fontSize="large" className="calender-logo-item" />
                    </div>
                </div> */}
        <div className="admin-section">
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
