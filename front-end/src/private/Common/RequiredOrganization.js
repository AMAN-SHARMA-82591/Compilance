import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Typography, Paper, Box } from "@mui/material";

const RequireOrganization = ({ children }) => {
  const location = useLocation();
  const profile = useSelector((state) => state.basicInformation?.data?.profile);
  const { data: organizations, isLoading } = useSelector(
    (state) => state.organizationData
  );

  if (location.pathname === "/organization") {
    return children;
  }

  if (profile?.role === 1 || organizations.length > 0 || profile?.orgId) {
    return children;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1">
          You need to create an organization before accessing this section.
        </Typography>
        <Typography sx={{ mb: 5 }} variant="body2" color="textSecondary">
          Please go to the <b>Organization</b> page to create one first.
        </Typography>
        <NavLink className="organization-button" to="/organization">
          Organization
        </NavLink>
      </Paper>
    </Box>
  );
};

export default RequireOrganization;
