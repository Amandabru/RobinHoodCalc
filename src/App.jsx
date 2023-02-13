

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {csv, request, scaleBand, scaleLinear, max} from 'd3';


const csvUrl = 'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const width = 960;
const height = 500;


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if(!data){
    return <pre>Loading...</pre>;
  }


  const xScale = scaleBand()
  .domain(data.map(d => d.income))
  .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => +d.population)])
    .range([0,height]);

  return (
    <svg width = {width} height = {height}>
      {data.map(d => <rect 
        x={xScale(d.income)} 
        y={height - yScale(+d.population)} 
        width={xScale.bandwidth()} 
        height={height}
        />
      )}
    </svg>
  );
}

export default App;
