import React from 'react';
import './taxSlider.css';

const TaxSlider = ({ onTaxChange }) => {
  return (
    <div className='taxSlider'>
      <label>Level 4 Tax</label>
      <input
        type='range'
        min='0'
        max='1'
        step='0.001'
        defaultValue={0}
        onChange={(e) => {
          onTaxChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TaxSlider;
