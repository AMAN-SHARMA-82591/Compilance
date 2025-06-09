import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TaskField from "../../../Common/TaskField";
import "../../../../App.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TaskSkeleton } from "../../../Common/Skeleton";
import { isEmpty } from "lodash";

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
  let content;
  const filteredTaskList = data.taskList
    .filter((task) => task.userId !== null)
    .slice(0, 4);

  if (isLoading) {
    content = Array(4)
      .fill(null)
      .map((_, i) => (
        <Grid key={i} size={6}>
          <TaskSkeleton />
        </Grid>
      ));
  }
  if (!isEmpty(filteredTaskList)) {
    content = filteredTaskList.map((task, i) => (
      <Grid key={i} size={6}>
        <TaskField data={task} />
      </Grid>
    ));
  } else {
    content = (
      <Typography
        style={{
          width: "100%",
          color: "#888",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "8px",
          fontStyle: "italic",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.05)",
        }}
        variant="h6"
      >
        No tasks found.
      </Typography>
    );
  }

  return (
    <main className="tasks-main">
      <div className="task-heading">
        <Typography variant="h4">Tasks</Typography>
        <button onClick={() => navigate("/tasks")}>View All</button>
      </div>
      <Grid container spacing={3}>
        {content}
      </Grid>
    </main>
  );
}

export default compose(withStyles(styles))(Tasks);
