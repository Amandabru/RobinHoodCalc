import React, {useEffect} from "react";
import "./about.css";
import { Fade } from 'react-reveal';

const About = () => {
  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])
  return (
    <div className="AboutContainer">
      <Fade top delay={200} distance={'15%'} force={true}>
      <h1 className="titleAbout"> About</h1>
      </Fade>
      <Fade top delay={300} distance={'15%'} force={true}>
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
        <br></br>
        <p className="diamondStyle">◆ ◆ ◆</p>
        
      </p>
      </Fade>
      <Fade top delay={400} distance={'15%'} force={true}>
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
        <br></br>
        <p className="diamondStyle">◆ ◆ ◆</p>
      </p>
      </Fade>
      <Fade top delay={500} distance={'15%'} force={true}>
      <h2 className="headerPadding">Calculations</h2>
      <p className="textAbout">
        In this visualization, the user has two options for distributing the money resulting
        from the taxation of the rich. The user can choose between these two options with the radiobuttons above the chart.
        The <b>strict distribution</b>strictly gives the collected money to the poorest, which
        results in an accumulated peak as the people with the lowest income move up the income axis.
        The alternative <b>smooth distribution</b> is created to prevent such peaks from appearing and distributes the collected money in such a way that it
        goes first and foremost to the poorest, but controls the appearence of
        the chart. For both alternatives, a 4-point running average filter is applied in order
        to smooth the curve. For exact calculations, please
        visit our{" "}
        <a
          href=" https://github.com/Amandabru/RobinHoodCalc"
          target="blank"
          className="gapminderlink"
        >
          Github
        </a>{" "}
        for this project.
        <br></br>
        <p className="diamondStyle">◆ ◆ ◆</p>
      </p>
      </Fade>
      <Fade top delay={600} distance={'15%'} force={true}>
      <h2 className="headerPadding">Tools</h2>
      <p className="textAbout">
        This project is built using React and D3.js. Prototyping was done using
        Figma.
        <br></br>
        <p className="diamondStyle">◆ ◆ ◆</p>
      </p>
      </Fade>
      <Fade top delay={700} distance={'15%'} force={true}>
      <h2 className="headerPadding">References</h2>
      <p style={{ textAlign: "left" }}>
        [1] Chambers, J. R., Swan, L. K., & Heesacker, M. (2014). Better Off
        Than We Know: Distorted Perceptions of Incomes and Income Inequality in
        America. Psychological Science, 25(2), 613–618.
        <br></br>
        [2] Zucman, Gabriel. "Global wealth inequality." Annual Review of
        Economics 11 (2019): 109-138.
      </p>
      </Fade>
    </div>
  );
};

export default About;
