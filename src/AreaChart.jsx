import React from 'react';
import Plot from 'react-plotly.js';

const AreaChart = ({ data }) => {
  var plotData = [
    {
      x: data.map(function (el) {
        return el.income;
      }),
      y: data.map(function (el) {
        return el.population;
      }),
      fill: 'tozeroy',
      type: 'scatter',
      name: 'Vendor',
    },
  ];

  var layout = {
    xaxis: {
      type: 'log',
      range: [-3, 8],
    },
  };

  return <Plot data={plotData} layout={layout} />;
};

export default AreaChart;
