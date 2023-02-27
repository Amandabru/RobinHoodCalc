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
  selectAll,
} from 'd3';

const AreaChartD3 = ({ data, ExtremePovertyCount }) => {
  const changingData = data[0];
  const defaultData = data[1];
  const svgRef = useRef();
  const w = 500;
  const h = 300;

  var minIncome = min(changingData, (d) => d.income);
  var maxIncome = max(changingData, (d) => d.income);
  var maxPop = max(changingData, (d) => d.population);
  var minPop = min(changingData, (d) => d.population);

  useEffect(() => {
    const svg = select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-top', '30')
      .style('margin-left', '100')
      .style('margin-bottom', '50');

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

    // remove
    selectAll('#axis').remove();
    selectAll('#chagningArea').remove();
    selectAll('#poverty').remove();
    selectAll('#defaultArea').remove();

    //brush
    const brush = brushX().extent([
      [0, 0],
      [w, h],
    ]);

    svg.select('.brush').call(brush).call(brush.move, [0, 0]);

    // x axis label
    svg
      .style('font', '12px times')
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', w)
      .attr('y', h + 35)
      .text('Income ($/day)')
      .attr('id', 'axis');

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
      .text('Population (%)')
      .attr('id', 'axis');

    // right yaxis lable
    svg
      .append('text')
      .attr('transform', 'translate(' + w + ', ' + axisLabelY + ')')
      .attr('class', 'y label')
      .attr('text-anchor', 'middle')
      .attr('y', 6)
      .attr('dy', '.75em')
      .text('Robin Hood tax (%)')
      .attr('id', 'axis');

    // Default chart

    const generateDefaultArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScaleLeft(val.population))
      .curve(curveMonotoneX);

    svg
      .selectAll('#defaultArea')
      .data([defaultData])
      .enter()
      .append('path')
      .attr('d', (d) => generateDefaultArea(d))
      .attr('fill', '#ffca34')
      .attr('stroke', '#ffca34')
      .style('opacity', '0.4')
      .attr('id', 'defaultArea');

    // area chart
    const generateScaledArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScaleLeft(val.population))
      .curve(curveMonotoneX);

    svg
      .selectAll('#chagningArea')
      .data([changingData])
      .enter()
      .append('path')
      .attr('d', (d) => generateScaledArea(d))
      .attr('fill', '#ffca34')
      .attr('stroke', '#ffca34')
      .attr('id', 'chagningArea');

    // extreme poverty line
    svg
      .append('line')
      .attr('stroke', 'grey')
      .attr('x1', xScale(2))
      .attr('y1', 0)
      .attr('x2', xScale(2))
      .attr('y2', h)
      .style('stroke-dasharray', '3, 3')
      .attr('id', 'poverty');

    svg
      .append('text')
      .attr('x', -270)
      .attr('y', xScale(1.5))
      .attr('font-size', 11)
      .attr('fill', 'grey')
      .text('Extreme poverty: ' + ExtremePovertyCount)
      .attr('transform', 'rotate(-90)')
      .attr('id', 'poverty');

    svg
      .append('text')
      .attr('x', -183)
      .attr('y', xScale(1.5))
      .attr('font-size', 14)
      .attr('fill', 'gray')
      .text('%')
      .attr('transform', 'rotate(-90)')
      .attr('id', 'poverty');

    // axis
    const xAxis = axisBottom().scale(xScale).tickValues(AxisXformat);

    const yAxisLeft = axisLeft().scale(yScaleLeft);

    const yAxisRight = axisRight().scale(yScaleRight);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`)
      .attr('id', 'axis');

    svg.append('g').call(yAxisLeft).attr('id', 'axis');

    svg
      .append('g')
      .call(yAxisRight)
      .attr('transform', `translate(${w}, 0)`)
      .attr('id', 'axis');

    // data circles
    /*
    svg
      .selectAll('circle')
      .data(changingData)
      .join('circle')
      .attr('r', 1)
      .attr('cx', (value) => xScale(value.income))
      .attr('cy', (value) => yScaleLeft(value.population))
      .attr('stroke', 'red')
      .attr("id", "chagningArea");
      */
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
