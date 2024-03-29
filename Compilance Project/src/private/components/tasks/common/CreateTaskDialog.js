import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { createTask } from '../../../../store/store';
import { useFormik } from 'formik';
import { useState } from 'react';

const initialValues = {
  status: '',
  title: '',
  description: '',
  type: '',
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
      <Dialog open={open}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <label htmlFor='status'>Status</label>
              <input name='status' placeholder='Status' value={values.status} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input name='title' placeholder='Title' value={values.title} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input name='description' placeholder='Description' value={values.description} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <input name='type' placeholder='Type' value={values.type} onChange={handleChange} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button size='small' variant='outlined' onClick={handleCloseCreateTask}>Close</Button>
          <Button size='small' variant='contained' onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateTaskDialog