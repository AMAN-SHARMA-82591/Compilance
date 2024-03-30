
import React, { Component } from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, Button, Grid, CircularProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { withRouter } from 'react-router-dom';
import TaskField from '../../../Common/TaskField';
import { useSelector } from 'react-redux';

const styles = () => ({
  recentMain: {
    marginTop: '50px',
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
      <div className={classes.heading}>
        <Typography variant='h6'>
          Today
        </Typography>
        <Button
          size='small'
          color='secondary'
          variant='contained'
          onClick={() => history.push('/tasks')}
          endIcon={<ChevronRightIcon />}
        >
          View All
        </Button>
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