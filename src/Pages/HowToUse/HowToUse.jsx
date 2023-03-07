import React from 'react';
import './howToUse.css';

const HowToUse = () => {
  return (
    <div className='howToUseContainer'>
      <h1 className = 'title'> How to Use</h1>
      <h2>The Robin Hood Taxation System</h2>
      <p className='text'>
        The Robin Hood Taxation System allows you as a user to tax the world’s
        richest and watch as the money moves directly to the people at the
        lowest income levels. It is a progressive taxation system where you as a
        user control the <b>marginal rate of taxation</b> for five different
        income brackets.
      </p>
      <h2>What is Marginal Tax? </h2>
      <p className='text'>
        Marginal tax is the amount of tax that applies to each additional level
        of income. In our progressive tax system, people pay more in taxes as
        your income increases and a portion of your income moves into a higher
        tax bracket.
      </p>
      <h2>Example</h2>
      <p className='text'>
        For example, if the tax rate is set to 10% for incomes between 100-1K
        per day, and 15% for incomes between 1K-10K per day, then a person with
        a daily income of $8 K will pay 10 percent in taxes on income up to $1K
        and 15 % on the remaining $7K that falls into the 15 % bracket.
      </p>
      <h2>Video Demonstration</h2>
    </div>
  );
};

export default HowToUse;
