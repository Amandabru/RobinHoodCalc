import React from 'react';
import './introduction.css';
import RadioButton from './RadioButton';
import {
  extremePovertyCounter,
  formatNumbers,
  extremePovertyPercentage,
} from '../Utils/index';

const Introduction = ({
  data,
  defaultData,
  totalCollectedMoney,
  distributionOption,
  setDistributionOption,
}) => {
  const smallOrMediumScreen = window.matchMedia('(max-width: 1024px)').matches;
  return (
    <div className='introduction'>
      Welcome to the <b>Robin Hood Calculator!</b> Here you can explore how the
      daily income distribution in the world would look like when you take from
      the rich and give to the poor. Interact with the Robin Hood Taxation
      System{' '}
      {smallOrMediumScreen ? (
        <span>down below</span>
      ) : (
        <span>to the right</span>
      )}{' '}
      to see what happens!
      <br></br>
      <br></br>
      <b>How do you want to redistribute?</b>
      <RadioButton
        selectedOption={distributionOption}
        onChange={(option) => setDistributionOption(option)}
      />
      <br></br>
      <div className='displayInfo'>
        You have now brought{' '}
        <b>
          {extremePovertyPercentage(data) === '0%'
            ? 'ALL ' +
              extremePovertyCounter(defaultData).toLocaleString('en-US')
            : (
                extremePovertyCounter(defaultData) - extremePovertyCounter(data)
              ).toLocaleString('en-US')}
        </b>{' '}
        people out of extreme poverty by redistributing{' '}
        <b> {formatNumbers(totalCollectedMoney)}$</b>.
      </div>
    </div>
  );
};

export default Introduction;
