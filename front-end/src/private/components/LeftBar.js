import { NavLink, useNavigate } from "react-router";
import {
  Button,
  Dialog,
  Drawer,
  Tooltip,
  MenuItem,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import HouseIcon from "@mui/icons-material/House";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/icons-material/List";
import { authAdminRole } from "../Common/Constants";
import logo from "../../images/logo.png";
import { setSelectedOrgId } from "../../store/store";

function LeftBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const organizations = useSelector((state) => state.organizationData?.data);
  const profileData = useSelector(
    (state) => state.basicInformation?.data?.profile
  );
  const selectedOrg = useSelector(
    (state) => state.organizationData.selectedOrgId
  );

  const handleChangeOrganization = async (event) => {
    const orgId = event.target.value;
    dispatch(setSelectedOrgId(orgId));
    setOpenDialog(false);
    await navigate("/home");
    window.location.reload();
  };

  const renderNavLink = (to, icon, tooltip = "") => {
    const isDisabled =
      profileData?.role === 2 &&
      !organizations.length > 0 &&
      to !== "/organization";

    return (
      <Tooltip
        title={
          isDisabled
            ? "Create an organization first to access this feature"
            : tooltip
        }
        placement="right"
      >
        <li className="home-main-logo">
          <NavLink
            className={`list-item ${isDisabled ? "disabled-link" : ""}`}
            to={isDisabled ? "#" : to}
            onClick={(e) => isDisabled && e.preventDefault()}
            style={isDisabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            {icon}
          </NavLink>
        </li>
      </Tooltip>
    );
  };

  // if (loading) return null;

  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <div className="main-menu-section">
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          >
            <img src={logo} style={{ width: 40, height: 40 }} alt="main-log" />
          </div>
          <div className="home-logo-contents">
            <ul className="unordered-list-items">
              {renderNavLink("/home", <HouseIcon fontSize="large" />, "Home")}
              {renderNavLink(
                "/people",
                <PeopleAltIcon fontSize="large" />,
                "People"
              )}
              {profileData &&
                authAdminRole.includes(profileData.role) &&
                renderNavLink(
                  "/organization",
                  <CorporateFareIcon fontSize="large" />,
                  "Organization"
                )}
              {renderNavLink("/tasks", <List fontSize="large" />, "Tasks")}
              <IconButton
                style={{ background: "white" }}
                size="large"
                onClick={() => setOpenDialog(true)}
              >
                <SettingsIcon />
              </IconButton>
            </ul>
          </div>
        </div>
      </Drawer>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Change Organization</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            size="small"
            name="country"
            value={selectedOrg}
            onChange={handleChangeOrganization}
          >
            {!isEmpty(organizations) &&
              organizations.map((org) => (
                <MenuItem key={org._id} value={org._id}>
                  {org.name && org.name}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "10px 25px",
          }}
        >
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LeftBar;
