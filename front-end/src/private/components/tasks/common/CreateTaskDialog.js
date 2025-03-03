import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTask } from "../../../../store/store";
import { useFormik } from "formik";
import { useState } from "react";

const initialValues = {
  status: "",
  title: "",
  description: "",
  type: "",
  priority: "",
};

function CreateTaskDialog({ open, handleOpenTaskDialog }) {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const { values, error, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatch(createTask(values));
      handleReset();
      // setOpen(false);
      handleOpenTaskDialog();
    },
  });

  const handleCloseCreateTask = () => {
    // setOpen(false);
    handleOpenTaskDialog();
    handleReset();
  };

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <label htmlFor="status">Status</label>
              <TextField
                select
                fullWidth
                size="small"
                name="status"
                value={values.status}
                onChange={handleChange}
              >
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="not-started">Not Started</MenuItem>
                {/* <MenuItem value='closed'>
                  Closed
                </MenuItem>
                <MenuItem value='pending'>
                  Pending
                </MenuItem> */}
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="title">Title</label>
              <TextField
                fullWidth
                size="small"
                name="title"
                value={values.title}
                placeholder="Title"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="description">Description</label>
              <TextField
                fullWidth
                size="small"
                name="description"
                value={values.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="type">Type</label>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="priority">Priority</label>
              <TextField
                select
                fullWidth
                size="small"
                name="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <MenuItem value="major">Major</MenuItem>
                <MenuItem value="blocker">Blocker</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="minor">Minor</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ margin: "10px 0 20px 20px", justifyContent: "flex-start" }}
        >
          <Button variant="outlined" onClick={handleCloseCreateTask}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateTaskDialog;
