import React from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Skeleton,
  CardHeader,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledCard } from "../components/home/common/CustomCard";

function TaskSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Skeleton variant="circular" width={30} height={30} />
      <Skeleton variant="rectangular" width="70%" height={20} />
      <Skeleton variant="circular" width={20} height={20} />
    </Box>
  );
}

function TableSkeleton() {
  return (
    <tbody>
      <tr>
        <td size="small">
          <Skeleton variant="text" width={100} height={30} />
        </td>
        <td>
          <Skeleton variant="text" width={120} height={30} />
        </td>
        <td>
          <Skeleton variant="text" width={150} height={30} />
        </td>
        <td>
          <Skeleton variant="text" width={100} height={30} />
        </td>
        <td style={{ display: "flex" }}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            style={{ marginRight: 10 }}
          />
          <Skeleton variant="circular" width={40} height={40} />
        </td>
      </tr>
    </tbody>
  );
}

function ProgressOverviewSkeleton({ color, width, height }) {
  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: "20px",
        padding: "20px",
        textAlign: "center",
        color: "#fff",
        width: width,
        height: height,
      }}
    >
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ margin: "auto", bgcolor: "rgba(255,255,255,0.3)" }}
      />
      <Skeleton
        variant="text"
        width={80}
        height={30}
        sx={{ margin: "10px auto", bgcolor: "rgba(255,255,255,0.3)" }}
      />
    </Box>
  );
}

function PeopleSkeleton() {
  return (
    <StyledCard>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Skeleton variant="text" width={120} />}
        subheader={<Skeleton variant="text" width={100} />}
      />
    </StyledCard>
  );
}

function OrganizationSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
        margin: 2,
        p: 2,
      }}
    >
      <CardContent>
        <Skeleton variant="text" width="60%" height={28} sx={{ mx: "auto" }} />
        <Skeleton
          variant="text"
          width="80%"
          height={20}
          sx={{ mx: "auto", mt: 1 }}
        />
        <Skeleton
          variant="text"
          width="50%"
          height={18}
          sx={{ mx: "auto", mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}

function AvatarSkeleton({ color, width, height }) {
  return (
    <Stack direction="row">
      {[...Array(4)].map((_, index) => (
        <Skeleton
          key={index}
          variant="circular"
          width={40}
          height={40}
          animation="wave"
        />
      ))}
    </Stack>
  );
}

const ProfileSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <Card
            sx={{
              width: 290,
              height: 260,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <Skeleton variant="circular" width={80} height={80} />
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="100%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export {
  TaskSkeleton,
  TableSkeleton,
  AvatarSkeleton,
  PeopleSkeleton,
  ProfileSkeleton,
  OrganizationSkeleton,
  ProgressOverviewSkeleton,
};
