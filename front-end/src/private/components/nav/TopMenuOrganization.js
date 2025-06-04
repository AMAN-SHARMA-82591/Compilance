import React from "react";
import { Button } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { Link } from "react-router";
import { compose } from "ramda";
import { useLocation } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function TopMenuOrganization() {
  const location = useLocation();
  return (
    <>
      <Button
        component={Link}
        to={"/organization"}
        variant={
          location.pathname.includes("/organization") ? "contained" : "text"
        }
        size="small"
        style={{ backgroundColor: "#eea62b", color: "#fff" }}
      >
        organization
      </Button>
      {location.pathname.match("/organization/[a-z_0-9]+$") && (
        <>
          <ChevronRightIcon />
          <Button
            component={Link}
            to={"/organization/:id/details"}
            variant={
              location.pathname.match("/organization/:id/details")
                ? "contained"
                : "text"
            }
            size="small"
            style={{
              backgroundColor: "#eea62b",
              color: "#fff",
              marginRight: 10,
            }}
          >
            Details
          </Button>
          <Button
            component={Link}
            to={"/organization/:id/people"}
            variant={
              location.pathname.match("/organization/:id/people")
                ? "contained"
                : "text"
            }
            size="small"
            style={{ backgroundColor: "#eea62b", color: "#fff" }}
          >
            People
          </Button>
        </>
      )}
    </>
  );
}

export default TopMenuOrganization;
