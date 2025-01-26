
import React from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TaskField from '../../../Common/TaskField';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const styles = () => ({
  recentMain: {
    marginTop: '30px',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
});

function RecentlyAdded({ classes, history }) {
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.taskList);
  return (
    <div className={classes.recentMain}>
      <div className='task-heading'>
        <Typography variant='h4'>
          Today
        </Typography>
        <button
          onClick={() => navigate('/tasks')}
        >

          View All
        </button>
      </div>
      <Grid container spacing={3}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {data.taskList.slice(0, 4).map((task, i) => (
              <Grid key={i} item xs={12}>
                <TaskField data={task} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
}

export default compose(withStyles(styles))(RecentlyAdded);