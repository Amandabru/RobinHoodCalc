import React, { useRef, useEffect } from "react";

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
  pointer,
  text,
  invert,
  selection,
  index,
} from "d3";
import "./circleStyle.css";
import arnault from "../../../Images/bernard_arnault.png";
import gates from "../../../Images/bill_gates.png";
import musk from "../../../Images/elon_musk.png";
import bezos from "../../../Images/jeff_bezos.png";
import ellison from "../../../Images/larry_ellison.png";
import brin from "../../../Images/sergey_brin.png";
import page from "../../../Images/larry_page.png";
import ballmer from "../../../Images/steve_ballmer.png";
import buffett from "../../../Images/warren_buffett.png";
import peauch from "../../../Images/bertrand_peuch.jpeg";

const AreaChartD3 = ({
  data,
  ExtremePovertyCount,
  billionaries,
  peopleCounter,
  taxValue,
  wealthToggle,
  levelCounter,
}) => {
  let changingData = data[0];
  let defaultData = data[1];
  changingData = changingData.filter(function (d) {
    return d.income > 0.1;
  });
  defaultData = defaultData.filter(function (d) {
    return d.income > 0.1;
  });
  //const wealthDataNew = wealthData[0];
  //const wealthDataDefault = wealthData[1];
  const yAxisLabelPop = "Population %";
  const yAxisLabelWealth = "Wealth %";
  const wealthToggled = wealthToggle;
  const svgRef = useRef();
  const w = 600;
  const h = 400;
  const imag = [
    ballmer,
    peauch,
    ellison,
    brin,
    page,
    buffett,
    gates,
    arnault,
    bezos,
    musk,
  ];

  // var minIncome = min(changingData, (d) => d.income);
  var maxIncome = max(changingData, (d) => d.income);
  var maxPop = max(changingData, (d) => d.population);
  var minPop = min(changingData, (d) => d.population);

  let xScale = scaleLog().domain([0.1, maxIncome]).range([0, w]).nice();
  const yScaleLeft = scaleLinear().domain([minPop, maxPop]).range([h, 0]);
  const yScaleRight = scaleLinear().domain([0, 100]).range([h, 0]);

  useEffect(() => {
    const svg = select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "30")
      .style("margin-left", "100")
      .style("margin-bottom", "50");

    const AxisXformat = [
      "1",
      "10",
      "100",
      "1000",
      "10000",
      "100000",
      "1000000",
      "10000000",
      "100000000",
    ];

    // income levels
    const levels = [
      2, 8, 32, 128, 512, 2048, 8192, 32768, 131072, 524288, 2097152, 8388608,
      33554432,
    ];

    const levelLabels = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    ];

    // remove
    selectAll("#axis").remove();
    selectAll("#chagningArea").remove();
    selectAll("#poverty").remove();
    selectAll("#povertyText").remove();
    selectAll("#defaultArea").remove();
    selectAll("#amountOfPeopleLeft").remove();
    selectAll("#amountOfPeopleRight").remove();
    selectAll("#levelAxis").remove();
    selectAll("#levelRect").remove();
    selectAll("#topLine").remove();
    selectAll("#levelInfo").remove();

    // brush
    /*
    const brush = brushX().extent([
      [0, 0],
      [w, h],
    ]);

    svg.select(".brush").call(brush).call(brush.move, [0, 0]);
    */

    // x axis label (income)
    svg
      .style("font", "12px cairo")
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", w - 5)
      .attr("y", h - 5)
      .text("($/day)")
      .attr("id", "axis");

    // left y axis label
    var axisLabelXLeft = -35;
    var axisLabelY = -25;

    if (!wealthToggled) {
      svg
        .append("text")
        .attr(
          "transform",
          "translate(" + axisLabelXLeft + ", " + axisLabelY + ")"
        )
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 6)
        .attr("dy", ".75em")
        .text("Population (%)")
        .attr("id", "axis");
    } else {
      svg
        .append("text")
        .attr(
          "transform",
          "translate(" + axisLabelXLeft + ", " + axisLabelY + ")"
        )
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("y", 6)
        .attr("dy", ".75em")
        .text("Wealth (%)")
        .attr("id", "axis");
    }

    // right yaxis lable
    svg
      .append("text")
      .attr("transform", "translate(" + w + ", " + axisLabelY + ")")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", 6)
      .attr("dy", ".75em")
      .text("Robin Hood tax (%)")
      .attr("id", "axis");

    // Default chart
    const generateDefaultArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScaleLeft(val.population));

    svg
      .selectAll("#defaultArea")
      .data([defaultData])
      .enter()
      .append("path")
      .attr("d", (d) => generateDefaultArea(d))
      .attr("fill", "#ffca34")
      .attr("stroke", "#ffca34")
      .style("opacity", "0.4")
      .attr("id", "defaultArea");

    // area chart
    const generateScaledArea = area()
      .x((d) => xScale(d.income))
      .y0(h)
      .y1((val) => yScaleLeft(val.population))
      .curve(curveMonotoneX);

    svg
      .selectAll("#chagningArea")
      .data([changingData])
      .enter()
      .append("path")
      .attr("d", (d) => generateScaledArea(d))
      .attr("fill", "#ffca34")
      .attr("stroke", "#ffca34")
      .attr("id", "chagningArea");

    // billionaries
    var defs = svg.append("defs");

    defs
      .selectAll(".billionaires")
      .data(billionaries)
      .enter()
      .append("pattern")
      .attr("class", "billionaires")
      .attr("id", function (d) {
        return d.billionaire.toLowerCase().replace(/ /g, "-");
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", function (d) {
        return imag[d.images];
      });

    selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    const highlight = function (d, i) {
      selectAll(".circle").style("opacity", 0.4);
      select(this).style("opacity", 1).attr("r", 13).moveToFront();

      select(".bigCircle")
        .style("opacity", 1)
        .attr("fill", select(this).attr("fill"));

      select(".infoTextName").text(i.billionaire);

      let textIncome = "";
      if (i.income > 100000)
        textIncome = (i.income / 1000000).toFixed(1) + " M$/day";
      else textIncome = i.income + " $/day";

      select(".infoTextDollar").text(textIncome);
    };

    const highlightOff = function (d, i) {
      selectAll(".circle").style("opacity", 1).attr("r", 10);

      select(".bigCircle").style("opacity", 0);

      select(".infoTextName").text("");

      select(".infoTextDollar").text("");
    };

    svg
      .selectAll(".circle")
      .data(billionaries)
      .join("circle")
      .attr("r", 10)
      .attr("cx", (d) => xScale(d.income))
      .attr("cy", function (d) {
        let counter = 0;
        for (const obj of billionaries) {
          if (Math.log(Math.abs(obj.income - d.income)) < 14) {
            if (obj.billionaire === d.billionaire) {
              break;
            }
            counter += 1;
          }
        }
        return yScaleLeft(maxPop / 25 + counter * (maxPop / 20));
      })
      .attr("fill", function (d) {
        return "url(#" + d.billionaire.toLowerCase().replace(/ /g, "-") + ")";
      })
      .attr("class", "circle")
      .on("mouseover", highlight)
      .on("mouseleave", highlightOff)
      .attr("id", function (d) {
        if (d.added && d.active) {
          select(this).moveToFront();
          return "bill";
        } else return "";
      });

    function animate(circle) {
      circle
        .transition()
        .duration(1000)
        .attr("r", 13)
        .transition()
        .duration(1000)
        .attr("r", 10);
    }

    // Hover over billionaire
    svg
      .append("circle")
      .attr("r", 30)
      .attr("cx", xScale(10000))
      .attr("cy", 100)
      .attr("class", "bigCircle")
      .attr("stroke", "#ffca34")
      .style("opacity", 0);

    svg
      .append("text")
      .style("font-size", "20px")
      .attr("x", xScale(50000))
      .attr("y", 90)
      .attr("class", "infoTextName");

    svg
      .append("text")
      .style("font-size", "20px")
      .attr("x", xScale(50000))
      .attr("y", 120)
      .attr("class", "infoTextDollar");

    // Line from inGraphSliders
    svg
      .append("line")
      .attr("stroke", "grey")
      .attr("x1", 0)
      .attr("y1", yScaleRight(taxValue))
      .attr("x2", w)
      .attr("y2", yScaleRight(taxValue))
      .style("opacity", 0.2)
      .attr("id", "topLine");

    // extreme poverty line
    svg
      .append("line")
      .attr("stroke", "grey")
      .attr("x1", xScale(2))
      .attr("y1", 0)
      .attr("x2", xScale(2))
      .attr("y2", h)
      .style("stroke-dasharray", "3, 3")
      .attr("id", "poverty");

    svg
      .append("text")
      .attr("x", -380)
      .attr("y", xScale(1.5))
      .attr("font-size", 13)
      .attr("fill", "gray")
      .text("Extreme poverty")
      .attr("transform", "rotate(-90)")
      .attr("id", "povertyText");

    svg
      .append("text")
      .attr("x", xScale(0.4))
      .attr("y", 170)
      .attr("font-size", 20)
      .attr("fill", "gray")
      .text(ExtremePovertyCount)
      .attr("id", "povertyText");

    // amount of people
    svg
      .append("text")
      .attr("y", 170)
      .attr("font-size", 20)
      .attr("fill", "gray")
      .attr("id", "amountOfPeopleLeft")
      .style("opacity", 0);

    svg
      .append("text")
      .attr("y", 170)
      .attr("font-size", 20)
      .attr("fill", "gray")
      .attr("id", "amountOfPeopleRight")
      .style("opacity", 0);

    // axis
    const xAxis = axisBottom().scale(xScale).tickValues(AxisXformat);

    const yAxisLeft = axisLeft().scale(yScaleLeft);

    const yAxisRight = axisRight().scale(yScaleRight);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h})`)
      .attr("id", "axis");

    svg.append("g").call(yAxisLeft).attr("id", "axis");

    svg
      .append("g")
      .call(yAxisRight)
      .attr("transform", `translate(${w}, 0)`)
      .attr("id", "axis");

    // moving gray line
    svg
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", w)
      .attr("height", 25)
      .attr("y", 403)
      .on("mouseover", (e) => {
        selectAll("#povertyText").style("opacity", 0);
        selectAll("#poverty")
          .attr("x1", pointer(e)[0])
          .attr("x2", pointer(e)[0]);
      })
      .on("mousemove", (e) => {
        let text = peopleCounter(xScale.invert(pointer(e)[0]));
        selectAll("#poverty")
          .attr("x1", pointer(e)[0])
          .attr("x2", pointer(e)[0]);
        selectAll("#amountOfPeopleLeft")
          .style("opacity", 1)
          .attr("text-anchor", "end")
          .attr("x", pointer(e)[0] - 8)
          .text(text[0]);

        selectAll("#amountOfPeopleRight")
          .style("opacity", 1)
          .attr("x", pointer(e)[0] + 8)
          .text(text[1]);
      })
      .on("mouseleave", mouseout);

    // level axis + moving box

    svg
      .append("text")
      .attr("y", 100)
      .attr("font-size", 12)
      .attr("fill", "gray")
      .attr("id", "levelInfo")
      .style("opacity", 0);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 33)
      .attr("height", h)
      .attr("stroke", "black")
      .attr("fill", "gray")
      .style("opacity", 0)
      .attr("id", "levelRect");

    levels.forEach((d, i) => {
      svg
        .append("text")
        .attr("fill", "#f6c944")
        .attr("font-size", 15)
        .attr("text-anchor", "middle")
        .attr("x", xScale(d))
        .attr("y", h + 40)
        .text("◆")
        .style("cursor", "default")
        .attr("id", "levelAxis");

      svg
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 15)
        .attr("text-anchor", "middle")
        .attr("x", xScale(d) - 21) // :))
        .attr("y", h + 40)
        .text(levelLabels[i])
        .style("cursor", "default")
        .attr("id", "levelAxis")
        .on("mouseenter", () => {
          selectAll("#levelRect")
            .attr("x", xScale(levels[i - 1]))
            .attr("width", () => {
              if (Number.isNaN(xScale(levels[i]) - xScale(levels[i - 1]))) {
                return xScale(2);
              } else {
                return xScale(levels[i]) - xScale(levels[i - 1]);
              }
            })
            .style("opacity", 0.2);

          if (i <= 7) {
            selectAll("#levelInfo")
              .style("opacity", 1)
              .attr("x", xScale(levels[i]) + 10)
              .text("Level " + (i + 1))
              .attr("text-anchor", "start")
              .append("svg:tspan")
              .attr("x", xScale(levels[i]) + 10)
              .attr("dy", 20)
              .text(() => {
                if (levels[i - 1] == undefined) {
                  return (
                    "Income: " +
                    "<" +
                    levels[i].toLocaleString("en-US") +
                    " $/day"
                  );
                } else {
                  return (
                    "Income: " +
                    levels[i - 1].toLocaleString("en-US") +
                    "-" +
                    levels[i].toLocaleString("en-US") +
                    " $/day"
                  );
                }
              })
              .append("svg:tspan")
              .attr("x", xScale(levels[i]) + 10)
              .attr("dy", 20)
              .text("People: ~" + levelCounter(levels[i - 1], levels[i]));
          } else if (i > 7) {
            selectAll("#levelInfo")
              .style("opacity", 1)
              .attr("x", xScale(levels[i]) - 50)
              .text("Level " + (i + 1))
              .attr("text-anchor", "end")
              .append("svg:tspan")
              .attr("x", xScale(levels[i]) - 50)
              .attr("dy", 20)
              .text(() => {
                if (levels[i - 1] == undefined) {
                  return (
                    "Income: " +
                    "<" +
                    levels[i].toLocaleString("en-US") +
                    " $/day"
                  );
                } else {
                  return (
                    "Income: " +
                    levels[i - 1].toLocaleString("en-US") +
                    "-" +
                    levels[i].toLocaleString("en-US") +
                    " $/day"
                  );
                }
              })
              .append("svg:tspan")
              .attr("x", xScale(levels[i]) - 50)
              .attr("dy", 20)
              .text("People: ~" + levelCounter(levels[i - 1], levels[i]));
          }
        })
        .on("mouseout", mouseout);
    });

    // mouse out function

    function mouseout() {
      selectAll("#povertyText").style("opacity", 1);
      selectAll("#poverty").attr("x1", xScale(2)).attr("x2", xScale(2));
      selectAll("#amountOfPeopleLeft").style("opacity", 0);
      selectAll("#amountOfPeopleRight").style("opacity", 0);
      selectAll("#levelRect").style("opacity", 0);
      selectAll("#levelInfo").style("opacity", 0);
    }

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
        <g className="brush" />
      </svg>
    </React.Fragment>
  );
};

export default AreaChartD3;
