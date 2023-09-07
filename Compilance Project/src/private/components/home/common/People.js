
import React, { Component } from 'react';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Typography, Button, Avatar } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AvatarGroup from '@mui/lab/AvatarGroup';

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
    const { classes } = this.props;
    return (
      <div className={classes.peopleMain}>
        <div className={classes.heading}>
          <Typography variant='h6'>
            People
          </Typography>
          <Button size='small' variant='contained' color='secondary' endIcon={<ChevronRightIcon />}>
            View All
          </Button>
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

export default compose(withStyles(styles))(People);