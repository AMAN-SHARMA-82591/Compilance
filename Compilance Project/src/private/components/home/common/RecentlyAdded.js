
import React from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { withRouter } from 'react-router-dom';
import TaskField from '../../../Common/TaskField';
import { useSelector } from 'react-redux';

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

  const { data, isLoading } = useSelector((state) => state.taskList);
  return (
    <div className={classes.recentMain}>
      <div className='task-heading'>
        <Typography variant='h4'>
          Today
        </Typography>
        <button
          onClick={() => history.push('/tasks')}
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

export default compose(withStyles(styles), withRouter)(RecentlyAdded);