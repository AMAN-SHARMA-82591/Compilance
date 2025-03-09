import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import DeleteBox from "@mui/icons-material/Delete";

function OrganizationCard({ data, setOpenDeleteDialog, setDeleteProfileId }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <CardActionArea
        sx={{
          p: 2,
          width: "100%",
        }}
        className="organization_box"
        onClick={() => navigate(`/organization/${data._id}`)}
      >
        <IconButton
          className="delete_icon_button"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteProfileId(data._id);
            setOpenDeleteDialog(true);
          }}
        >
          <DeleteBox color="error" />
        </IconButton>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {data.description || "No description provided"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
            {data.city}, {data.state}, {data.country}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OrganizationCard;
