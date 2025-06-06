import React from "react";
import Chart from "react-apexcharts";

function Donut({ data }) {
  const state = {
    options: {},
    series: [data.overdue || 5, data.upcoming || 0, data.in_progress || 0],
    labels: ["Overdue", "Upcoming", "In-Progress"],
  };

  return (
    <div className="donut">
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="250"
      />
    </div>
  );
}

export default React.memo(Donut);
