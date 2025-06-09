import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { taskFilterAction } from "../../../store/store";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteTask } from "../../../store/store";
import CreateTaskDialog from "./common/CreateTaskDialog";
import { TableSkeleton } from "../../Common/Skeleton";
import PageHeader from "../../Common/PageHeader";
import TaskRow from "./common/TaskRow";

function Index() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const [archieveOpen, setArchieveOpen] = useState(false); // Accordion state
  const taskFilterType = useSelector((state) => state.taskFilterType || null);
  const {
    isLoading,
    data: { taskList },
  } = useSelector((state) => state.taskList);

  const filteredTaskList = taskFilterType
    ? taskList.filter(
        (task) => task.status === taskFilterType && task.userId !== null
      )
    : taskList.filter((task) => task.userId !== null);

  const searchedTaskList = searchTerm
    ? filteredTaskList.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredTaskList;

  const archieveTaskList = taskList.filter((task) => task.userId === null);

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
          searchedTaskList.map((task) => (
            <TaskRow key={task._id} task={task} onDelete={handleDeleteTask} />
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
        {!isEmpty(archieveTaskList) && (
          <tr>
            <td colSpan={5} style={{ padding: 0, border: "none" }}>
              <Accordion
                expanded={archieveOpen}
                onChange={() => setArchieveOpen((prev) => !prev)}
                sx={{
                  boxShadow: "none",
                  background: "transparent",
                  "&:before": { display: "none" },
                  marginTop: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="archieve-content"
                  id="archieve-header"
                  sx={{
                    background: "rgba(0,0,0,0.05)",
                    borderRadius: "8px",
                    minHeight: "48px",
                  }}
                >
                  <Typography
                    style={{
                      color: "#888",
                      fontStyle: "italic",
                      fontWeight: 600,
                      width: "100%",
                      textAlign: "center",
                    }}
                    variant="h6"
                  >
                    Archive ({archieveTaskList.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      {archieveTaskList.map((task) => (
                        <TaskRow
                          key={task._id}
                          task={task}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                    </tbody>
                  </table>
                </AccordionDetails>
              </Accordion>
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
