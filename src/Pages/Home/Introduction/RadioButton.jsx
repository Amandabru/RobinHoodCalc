import React, { useState } from 'react';
import './radioButton.css';

const RadioButton = ({ selectedOption, onChange }) => {
  const [option, setOption] = useState(selectedOption);

  const handleOptionChange = (changeEvent) => {
    setOption(changeEvent.target.value);
    onChange(changeEvent.target.value);
  };

  return (
    <div className='radioButtonsContainer'>
      <div
        className='distributionInfo'
        style={{ marginLeft: '5px', color: 'gray' }}
      >
        <label className='radioButtonContainer'>
          {' '}
          Smooth Distribution
          <input
            type='checkbox'
            value={'Avoid Population Accumulation'}
            onChange={(e) => handleOptionChange(e)}
            checked={option === 'Avoid Population Accumulation'}
          />
          <span className='checkmark'></span>
        </label>
        <span className='distributionText'>
          Distributes to the people at the current lowest income, but to avoid
          population accumulation, some will receive more than others, making it
          more expensive to move people out of poverty.
        </span>
      </div>
      <div
        className='distributionInfo'
        style={{ marginLeft: '5px', color: 'gray' }}
      >
        <label className='radioButtonContainer'>
          Strict Distribution
          <input
            type='checkbox'
            value={'To Lowest Paid Only'}
            onChange={(e) => handleOptionChange(e)}
            checked={option === 'To Lowest Paid Only'}
          />
          <span className='checkmark'></span>
        </label>
        <span className='distributionText'>
          Distributes to the people with the current lowest income, cumulatively
          moving them up the income axis as tax rates increase.
        </span>
      </div>
    </div>
  );
};

export default RadioButton;
