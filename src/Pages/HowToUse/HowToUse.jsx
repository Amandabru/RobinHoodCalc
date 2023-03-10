import React from 'react';
import './howToUse.css';
import taxLadder from "../../Images/taxladder.png";
import levels from "../../Images/levels.png";
import marginalTax from "../../Images/marginalTax.png";
import toggle from "../../Images/toggle.png";


const HowToUse = () => {
  return (
    <div className='howToUseContainer'>
      <h1 className = 'title'> How to Use</h1>
      <div className='leftSideInfo'>
      <img src={taxLadder} className='ladderImage' style={{width:'25%', height:'15%', float:'right'}} ></img>
        <h2>The Robin Hood Taxation System</h2>
        <p className='text' style={{width: '50%', float: 'left'}}>
          The Robin Hood Taxation System allows you as a user to tax the world’s
          richest and watch as the money moves directly to the people at the
          lowest income levels. It is a progressive taxation system where you as a
          user control the <b>marginal rate of taxation</b> for five different
          income brackets.
        </p>
      </div>
      <div className='rightSideInfo'>
      <img src={marginalTax} className='marginalTaxImage' style={{width:'14%', float:'left'}} ></img>
        <h2 style={{float:'right'}}>What is Marginal Tax? </h2>
        <p className='text' style={{width: '50%', float: 'right'}}>
          Marginal tax is the amount of tax that applies to each additional level
          of income. In our progressive tax system, people pay more in taxes as
          your income increases and a portion of your income moves into a higher
          tax bracket.
          <br></br>
          <br></br>
          <b>For example</b>, if the tax rate is set to 10% for incomes between 100-1K
          per day, and 15% for incomes between 1K-10K per day, then a person with
          a daily income of $8 K will pay 10 percent in taxes on income up to $1K
          and 15 % on the remaining $7K that falls into the 15 % bracket.
        </p>
      </div>
      <div className='leftSideInfo'>
      <img src={levels} className='levelsImage' style={{width:'30%', float:'right'}} ></img>
        <h2>Income Levels</h2>
        <p className='text' style={{width: '50%', float: 'left'}}>
        Below the chart, there are markings which divide the world population into 
        13 different income levels. These levels are based on the income levels from Gapminder,
        and more information about this sectioning can be found <a href='https://www.gapminder.org/fw/income-levels/ '>here</a>
        </p>
      </div>
      <div className='rightSideInfo'>
      <img src={toggle} className='toggleImage' style={{width:'35%', float:'left'}} ></img>
        <h2 style={{float:'right'}}>Different Vizualisations</h2>
        <p className='text' style={{width: '50%', float: 'right'}}>
        Our chart offers two different types of vizualisations of the world's wealth distribution. 
        You can switch between the two vizualisations by toggling the title on the y-axis.
        When <b>Population</b> is toggled, the chart shows the number of people that has a specific income 
        of $/day.
        When <b>Income Accumulation</b> is toggled, the chart shows the precentage of total income (per day)
        which a specific income per day is.
        </p>
      </div>
  
      <h2>Video Demonstration</h2>
    </div>
  );
};

export default HowToUse;
