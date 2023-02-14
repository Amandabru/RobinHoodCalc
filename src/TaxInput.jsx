import React from 'react';

const TaxInput = ({ onTaxChange }) => {
  return (
    <div>
      <label>Level 2 Tax</label>
      <input type='range' />
      <label>Level 3 Tax </label>
      <input type='range' />
      <label>Level 4 Tax</label>
      <input
        type='range'
        min='0.5'
        max='1'
        step='0.1'
        onChange={(e) => {
          onTaxChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TaxInput;
