import { Card, CardContent, IconButton, Typography } from "@mui/material";
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
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow 0.3s, transform 0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px) scale(1.02)",
        },
        m: "0 auto",
        mt: 4,
      }}
      onClick={() => navigate(`/organization/${data._id}`)}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          background: "rgba(255,255,255,0.85)",
          "&:hover": { background: "rgba(255,0,0,0.08)" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          setDeleteProfileId(data._id);
          setOpenDeleteDialog(true);
        }}
      >
        <DeleteBox color="error" />
      </IconButton>
      <CardContent sx={{ pt: 5, pb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {data.description || "No description provided"}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          {data.city}, {data.state}, {data.country}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OrganizationCard;
