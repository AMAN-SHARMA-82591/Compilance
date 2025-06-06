import { NavLink } from "react-router";
import { Drawer, Tooltip } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import List from "@mui/icons-material/List";
import { authAdminRole } from "../Common/Constants";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";

function LeftBar() {
  // const [hasOrganization, setHasOrganization] = useState(false);
  // const [loading, setLoading] = useState(false);
  const profileData = useSelector(
    (state) => state.basicInformation?.data?.profile
  );
  const organizations = useSelector((state) => state.organizationData?.data);

  // useEffect(() => {
  //   const checkOrganization = async () => {
  //     try {
  //       const response = await axiosInstance.get("/organization");
  //       setHasOrganization(response.data.length > 0);
  //     } catch (error) {
  //       console.error("Error checking organization:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (profileData?.role === 2) {
  //     // Check if user is sub-admin
  //     checkOrganization();
  //   } else {
  //     setHasOrganization(true); // Enable all routes for other roles
  //   }
  // }, [profileData]);

  const renderNavLink = (to, icon, tooltip) => {
    const isDisabled =
      profileData?.role === 2 &&
      !organizations.length > 0 &&
      to !== "/organization";

    return (
      <Tooltip
        title={
          isDisabled
            ? "Create an organization first to access this feature"
            : ""
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
          </ul>
        </div>
      </div>
    </Drawer>
  );
}

export default LeftBar;
