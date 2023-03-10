import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="AboutContainer">
      <h1 className="titleAbout"> About</h1>
      <p className="textAbout">
        The Robin Hood Calculator is an interactive visualization tool. In this
        visualization you can see how income is distributed in the world, and
        you have the possibility to tax different income brackets or the ten
        richest individuals, with the goal of lifting people out of extreme
        poverty. Wealth inequality is an issue that is underestimated by many
        [1, 2], and this tool aims to raise awareness about the problem and help
        individuals understand the extent of the issue.
        <br></br>
        <br></br>
        This visualization has taken a lot of inspiration from{" "}
        <a
          href="https://www.gapminder.org/tools/#$ui$chart$showBilly:true;;&model$markers$mountain$data$filter$dimensions$geo$is--global:true;;;;&encoding$mu$scale$domain@:0.11&:100000000;;;&facet_row$data$constant=none;;;;&billy$encoding$x$data$concept=daily_income;;&name$data$concept=name;;&slices$data$concept=countries;;&selected$data$;;;;;;&chart-type=mountain&url=v1"
          target="blank"
          className="gapminder"
        >
          Gapminder's visualization  
        </a>
         of the world's wealth distribution. The idea was to imitate Gampinder's
        original visualization, but adding on the functionality of money redistribution.
      </p>
      <h2 className="headerPadding">Data</h2>
      <p className="textAbout">
        The data is taken from datasets made by{" "}
        <a
          href="https://www.gapminder.org/"
          target="blank"
          className="gapminder"
        >
          Gapminder
        </a>
        . The data contains information about the income distribution of the
        world and information about the ten richest people. The data sets can be
        found here and here.
      </p>
      <h2 className="headerPadding">Calculations</h2>
      <p className="textAbout">- Formel?</p>
      <h2 className="headerPadding">Tools</h2>
      <p className="textAbout">
        This project is built using React and D3.js. Prototyping was done using
        Figma.
      </p>

      <h2 className="headerPadding">References</h2>
      <p style={{ textAlign: "left" }}>
        [1] Chambers, J. R., Swan, L. K., & Heesacker, M. (2014). Better Off
        Than We Know: Distorted Perceptions of Incomes and Income Inequality in
        America. Psychological Science, 25(2), 613–618.
        <br></br>
        [2] Zucman, Gabriel. "Global wealth inequality." Annual Review of
        Economics 11 (2019): 109-138.
      </p>
    </div>
  );
};

export default About;
