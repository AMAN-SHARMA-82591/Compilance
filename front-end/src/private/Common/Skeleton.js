import React from "react";
import { Stack, Box, Skeleton } from "@mui/material";

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

const TableSkeleton = () => {
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
};

function PeopleSkeleton({ color, width, height }) {
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

export { TaskSkeleton, PeopleSkeleton, AvatarSkeleton, TableSkeleton };
