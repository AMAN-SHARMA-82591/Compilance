import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Typography } from "@mui/material";
import "../../../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { taskFilterAction } from "../../../../store/actions";
import { useNavigate } from "react-router";
import { ProgressOverviewSkeleton } from "../../../Common/Skeleton";
import axiosInstance from "../../../Common/AxiosInstance";

const colorPallet = ["#E74C3C", "#5B6EE1", "#F4B942", "#1ABC9C"];

const styles = () => ({
  progressMain: {
    display: "flex",
    maxWidth: "100%",
    width: "1200px",
    height: "220px",
    alignItems: "end",
    marginBottom: "50px",
    justifyContent: "space-between",
  },
  progressbox: {
    width: "240px",
    height: "180px",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "20px",
    color: "white",
    cursor: "pointer",
  },
});

function ProgressOverview({ classes }) {
  const [data, setData] = useState({
    overdue: 0,
    upcoming: 0,
    in_progress: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProgressOverviewCount() {
      setLoading(true);
      const response = await axiosInstance.get("/tasks/progressOverview");
      if (response.data) {
        setData(response.data);
        setLoading(false);
      }
    }
    getProgressOverviewCount();
  }, []);

  const handleChange = (type) => {
    dispatch(taskFilterAction(type));
    navigate("/tasks");
  };

  return (
    <div className={classes.progressMain}>
      {!loading ? (
        <>
          <div
            onClick={() => handleChange("overdue")}
            className={classes.progressbox}
            style={{ background: "#e9523f" }}
          >
            <Typography variant="h1">{data.overdue}</Typography>
            <Typography>Overdue</Typography>
          </div>
          <div
            onClick={() => handleChange("upcoming")}
            className={classes.progressbox}
            style={{ background: "#6773fd" }}
          >
            <Typography variant="h1">{data.upcoming}</Typography>
            <Typography>Upcoming</Typography>
          </div>
          <div
            onClick={() => handleChange("in-progress")}
            className={classes.progressbox}
            style={{ background: "#f8b84a" }}
          >
            <Typography variant="h1">{data.in_progress}</Typography>
            <Typography>In Progress</Typography>
          </div>
          <div
            onClick={() => handleChange("total")}
            className={classes.progressbox}
            style={{ background: "#1da193" }}
          >
            <Typography variant="h1">{data.total}</Typography>
            <Typography>Total</Typography>
          </div>
        </>
      ) : (
        Array(4)
          .fill(null)
          .map((_, i) => (
            <ProgressOverviewSkeleton
              key={i}
              color={colorPallet[i]}
              width={200}
              height={140}
            />
          ))
      )}
    </div>
  );
}

ProgressOverview.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(ProgressOverview);
