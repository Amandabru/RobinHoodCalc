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
  axisRight,
  curveMonotoneX,
  brushX,
} from 'd3';

const AreaChartD3 = ({ data, ExtremePovertyCount }) => {
  const svgRef = useRef();
  const w = 600;
  const h = 400;

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

    const AxisXformat = [
      '1',
      '10',
      '100',
      '1000',
      '10000',
      '100000',
      '1000000',
      '10000000',
      '100000000',
    ];

    let xScale = scaleLog().domain([minIncome, maxIncome]).range([0, w]).nice();

    const yScaleLeft = scaleLinear().domain([minPop, maxPop]).range([h, 0]);
    const yScaleRight = scaleLinear().domain([0, 100]).range([h, 0]);

    // area chart
    const generateScaledArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScaleLeft(val.population))
      .curve(curveMonotoneX);

    svg
      .selectAll('.area')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledArea(d))
      .attr('fill', '#ffca34')
      .attr('stroke', '#ffca34');

    // extreme poverty line
    svg
      .append('line')
      .attr('stroke', 'grey')
      .attr('x1', xScale(2))
      .attr('y1', 0)
      .attr('x2', xScale(2))
      .attr('y2', h)
      .style('stroke-dasharray', '3, 3');

    // x axis label
    svg
      .style('font', '12px times')
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', w)
      .attr('y', h + 35)
      .text('Income ($/day)');

    // left y axis label
    var axisLabelXLeft = -35;
    var axisLabelY = -25;
    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + axisLabelXLeft + ', ' + axisLabelY + ')'
      )
      .attr('class', 'y label')
      .attr('text-anchor', 'middle')
      .attr('y', 6)
      .attr('dy', '.75em')
      .text('Population (%)');

    var axisLabelXRight = w + 30;

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + axisLabelXRight + ', ' + axisLabelY + ')'
      )
      .attr('class', 'y label')
      .attr('text-anchor', 'middle')
      .attr('y', 6)
      .attr('dy', '.75em')
      .text('Equality tax (%)');

    svg
      .append('text')
      .attr('x', -270)
      .attr('y', xScale(1.5))
      .attr('font-size', 13)
      .attr('fill', 'black')
      .text('People in extreme poverty: ' + ExtremePovertyCount)
      .attr('transform', 'rotate(-90)');

    // axis
    const xAxis = axisBottom().scale(xScale).tickValues(AxisXformat);

    const yAxisLeft = axisLeft().scale(yScaleLeft);

    const yAxisRight = axisRight().scale(yScaleRight);

    // data circles
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);

    svg.append('g').call(yAxisLeft);

    svg.append('g').call(yAxisRight).attr('transform', `translate(${w}, 0)`);

    svg.append('g').call(yAxisRight).attr('transform', `translate(${w}, 0)`);

    /*svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 1)
      .attr("cx", (value) => xScale(value.income))
      .attr("cy", (value) => yScaleLeft(value.population))
      .attr("stroke", "red");*/
    // brush
    const brush = brushX().extent([
      [0, 0],
      [w, h],
    ]);

    svg.select('.brush').call(brush).call(brush.move, [1, 100]);
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className='brush' />
      </svg>
    </React.Fragment>
  );
};
export default AreaChartD3;
