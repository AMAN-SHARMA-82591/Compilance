import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { taskFilterAction } from '../../../store/store';
import {
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import List from '@mui/icons-material/List';
import { deleteTask } from '../../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateTaskDialog from './common/CreateTaskDialog';
import EditTaskDialog from './common/EditTaskDialog';
import { formatStatus } from '../../Common/formatHelpers';

function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => {
    return state.taskList;
  });

  useEffect(() => {
    return () => {
      dispatch(taskFilterAction(''));
    }
  }, [dispatch]);

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
              <td className="status-cell">{formatStatus(task.status)}</td>
              <td className="title-cell">{task.title}</td>
              <td className="description-cell">{task.description}</td>
              <td className="type-cell">{formatStatus(task.type)}</td>
              <td className="actions-cell">
                <EditTaskDialog id={task._id} />
                <Button color='error' variant='outlined'><DeleteIcon onClick={() => handleDeleteTask(task)} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }
  return (
    <>
      <div className='people-create-header'>
        <h1>Tasks</h1>
        <div>
          <CreateTaskDialog />
        </div>
      </div>
      <div className='task-filter-main'>
        <div className='filter-main'>
          <p>
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
          <p>
            Search
          </p>
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