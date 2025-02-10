import React, { useMemo } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "../../App.css";

function WeekTable() {
  const weekDays = useMemo(
    () => [
      { day: "Mon", date: 9 },
      { day: "Tue", date: 10 },
      { day: "Wed", date: 11 },
      { day: "Thu", date: 12 },
      { day: "Fri", date: 13 },
      { day: "Sat", date: 14 },
      { day: "Sun", date: 15 },
    ],
    []
  );

  return (
    <div className="week-table-container">
      <div className="week-table-container-items">
        <div className="date-section">
          <WatchLaterIcon fontSize="large" className="date-logo-item" />
        </div>
        <div className="week-section">
          {weekDays.map((item, index) => (
            <div key={index} className="week-items">
              <h1>{item.day}</h1>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
        <div className="calender-section">
          <CalendarTodayIcon fontSize="large" className="calender-logo-item" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(WeekTable);
