import { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Donut from "./common/Donut";
import People from "./common/People";
// import RecentlyAdded from './common/RecentlyAdded'
import "../../../App.css";
import ProgressOverview from "./in-progress/ProgressOverview";
import Tasks from "./common/Tasks";
import axiosInstance from "../../Common/AxiosInstance";
import { handleApiError } from "../../Common/ErrorHandler";
import { toastError } from "../../Common/ToastContainer";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    overdue: 0,
    upcoming: 0,
    in_progress: 0,
    total: 0,
  });

  const getProgressOverviewCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/tasks/progressOverview");
      if (response.data) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      const { message } = handleApiError(error);
      setLoading(false);
      toastError(message);
    }
  }, []);

  useEffect(() => {
    getProgressOverviewCount();
  }, [getProgressOverviewCount]);

  const classes = styles();
  return (
    <main className={classes.mainMenu}>
      <section className={classes.section1}>
        <ProgressOverview data={data} loading={loading} />
        <Tasks />
        {/* <PlanMeeting /> */}
      </section>
      <section className={classes.section2}>
        <Donut data={data} />
        <People />
        {/* <RecentlyAdded /> */}
      </section>
    </main>
  );
}

export default Index;
