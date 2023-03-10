import React from 'react';
import './introduction.css';
import {
  extremePovertyCounter,
  formatNumbers,
  extremePovertyPercentage,
} from '../Utils/index';

const Introduction = ({ data, defaultData, totalCollectedMoney }) => {
  return (
    <div className='introduction'>
      Welcome to the <b>Robin Hood Calculator!</b> Here you can investigate how
      the wealth distribution of the world would look like when taking from the
      rich and giving to the poor. Use the sliders to the right and se what
      happens!
      <br></br>
      <br></br>
      You have now succesfully brought{' '}
      <b>
        {extremePovertyPercentage(data) === '0%'
          ? 'ALL'
          : (
              extremePovertyCounter(defaultData) - extremePovertyCounter(data)
            ).toLocaleString('en-US')}
      </b>{' '}
      people out of extreme poverty by redistributing{' '}
      <b>{formatNumbers(totalCollectedMoney)}</b>$.
    </div>
  );
};

export default Introduction;
