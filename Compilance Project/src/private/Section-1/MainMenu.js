/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import * as PropTypes from 'prop-types';
import { compose } from 'ramda'
import withStyles from '@mui/styles/withStyles';
import "../../App.css"
import ProgressOverview from './ProgressOverview';
import RecentlyMissed from './RecentlyMissed';
import PlanMeeting from './PlanMeeting';

const styles = () => ({
  mainMenu: {
    margin: '90px 0px 0px 90px',
    padding: '0px 50px',
  },
});

function MainMenu({ classes }) {
  return (
    <div className={classes.mainMenu}>
      <ProgressOverview />
      <RecentlyMissed />
      <PlanMeeting />
    </div>
  )
}

MainMenu.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(MainMenu)
