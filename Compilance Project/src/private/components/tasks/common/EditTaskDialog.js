import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { editTask } from '../../../../store/store';
import { useFormik } from 'formik';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import axiosInstance from '../../../Common/AxiosInstance';


function EditTaskDialog({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    status: '',
    title: '',
    description: '',
    type: '',
  }
  const { values, error, handleSubmit, handleChange, handleReset, setValues } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatch(editTask({ id, values }));
      handleReset();
      setOpen(false);
    }
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
        description: response.data.description,
      });
      setOpen(true);
    } else {
      setLoading(true);
    }
  }

  const handleCloseEditTask = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      <Button onClick={handleOpenTask}><EditIcon /></Button>
      <Dialog open={open}>
        <DialogTitle>Create Task</DialogTitle>
        {!loading ? (
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
        )
          : (
            <DialogContent>
              Loading...
            </DialogContent>
          )}
        <DialogActions>
          <Button size='small' variant='outlined' onClick={handleCloseEditTask}>Close</Button>
          <Button
            size='small'
            variant='contained'
            disabled={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditTaskDialog