import React from 'react';
import './howToUse.css';

const HowToUse = () => {
  return (
    <div className='howToUseContainer'>
      <h1 className> How to Use</h1>
      <h2>Contoll the tax rate</h2>
      <p>
        Use the sliders to control the marginal tax rate of five different
        income brackets. All taxed income goes directly to the people at the
        lowest income levels. See what it takes to move them beyond the line of
        extreme poverty.
      </p>
      <h2>What is marginal tax? </h2>
      <p>
        Marginal tax is the amount of tax that applies to each additional level
        of income. In our progressive tax system, people pay more in taxes as
        your income increases and a portion of your income moves into a higher
        tax bracket.
      </p>
      <h2>Example</h2>
      <p>
        For example, if the tax rate is set to 10% for incomes between 100-1K
        per day, and 15% for incomes between 1K-10K per day, then a person with
        a daily income of $8 K will pay 10 percent in taxes on income up to $1K
        and 15 % on the remaining $7K that falls into the 15 % bracket.
      </p>
    </div>
  );
};

export default HowToUse;
