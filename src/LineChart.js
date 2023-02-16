import React, { useState, useEffect, useRef } from 'react';
import {csv, select, scaleLinear, max, line, curveCardinal, min, scaleLog} from 'd3';


const csvUrl = 'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';


const LineChart = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  useEffect(() => {
    if(data){
    
      const w = 700;
      const h = 500;

      var minIncome = min(data, d => +d.income);
      var maxIncome = max(data, d => +d.income);
      var maxPop = max(data, d => +d.population);
      var minPop = min(data, d => +d.population);


      const svg = select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3');

      const xScale = scaleLog()
        .domain([minIncome, maxIncome])
        .range([0,w]);

      const yScale = scaleLinear()
        .domain([minPop,maxPop])
        .range([h,0]);


      const generateScaledLine = line()
        .x(d => xScale(+d.income))
        .y(val => yScale(+val.population))
        .curve(curveCardinal);

      svg.selectAll(".line")
        .data([data])
        .join("path")
        .attr("d", d => generateScaledLine(d))
        .attr("fill", "none")
        .attr("stroke", "black");


        svg
        .selectAll("circle")
        .data(data)
        .join("circle")
          .attr("r", value => 4)
          .attr("cx", value => xScale(+value.income))
          .attr("cy", value => yScale(+value.population))
          .attr("stroke", "red")
          .attr("fill", "black");
    }
  }, [data]);

  if(!data){
    return <pre>Loading...</pre>;
  } 

  return <React.Fragment>
    <svg ref={svgRef}></svg>
    <br/>
 
  </React.Fragment>;
}
export default LineChart;