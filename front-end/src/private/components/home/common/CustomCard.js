import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

export const StyledCard = styled(Card)(() => ({
  maxWidth: "20vw",
  margin: "20px auto",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    // transform: "scale(1.02)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

function CustomCard({ data }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async () => {
    setAnchorEl(null);
    await navigate(`/people/${data._id}`);
  };
  return (
    <StyledCard>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
        subheader={data.email}
        avatar={<Avatar alt={data.name} src="/static/images/avatar/1.jpg" />}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Details</MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem> */}
      </Menu>
    </StyledCard>
  );
}

export default CustomCard;
