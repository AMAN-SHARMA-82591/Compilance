import React from 'react'
import { makeStyles } from '@mui/styles'
import "../../../App.css"
import ProfileInfo from './common/profileinfo'


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
   <div>
    <ProfileInfo />
   </div>
   
  )
}

export default Index
