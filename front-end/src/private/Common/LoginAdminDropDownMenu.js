import { List, ListItem } from "@mui/material";
import { Link } from "react-router";
import { getRoleLabel, truncateText } from "./formatHelpers";

function LoginAdminDropDownMenu({ handleClosePopover, profileDetails }) {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload(false);
  }
  return (
    <>
      <div className="admin-drop-down-menu">
        <div className="drop-down-sec-logo-cont2">
          <b>{truncateText(profileDetails?.name ?? "Person", 14)}</b>
          <p>{getRoleLabel(profileDetails?.role)}</p>
        </div>
        <List>
          <ListItem onClick={handleClosePopover} component={Link} to="/home">
            Home
          </ListItem>
          {/* <ListItem onClick={handleClosePopover} button={true} component={Link} to='/profileDetails'>Profile</ListItem> */}
          <ListItem
            onClick={handleLogout}
            style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
          >
            Logout
          </ListItem>
        </List>
      </div>
    </>
  );
}

export default LoginAdminDropDownMenu;
