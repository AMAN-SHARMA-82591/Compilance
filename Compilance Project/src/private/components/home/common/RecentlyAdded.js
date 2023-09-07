
import React, { Component } from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, Button, Grid } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentlyMissedField from '../../../Common/RecentlyMissedField';

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

class RecentlyAdded extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.recentMain}>
        <div className={classes.heading}>
          <Typography variant='h6'>
            Today
          </Typography>
          <Button size='small' variant='contained' color='secondary' endIcon={<ChevronRightIcon />}>
            View All
          </Button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentlyMissedField />
          </Grid>
          <Grid item xs={12}>
            <RecentlyMissedField />
          </Grid>
          <Grid item xs={12}>
            <RecentlyMissedField />
          </Grid>
          <Grid item xs={12}>
            <RecentlyMissedField />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(withStyles(styles))(RecentlyAdded);