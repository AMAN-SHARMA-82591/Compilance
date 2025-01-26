import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { createTask } from '../../../../store/store';
import { useFormik } from 'formik';
import { useState } from 'react';

const initialValues = {
  status: '',
  title: '',
  description: '',
  type: '',
  priority: '',
}

function CreateTaskDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { values, error, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatch(createTask(values));
      handleReset();
      setOpen(false);
    }
  });

  const handleCloseCreateTask = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={() => setOpen(true)}
      >
        Create New Task
      </Button>
      <Dialog open={open} maxWidth='md' fullWidth>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <label htmlFor='status'>Status</label>
              <TextField
                select
                fullWidth
                size='small'
                name='status'
                value={values.status}
                onChange={handleChange}
              >
                <MenuItem value='overdue'>
                  Overdue
                </MenuItem>
                <MenuItem value='in-progress'>
                  In Progress
                </MenuItem>
                <MenuItem value='upcoming'>
                  Upcoming
                </MenuItem>
                <MenuItem value='not-started'>
                  Not Started
                </MenuItem>
                {/* <MenuItem value='closed'>
                  Closed
                </MenuItem>
                <MenuItem value='pending'>
                  Pending
                </MenuItem> */}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="title">Title</label>
              <TextField fullWidth size='small' name='title' value={values.title} placeholder='Title' onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="description">Description</label>
              <TextField fullWidth size='small' name='description' value={values.description} placeholder='Description' onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="type">Type</label>
              <TextField
                select
                fullWidth
                size='small'
                name='type'
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value='enhancement'>
                  Enhancement
                </MenuItem>
                <MenuItem value='task'>
                  Task
                </MenuItem>
                <MenuItem value='bug'>
                  Bug
                </MenuItem>
                <MenuItem value='epic'>
                  Epic
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="priority">Priority</label>
              <TextField
                select
                fullWidth
                size='small'
                name='priority'
                value={values.priority}
                onChange={handleChange}
              >
                <MenuItem value='major'>
                  Major
                </MenuItem>
                <MenuItem value='blocker'>
                  Blocker
                </MenuItem>
                <MenuItem value='critical'>
                  Critical
                </MenuItem>
                <MenuItem value='minor'>
                  Minor
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: '10px 0 20px 20px', justifyContent: 'flex-start' }}>
          <Button variant='outlined' onClick={handleCloseCreateTask}>Close</Button>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateTaskDialog