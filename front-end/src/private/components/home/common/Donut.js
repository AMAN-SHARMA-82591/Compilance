import React from "react";
import Chart from "react-apexcharts";

function Donut() {
  const state = {
    options: {},
    series: [17, 25, 31],
    labels: [0, 1, 2],
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
