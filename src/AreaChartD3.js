import React, { useState, useEffect, useRef } from 'react';
import {csv, select, scaleLinear, max, curveCardinal, min, scaleLog, area, axisBottom, axisLeft, line} from 'd3';


const csvUrl = 'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';


const AreaChartD3 = () => {
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
      .style("overflow", "visible")
      .style("margin-top", "30")
      .style("margin-left", "100");

      const xScale = scaleLog()
        .domain([minIncome, maxIncome])
        .range([0,w]);

      const yScale = scaleLinear()
        .domain([minPop,maxPop])
        .range([h,0]);

      const generateScaledArea = area()
        .x(d => xScale(+d.income))
        .y0(h)
        .y1(val => yScale(+val.population))
        .curve(curveCardinal);

      svg.selectAll(".area")
        .data([data])
        .join("path")
        .attr("d", d => generateScaledArea(d))
        .attr("fill", "#ffca34")
        .attr("stroke", "#ffca34");

      svg.append("line")
        .attr("stroke", "grey")
        .attr("x1", xScale(2))     
        .attr("y1", 0)     
        .attr("x2", xScale(2))     
        .attr("y2", h)
        .style("stroke-dasharray", ("3, 3"));

        const xAxis = axisBottom()
            .scale(xScale);

        const yAxis = axisLeft()
            .scale(yScale);

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${h})`);

        svg.append("g")
            .call(yAxis);

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
export default AreaChartD3;