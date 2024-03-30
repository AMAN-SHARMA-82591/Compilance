import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { taskFilterAction } from '../../../store/store';
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import List from '@mui/icons-material/List';
import Search from '@mui/icons-material/Search';
import { deleteTask } from '../../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateTaskDialog from './common/CreateTaskDialog';
import EditTaskDialog from './common/EditTaskDialog';

function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => {
    return state.taskList;
  });

  useEffect(() => {
    return () => {
      dispatch(taskFilterAction(''));
    }
  }, []);

  const taskFilterType = useSelector((state) => state.taskFilterType);

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
  }

  const handleChangeFilterType = (filterType) => {
    dispatch(taskFilterAction(filterType));
  }

  let content;
  if (isLoading) {
    content = <CircularProgress />
  } else {
    content = (
      <>
        <tbody>
          {!isEmpty(data.taskList) && data.taskList.map((task, key) => (
            <tr key={key}>
              <td>{task.status}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.type}</td>
              <td>
                <EditTaskDialog id={task._id} />
                <Button><DeleteIcon onClick={() => handleDeleteTask(task)} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }
  return (
    <>
      <div className='task-header'>
        <p className='task-header-title'><List fontSize="large" /> Tasks </p>
        <CreateTaskDialog />
      </div>
      <div className='task-filter-main'>

        <div className='filter-main'>
          <p style={{ margin: 0 }}>
            Filters
          </p>
          <Button
            onClick={() => handleChangeFilterType('overdue')}
            variant={taskFilterType === 'overdue' ? 'contained' : 'outlined'}
          >
            Overdue
          </Button>
          <Button
            onClick={() => handleChangeFilterType('upcoming')}
            variant={taskFilterType === 'upcoming' ? 'contained' : 'outlined'}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => handleChangeFilterType('in-progress')}
            variant={taskFilterType === 'in-progress' ? 'contained' : 'outlined'}
          >
            In Progress
          </Button>
          <Button
            onClick={() => handleChangeFilterType('total')}
            variant={taskFilterType === 'total' ? 'contained' : 'outlined'}
          >
            Total
          </Button>
        </div>
        <div className='search-main'>
          <TextField
            size='small'
            variant='outlined'
            placeholder='Search'
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
  )

}

export default Index