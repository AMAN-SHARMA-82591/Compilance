import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function OrganizationCard({ data }) {
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
        onClick={() => navigate(`/organization/${data._id}`)}
      >
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
