import React, { useRef, useEffect } from 'react';
import {
  select,
  scaleLinear,
  max,
  min,
  scaleLog,
  area,
  axisBottom,
  axisLeft,
  curveMonotoneX,
  brushX
} from 'd3';

const AreaChartD3 = ({ data }) => {
  const svgRef = useRef();
  const w = 500;
  const h = 300;

  var minIncome = min(data, (d) => d.income);
  var maxIncome = max(data, (d) => d.income);
  var maxPop = max(data, (d) => d.population);
  var minPop = min(data, (d) => d.population);

  useEffect(() => {
    const svg = select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '30')
      .style('margin-left', '100')
      .style('margin-bottom', '50');

    svg.selectAll('*').remove();

    const xScale = scaleLog().domain([minIncome, maxIncome]).range([0, w]);
    const yScale = scaleLinear().domain([minPop, maxPop]).range([h, 0]);

    const generateScaledArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScale(val.population))
      .curve(curveMonotoneX);

    svg
      .selectAll('.area')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledArea(d))
      .attr('fill', '#ffca34')
      .attr('stroke', '#ffca34');

    svg
      .append('line')
      .attr('stroke', 'grey')
      .attr('x1', xScale(2))
      .attr('y1', 0)
      .attr('x2', xScale(2))
      .attr('y2', h)
      .style('stroke-dasharray', '3, 3');

    const xAxis = axisBottom().scale(xScale);

    const yAxis = axisLeft().scale(yScale);

    svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);

    svg.append('g').call(yAxis);

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 1)
      .attr('cx', (value) => xScale(value.income))
      .attr('cy', (value) => yScale(value.population))
      .attr('stroke', 'red')
    // brush
    const brush = brushX()
      .extent([[0,0], [w,h]]);

    svg.select(".brush").call(brush).call(brush.move, [1,100]);

  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className = "brush" />
      </svg>
    </React.Fragment>
  );
};
export default AreaChartD3;
