import React, { useEffect } from "react";
import "./howToUse.css";
import taxLadder from "../../Images/taxladder.png";
import levels from "../../Images/levels.png";
import marginalTax from "../../Images/marginalTax.png";
import toggle from "../../Images/toggle.png";
import tenRichest from "../../Images/10richest.png";
import distributionOptions from "../../Images/distributionOptions.png";
import { Fade } from "react-reveal";

const HowToUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="howToUseContainer">
      <Fade top delay={100} distance={"30%"} force={true}>
        <h1 className="title"> How to Use</h1>
      </Fade>
      <Fade left delay={200} distance={"30%"} force={true}>
        <div className="leftSideInfo">
          <img
            src={taxLadder}
            className="ladderImage"
            alt={"Tax Ladder"}
            style={{ width: "25%", height: "15%", float: "right" }}
          ></img>
          <h2>The Robin Hood Taxation System</h2>
          <p className="text" style={{ width: "50%", float: "left" }}>
            The Robin Hood Taxation System enables you to tax the world's
            richest and directly redistribute to those with the lowest incomes.
            It is a progressive tax system where you set the{" "}
            <b>marginal tax rate</b> for five income brackets: $100-$1k,
            $1k-$10k, $10k-$100k, $100k-$1M, and $1M or more per day.
          </p>
        </div>
      </Fade>
      <Fade right delay={400} distance={"30%"} force={true}>
        <div className="rightSideInfo">
          <img
            src={marginalTax}
            alt={"Marginal Tax"}
            className="marginalTaxImage"
            style={{ width: "12%", float: "left" }}
          ></img>
          <h2 style={{ float: "right" }}>What is Marginal Tax? </h2>
          <p className="text" style={{ width: "50%", float: "right" }}>
            The marginal tax rate is the tax that applies to each additional
            level of income. In our progressive tax system, people pay more in
            taxes the higher their income is, and the brackets decide how much
            each share of income should be taxed.
            <br></br>
            <br></br>
            <b>For example</b>, if the tax rate is set to 10% for incomes
            between 100-1k $/day, and 15% for incomes between 1k-10k $/day, a
            person with an income of 8k $/day will pay 10% in taxes on income up
            to 1k $/day and 15% on the remaining 7k $/day that falls into the
            15% bracket.
          </p>
        </div>
      </Fade>
      <Fade left delay={600} distance={"30%"} force={true}>
        <div className="leftSideInfo">
          <img
            src={tenRichest}
            className="tenRichestImage"
            alt={"The ten richest"}
            style={{ width: "25%", float: "right" }}
          ></img>
          <h2>Tax the 10 Richest</h2>
          <p className="text" style={{ width: "50%", float: "left" }}>
            To further redistribute income, you can impose additional taxes on
            the top 10 richest individuals in the world. This tax applies to the
            remaining income after all other Robin Hood taxes have been
            implemented.
          </p>
        </div>
      </Fade>
      <Fade right delay={800} distance={"30%"} force={true}>
        <div className="rightSideInfo">
          <img
            src={distributionOptions}
            className="distributionImage"
            alt={"Distribution Options"}
            style={{ width: "40%", float: "left" }}
          ></img>
          <h2 style={{ float: "right" }}>Distribution</h2>
          <p className="text" style={{ width: "50%", float: "right" }}>
            You have two options for distributing the money resulting from the
            taxation of the rich. The <b>strict distribution </b> strictly gives
            the collected money to the people with the current lowest income,
            which results in an accumulated peak as they level with the people
            of higher incomes. The alternative <b>smooth distribution</b> also
            solely gives money to people with the current lowest income, but to
            avoid an accumulated peak at the current lowest income level, some
            may receive more than others. For exact calculations, please visit
            our{" "}
            <a
              href=" https://github.com/Amandabru/RobinHoodCalc"
              target="blank"
              className="gapminderlink"
            >
              Github
            </a>{" "}
          </p>
        </div>
      </Fade>
      <Fade left delay={1000} distance={"30%"} force={true}>
        <div className="leftSideInfo">
          <img
            src={toggle}
            className="toggleImage"
            alt={"Toggle"}
            style={{ width: "30%", float: "right" }}
          ></img>
          <h2 style={{ float: "left" }}>Toggle Y-Axis</h2>
          <p className="text" style={{ width: "50%", float: "left" }}>
            Our chart offers ways of visualizing the world's income
            distribution. You can switch between them by toggling the title on
            the y-axis. When <b>Population</b> is toggled, the chart plots the
            percentage of world population against income per day. When{" "}
            <b>Income</b> is toggled, the chart shows the percentages of the
            world's total income that lie within different ranges of income.
          </p>
        </div>
      </Fade>
      <Fade right delay={1200} distance={"30%"} force={true}>
        <div className="rightSideInfo">
          <img
            src={levels}
            className="levelsImage"
            alt={"Income Levels"}
            style={{ width: "30%", float: "left" }}
          ></img>
          <h2 style={{ float: "right" }}>Income Levels</h2>
          <p className="text" style={{ width: "50%", float: "right" }}>
            Below the chart, there are markings that divide the world population
            into 13 different income levels. These levels are based on the
            income levels from Gapminder, and more information about this
            sectioning can be found{" "}
            <a
              href="https://www.gapminder.org/fw/income-levels/ "
              target="blank"
              className="gapminderlink"
            >
              here
            </a>
            . When hovering over the income levels, you can see the lowest and
            highest income for that level, as well as the amount of people that
            are in that level.
          </p>
        </div>
      </Fade>
      <hr></hr>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ margin: "3%" }}>Video Demo</h2>
        <p>
          <iframe
            width="620"
            height="465"
            src="https://www.youtube.com/embed/h1up51TlT1c"
          ></iframe>
        </p>
      </div>
    </div>
  );
};

export default HowToUse;
