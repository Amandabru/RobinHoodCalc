import React from 'react';
import Plot from 'react-plotly.js';

const AreaChart = ({ data }) => {
  const copyData = data.map((data) => {
    return Object.assign({}, data);
  });
  var lol = [
    {
      x: copyData.map(function (el) {
        return el.income;
      }),
      y: copyData.map(function (el) {
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
      autorange: true,
    },
  };

  return <Plot data={lol} layout={layout} />;
};

export default AreaChart;
