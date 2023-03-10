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
      </p>
      <h2>Data</h2>
      <p className="textAbout">
        The data is taken from data sets made by{" "}
        <a
          href="https://www.gapminder.org/"
          target="blank"
          className="gapminder"
        >
          Gapminder
        </a>
        . The data contains information about the income distribution in the
        world and information about the ten richest people. The data sets can be
        found here and here.
      </p>
      <h2>Calculations</h2>
      <p className="textAbout">- Formel?</p>
      <h2>Tools</h2>
      <p className="textAbout">
        This project is built using React and D3.js. Prototyping was done using
        Figma.
      </p>

      <h2>References</h2>
      <br></br>
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
