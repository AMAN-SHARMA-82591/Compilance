import React, { useState, useEffect } from "react";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CustomCard from "./CustomCard";
import { PeopleSkeleton } from "../../../Common/Skeleton";
import axiosInstance from "../../../Common/AxiosInstance";

const styles = () => ({
  peopleMain: {
    marginTop: "20px",
  },
});

function People({ classes }) {
  const navigate = useNavigate();
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const limit = 4;
        const fields = "name email image";
        const response = await axiosInstance.get(
          `/users/profile?limit=${limit}&fields=${fields}`
        );
        setPeopleList(response.data);
      } catch (error) {
        console.error("Error fetching profile list:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div className={classes.peopleMain}>
      <div className="task-heading">
        <Typography variant="h4">People</Typography>
        <button onClick={() => navigate("/people")}>View All</button>
      </div>
      {!loading ? (
        peopleList.length > 0 ? (
          peopleList.map((person, index) => (
            <CustomCard key={index} data={person} />
          ))
        ) : (
          <Typography variant="body1">No people found.</Typography>
        )
      ) : (
        Array(3)
          .fill(null)
          .map((_, index) => <PeopleSkeleton key={index} />)
      )}
    </div>
  );
}

export default compose(withStyles(styles))(People);
