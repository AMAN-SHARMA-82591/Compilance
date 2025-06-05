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
import { editTask } from "../../../../store/store";
import { useFormik } from "formik";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../../../Common/AxiosInstance";

function EditTaskDialog({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    status: "",
    title: "",
    description: "",
    type: "",
    priority: "",
  };
  const { values, handleSubmit, handleChange, handleReset, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        dispatch(editTask({ id, values }));
        handleReset();
        setOpen(false);
      },
    });
  const handleOpenTask = async () => {
    setLoading(true);
    const response = await axiosInstance.get(`/tasks/${id}`);
    if (response.data) {
      setLoading(false);
      setValues({
        type: response.data.type,
        title: response.data.title,
        status: response.data.status,
        priority: response.data.priority,
        description: response.data.description,
      });
      setOpen(true);
    } else {
      setLoading(true);
    }
  };

  const handleCloseEditTask = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      <Button
        style={{ marginRight: 10 }}
        variant="contained"
        onClick={handleOpenTask}
      >
        <EditIcon />
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Create Task</DialogTitle>
        {!loading ? (
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
        ) : (
          <DialogContent>Loading...</DialogContent>
        )}
        <DialogActions
          style={{ margin: "10px 0 20px 20px", justifyContent: "flex-start" }}
        >
          <Button size="small" variant="outlined" onClick={handleCloseEditTask}>
            Close
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTaskDialog;
