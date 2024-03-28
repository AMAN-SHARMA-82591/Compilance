import React from 'react'
import { makeStyles } from '@mui/styles'
import Donut from './common/Donut'
import People from './common/People'
import RecentlyAdded from './common/RecentlyAdded'
import "../../../App.css"
import ProgressOverview from './in-progress/ProgressOverview'
import Tasks from './common/Tasks'
import PlanMeeting from './common/PlanMeeting'

const styles = makeStyles(() => ({
  mainMenu: {
    display: 'grid',
    gridTemplateColumns: '80% 20%',
  },
  section1: {
    margin: '0',
    padding: '0px 50px',
  },
  section2: {
    margin: '0 10px',
  }
}));

function Index() {
  const classes = styles();
  return (
    <div className={classes.mainMenu}>
      <div className={classes.section1}>
        <ProgressOverview />
        <Tasks />
        <PlanMeeting />
      </div>
      <div className={classes.section2}>
        <Donut />
        <People />
        <RecentlyAdded />
      </div>
    </div>
  )
}

export default Index
