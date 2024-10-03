
import React, { Component } from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, Avatar } from '@mui/material';
import AvatarGroup from '@mui/lab/AvatarGroup';
import { withRouter } from 'react-router-dom';


const styles = () => ({
  peopleMain: {
    marginTop: '50px',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
});

class People extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.peopleMain}>
        <div className='task-heading'>
          <Typography variant='h4'>
            People
          </Typography>
          <button
            onClick={() => history.push('/people')}
          >

            View All
          </button>
        </div>
        <AvatarGroup style={{ width: '150px' }} max={4}>

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </div>
    );
  }
}

export default compose(withStyles(styles), withRouter)(People);