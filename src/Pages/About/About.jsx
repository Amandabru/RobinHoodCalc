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
        This project was proposed by an employee at Gapminder with the aim to
        continue develop their visualization by adding the functionality of income
        redistribution. This visualization has therefore taken a lot of
        inspiration from{" "}
        <a
          href="https://www.gapminder.org/tools/#$ui$chart$showBilly:true;;&model$markers$mountain$data$filter$dimensions$geo$is--global:true;;;;&encoding$mu$scale$domain@:0.11&:100000000;;;&facet_row$data$constant=none;;;;&billy$encoding$x$data$concept=daily_income;;&name$data$concept=name;;&slices$data$concept=countries;;&selected$data$;;;;;;&chart-type=mountain&url=v1"
          target="blank"
          className="gapminderlink"
        >
          Gapminder's visualization
        </a>{" "}
        of the world's income distribution.
      </p>
      <h2 className="headerPadding">Data</h2>
      <p className="textAbout">
        The data in the visualization is from datasets assembled by{" "}
        <a
          href="https://www.gapminder.org/"
          target="blank"
          className="gapminderlink"
        >
          Gapminder
        </a>
        . The data contains information about the income distribution of the
        world and information about the ten richest people. The dataset
        containing data about the population in each income bracket can be found{" "}
        <a
          href="https://github.com/open-numbers/ddf--worldbank--povcalnet/blob/develop/income_mountain/ddf--datapoints--income_mountain_800bracket_shape_for_log--by--global--time.csv"
          target="blank"
          className="gapminderlink"
        >
          here
        </a>
        , and the correspoding income brackets (representing a specific income
        per day) can be found{" "}
        <a
          href="https://github.com/open-numbers/ddf--worldbank--povcalnet/blob/develop/ddf--entities--income_bracket_800.csv"
          target="blank"
          className="gapminderlink"
        >
          here
        </a>
        . There is a total of 800 income brackets and the used value for each
        bracket is the arithmetic average between the start and end of the
        bracket. The billionaire data can be found{" "}
        <a
          href="https://github.com/open-numbers/ddf--gapminder--billionaires/blob/master/ddf--datapoints--daily_income--by--person--time.csv"
          target="blank"
          className="gapminderlink"
        >
          here
        </a>
        .
      </p>
      <h2 className="headerPadding">Calculations</h2>
      <p className="textAbout">
        This visualization has two different types of distribution of income,
        which can be changed with the toggle on top. The calculations for the
        ... visualization simply gives the collected money to the poorest, which
        results in an accumulated peak when you start to move the sliders. The
        calculations use a running average in order to smooth out the curve a
        little. The second calculation is made to prevent such peaks from
        appearing, and distributes the collected money in such a way that it
        goes first and foremost to the poorest, but controls the appearence of
        the chart, making the curve smoother. For exact calculations, please
        visit our{" "}
        <a
          href=" https://github.com/Amandabru/RobinHoodCalc"
          target="blank"
          className="gapminderlink"
        >
          Github
        </a>{" "}
        for this project.
      </p>
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
