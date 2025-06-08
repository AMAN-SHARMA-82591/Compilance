import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { taskFilterAction } from "../../../store/store";
import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteTask } from "../../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTaskDialog from "./common/CreateTaskDialog";
import EditTaskDialog from "./common/EditTaskDialog";
import { formatStatus } from "../../Common/formatHelpers";
import { TableSkeleton } from "../../Common/Skeleton";
import PageHeader from "../../Common/PageHeader";

function Index() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const taskFilterType = useSelector((state) => state.taskFilterType || null);
  const isLoading = useSelector((state) => state.taskList?.isLoading || false);
  const taskList = useSelector((state) => state.taskList?.data?.taskList || []);

  const filteredTaskList = taskFilterType
    ? taskList.filter((task) => task.status === taskFilterType)
    : taskList;

  const searchedTaskList = searchTerm
    ? filteredTaskList.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredTaskList;

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  };

  const handleOpenCreateTaskDialog = () => {
    setCreateTaskDialog(!createTaskDialog);
  };

  const handleChangeFilterType = (filterType) => {
    dispatch(taskFilterAction(filterType));
  };

  const handleClearFilterType = () => {
    dispatch(taskFilterAction(""));
  };

  let content;
  if (isLoading) {
    content = [...Array(5)].map((_, index) => <TableSkeleton key={index} />);
  } else {
    content = (
      <tbody>
        {!isEmpty(searchedTaskList) ? (
          searchedTaskList.map((task, key) => (
            <tr key={key}>
              <td className="status-cell">{formatStatus(task.status)}</td>
              <td className="title-cell">{task.title}</td>
              <td className="description-cell">{task.description}</td>
              <td className="type-cell">{formatStatus(task.type)}</td>
              <td className="actions-cell">
                <EditTaskDialog id={task._id} />
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    borderColor: "red",
                    color: "red",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  <DeleteIcon onClick={() => handleDeleteTask(task)} />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <Typography
                style={{
                  color: "#888",
                  padding: "15px",
                  borderRadius: "8px",
                  fontStyle: "italic",
                  textAlign: "center",
                  background: "rgba(0, 0, 0, 0.05)",
                }}
                variant="h6"
              >
                No tasks found.
              </Typography>
            </td>
          </tr>
        )}
      </tbody>
    );
  }

  return (
    <>
      <PageHeader
        title="Tasks"
        buttonTitle="Create Task"
        onClick={handleOpenCreateTaskDialog}
      />
      <CreateTaskDialog
        open={createTaskDialog}
        handleOpenTaskDialog={handleOpenCreateTaskDialog}
      />
      <div className="task-filter-main">
        <div className="filter-main">
          <p>Filters</p>
          <Button
            onClick={() => handleChangeFilterType("overdue")}
            variant={taskFilterType === "overdue" ? "contained" : "outlined"}
          >
            Overdue
          </Button>
          <Button
            onClick={() => handleChangeFilterType("upcoming")}
            variant={taskFilterType === "upcoming" ? "contained" : "outlined"}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => handleChangeFilterType("in-progress")}
            variant={
              taskFilterType === "in-progress" ? "contained" : "outlined"
            }
          >
            In Progress
          </Button>
          <Button
            onClick={() => handleChangeFilterType("total")}
            variant={taskFilterType === "total" ? "contained" : "outlined"}
          >
            Total
          </Button>
          {taskFilterType && (
            <Tooltip title="Clear Filter">
              <IconButton size="small" onClick={handleClearFilterType}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div className="search-main">
          <p>Search</p>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="overdue-table-cont">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        {content}
      </table>
    </>
  );
}

export default Index;
