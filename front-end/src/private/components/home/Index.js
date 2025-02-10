import React from "react";
import { makeStyles } from "@mui/styles";
import Donut from "./common/Donut";
import People from "./common/People";
// import RecentlyAdded from './common/RecentlyAdded'
import "../../../App.css";
import ProgressOverview from "./in-progress/ProgressOverview";
import Tasks from "./common/Tasks";
// import PlanMeeting from './common/PlanMeeting'

const styles = makeStyles(() => ({
  mainMenu: {
    display: "grid",
    gridTemplateColumns: "75% 25%",
  },
  section1: {
    margin: "0",
    padding: "0px 50px",
  },
  section2: {
    height: "88vh",
    margin: "0 10px",
    overflowY: "auto",
  },
}));

function Index() {
  const classes = styles();
  return (
    <main className={classes.mainMenu}>
      <section className={classes.section1}>
        <ProgressOverview />
        <Tasks />
        {/* <PlanMeeting /> */}
      </section>
      <section className={classes.section2}>
        <Donut />
        <People />
        {/* <RecentlyAdded /> */}
      </section>
    </main>
  );
}

export default Index;
