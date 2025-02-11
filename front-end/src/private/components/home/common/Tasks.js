import React from "react";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TaskField from "../../../Common/TaskField";
import "../../../../App.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TaskSkeleton } from "../../../Common/Skeleton";

const styles = () => ({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
});

function Tasks() {
  const { data, isLoading } = useSelector((state) => state.taskList);
  const navigate = useNavigate();
  return (
    <main className="tasks-main">
      <div className="task-heading">
        <Typography variant="h4">Tasks</Typography>
        <button onClick={() => navigate("/tasks")}>View All</button>
      </div>
      <Grid container spacing={3}>
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, i) => (
              <Grid key={i} size={6}>
                <TaskSkeleton />
              </Grid>
            ))
        ) : (
          <>
            {data.taskList.slice(0, 4).map((task, i) => (
              <Grid key={i} size={6}>
                <TaskField data={task} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </main>
  );
}

export default compose(withStyles(styles))(Tasks);
