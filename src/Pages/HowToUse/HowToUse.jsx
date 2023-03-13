import React, {useEffect}from "react";
import "./howToUse.css";
import taxLadder from "../../Images/taxladder.png";
import levels from "../../Images/levels.png";
import marginalTax from "../../Images/marginalTax.png";
import toggle from "../../Images/toggle.png";
import dollarSign from "../../Images/dollarSign.png";
import distributionOptions from "../../Images/distributionOptions.png";
import { Fade } from 'react-reveal';

const HowToUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    }, [])
  return (
    <div className="howToUseContainer">
      <Fade top delay={100} distance ={'30%'} force={true}>
      <h1 className="title"> How to Use</h1>
      </Fade>
      <Fade left delay={200} distance ={'30%'} force={true}>
      <div className="leftSideInfo">
        <img
          src={taxLadder}
          className="ladderImage"
          alt={"Tax Ladder"}
          style={{ width: "25%", height: "15%", float: "right" }}
        ></img>
        <h2>The Robin Hood Taxation System</h2>
        <p className="text" style={{ width: "50%", float: "left" }}>
          The Robin Hood Taxation System allows you to tax the world’s richest
          and watch as the money moves directly to the people at the lowest
          income levels. It is a progressive taxation system where you control
          the <b>marginal rate of taxation</b> for five different income
          brackets. The five income brackets are: 100-1k, 1k-10k, 10k-100k,
          100k-1M & ≥ 1M $/day.
        </p>
      </div>
      </Fade>
      <Fade right delay={400} distance ={'30%'} force={true}>
      <div className="rightSideInfo">
        <img
          src={marginalTax}
          alt={"Marginal Tax"}
          className="marginalTaxImage"
          style={{ width: "12%", float: "left" }}
        ></img>
        <h2 style={{ float: "right" }}>What is Marginal Tax? </h2>
        <p className="text" style={{ width: "50%", float: "right" }}>
          Marginal tax is the amount of tax that applies to each additional
          level of income. In our progressive tax system, people pay more in
          taxes the higher their income is, and the brackets decides how much
          each share of income should be taxed.
          <br></br>
          <br></br>
          <b>For example</b>, if the tax rate is set to 10% for incomes between
          100-1k $/day, and 15% for incomes between 1k-10k $/day, then a person
          with an income of 8k $/day will pay 10% in taxes on income up to 1k
          $/day and 15% on the remaining 7k $/day that falls into the 15%
          bracket.
        </p>
      </div>
      </Fade>
      <Fade left delay={600} distance ={'30%'} force={true}>
      <div className="leftSideInfo">
        <img
          src={dollarSign}
          className="dollarImage"
          alt={"Dollar"}
          style={{ width: "17%", float: "right" }}
        ></img>
        <h2>Tax Billionaires</h2>
        <p className="text" style={{ width: "50%", float: "left" }}>
          You can also tax the ten richest people in the world and see how a
          specific percentage of all of their daily income would affect the
          total income distribution. When taxing a billionaire, you can see how
          they move down the x-axis and how it would affect their daily income.
        </p>
      </div>
      </Fade>
      <Fade right delay={800} distance ={'30%'} force={true}>
      <div className="rightSideInfo">
        <img
          src={distributionOptions}
          className="distributionImage"
          alt={"Distribution Options"}
          style={{ width: "40%", float: "left" }}
        ></img>
        <h2 style={{ float: "right" }}>Distribution</h2>
        <p className="text" style={{ width: "50%", float: "right" }}>
        You have two options for distributing the money resulting
        from the taxation of the rich. The <b>strict distribution </b>strictly gives the collected money to the poorest, which
        results in an accumulated peak as the people with the lowest income move up the income axis.
        The alternative <b>smooth distribution</b> also gives money to the poorest first and foremost, but in a way that controls the appearence of
        the chart. For exact calculations, please
        visit our{" "}
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
      <Fade left delay={1000} distance ={'30%'} force={true}>
      <div className="leftSideInfo">
      <img
          src={toggle}
          className="toggleImage"
          alt={"Toggle"}
          style={{ width: "35%", float: "right" }}
        ></img>
        <h2 style={{ float: "left" }}>Toggle Y-Axis</h2>
        <p className="text" style={{ width: "50%", float: "left" }}>
          Our chart offers two different types of vizualisations of the world's
          income distribution. You can switch between the two vizualisations by
          toggling the title on the y-axis. When <b>Population</b> is toggled,
          the chart plots the percentage of world population against income per
          day. When <b>Income Accumulation</b> is toggled, the chart shows the
          amount of money (in percentage) that lies within each income level.
        </p>
      </div>
      </Fade>
      <Fade right delay={1200} distance ={'30%'} force={true}>
      <div className="rightSideInfo">
      <img
          src={levels}
          className="levelsImage"
          alt={"Income Levels"}
          style={{ width: "30%", float: "left" }}
        ></img>
        <h2 style={{ float: "right" }}>Income Levels</h2>
        <p className="text" style={{ width: "50%", float: "right" }}>
          Below the chart, there are markings which divide the world population
          into 13 different income levels. These levels are based on the income
          levels from Gapminder, and more information about this sectioning can
          be found{" "}
          <a
            href="https://www.gapminder.org/fw/income-levels/ "
            target="blank"
            className="clickLink"
          >
            here
          </a>
          . When hovering over the income levels, you can see the lowest
          and highest income for that level, as well as the amount of people
          that are in that level.
        </p>
      </div>
      </Fade>
      <h2></h2>
    </div>
  );
};

export default HowToUse;
