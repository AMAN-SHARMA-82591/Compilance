
import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [17, 25,31],
      labels: [0, 1, 2]
    }
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="250" />
      </div>
    );
  }
}

export default Donut;