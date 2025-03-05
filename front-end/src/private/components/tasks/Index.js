import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { createTask, taskFilterAction } from "../../../store/store";
import { Button, TextField } from "@mui/material";
import { deleteTask } from "../../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTaskDialog from "./common/CreateTaskDialog";
import EditTaskDialog from "./common/EditTaskDialog";
import { formatStatus } from "../../Common/formatHelpers";
import { TableSkeleton } from "../../Common/Skeleton";
import PageHeader from "../../Common/PageHeader";

function Index() {
  const dispatch = useDispatch();
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const { taskList, isLoading } = useSelector((state) => ({
    taskList: state.taskList.data.taskList,
    isLoading: state.taskList.isLoading,
  }));

  useEffect(() => {
    return () => {
      dispatch(taskFilterAction(""));
    };
  });

  const taskFilterType = useSelector((state) => state.taskFilterType);

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  };

  const handleOpenCreateTaskDialog = () => {
    setCreateTaskDialog(!createTaskDialog);
  };

  const handleChangeFilterType = (filterType) => {
    dispatch(taskFilterAction(filterType));
  };

  let content;
  if (isLoading) {
    content = [...Array(5)].map((_, index) => <TableSkeleton key={index} />);
  } else {
    content = (
      <tbody>
        {!isEmpty(taskList) &&
          taskList.map((task, key) => (
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
          ))}
      </tbody>
    );
  }
  return (
    <>
      <PageHeader
        title="Tasks"
        buttonTitle="Create Task"
        onClick={handleOpenCreateTaskDialog}
      >
        <CreateTaskDialog
          open={createTaskDialog}
          handleOpenTaskDialog={handleOpenCreateTaskDialog}
        />
      </PageHeader>
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
        </div>
        <div className="search-main">
          <p>Search</p>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            // inputProps={{
            //   startAdornment: (
            //     <InputAdornment position='start'>
            //       <Search />
            //     </InputAdornment>
            //   )
            // }}
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
