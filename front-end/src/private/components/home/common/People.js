import React, { useState, useEffect } from "react";
import { compose } from "ramda";
import withStyles from "@mui/styles/withStyles";
import { Typography, Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useNavigate } from "react-router";
import { AvatarSkeleton } from "../../../Common/Skeleton";

const styles = () => ({
  peopleMain: {
    marginTop: "50px",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
});

function People({ classes }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 1500);
  }, []);

  return (
    <div className={classes.peopleMain}>
      <div className="task-heading">
        <Typography variant="h4">People</Typography>
        <button onClick={() => navigate("/people")}>View All</button>
      </div>

      {/* Show Skeleton when loading */}
      {loading ? (
        <AvatarSkeleton />
      ) : (
        <AvatarGroup style={{ width: "150px" }} max={4}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      )}
    </div>
  );
}

export default compose(withStyles(styles))(People);
