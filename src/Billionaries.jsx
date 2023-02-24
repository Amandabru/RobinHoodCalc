import React, { useRef, useEffect, useState } from 'react';
import {
  csv,
  select,
  scaleLog,
  scaleLinear,
  min,
  max,
  axisBottom,
  axisLeft,
} from 'd3';
import './circleStyle.css';
import image1 from './Image1.jpg';
import image2 from './Image2.jpg';
import image3 from './image3.jpg';

const url =
  'https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/782b43454bcd0446542efbe44a1fd2872b457972/billionairesData.csv';

const Billionaries = () => {
  const [data, setData] = useState();
  const svgRef = useRef();
  const w = 700;
  const h = 500;
  const images = [
    image1,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image3,
    image3,
  ];

  useEffect(() => {
    csv(url).then(setData);
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      var maxIncome = max(data, (d) => d.income);
      const xScale = scaleLog().domain([1000000, maxIncome]).range([0, w]);
      const yScale = scaleLinear().domain([0, 3]).range([h, 0]);

      const svg = select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('overflow', 'visible')
        .style('margin-top', '30')
        .style('margin-left', '100')
        .style('margin-bottom', '50');

      var defs = svg.append('defs');

      defs
        .selectAll('.billionaires')
        .data(data)
        .enter()
        .append('pattern')
        .attr('class', 'billionaires')
        .attr('id', function (d) {
          return d.billionaire.toLowerCase().replace(/ /g, '-');
        })
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('patternContentUnits', 'objectBoundingBox')
        .append('image')
        .attr('height', 1)
        .attr('width', 1)
        .attr('preserveAspectRatio', 'none')
        .attr('xlink:href', function (d) {
          return images[d.images];
        });

      svg
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 20)
        .attr('cx', (d) => xScale(d.income))
        .attr('cy', function (d) {
          let counter = 0;
          for (const obj of data) {
            if (obj.income == d.income) {
              if (obj.billionaire == d.billionaire) {
                break;
              }
              counter += 1;
            }
          }
          return yScale(0.2 + counter * 0.3);
        })
        .attr('fill', function (d) {
          return 'url(#' + d.billionaire.toLowerCase().replace(/ /g, '-') + ')';
        })
        .attr('class', 'circle');

      const xAxis = axisBottom().scale(xScale);

      const yAxis = axisLeft().scale(yScale);

      svg.append('g').call(xAxis).attr('transform', `translate(0, ${h})`);

      svg.append('g').call(yAxis);
    }
  }, [data]);

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  );
};

export default Billionaries;
