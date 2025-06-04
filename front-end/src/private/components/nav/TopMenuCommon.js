import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { useLocation } from "react-router";

function TopMenuHome({ path, title }) {
  const location = useLocation();
  return (
    <Button
      component={Link}
      to={path}
      variant={location.pathname.includes(path) ? "contained" : "text"}
      size="small"
      style={{ backgroundColor: "#eea62b", color: "#fff" }}
    >
      {title && title}
    </Button>
  );
}

export default TopMenuHome;
