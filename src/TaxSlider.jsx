import React from 'react';
import './taxSlider.css';

const TaxSlider = ({ onTaxChange, taxRate }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: 'fit-content',
      }}
    >
      <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>
        Take From The Rich
      </h2>
      <div className='boxSliderContainer'>
        <label>100-1k $/day</label>
        <div>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            onChange={(e) => {
              onTaxChange(1, e.target.value);
            }}
          />
          <span
            style={{
              border: '1px solid black',
              padding: '3px',
              marginLeft: '15px',
            }}
          >
            {parseFloat((taxRate[1].taxRate * 100).toFixed(3))}%
          </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <label>1k-10k $/day</label>
        <div>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            onChange={(e) => {
              onTaxChange(2, e.target.value);
            }}
          />
          <span
            style={{
              border: '1px solid black',
              padding: '3px',
              marginLeft: '15px',
            }}
          >
            {parseFloat((taxRate[2].taxRate * 100).toFixed(3))}%
          </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <label>10k-100k $/day</label>
        <div>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            onChange={(e) => {
              onTaxChange(3, e.target.value);
            }}
          />
          <span
            style={{
              border: '1px solid black',
              padding: '3px',
              marginLeft: '15px',
            }}
          >
            {parseFloat((taxRate[3].taxRate * 100).toFixed(3))}%
          </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <label>100k-1M $/day</label>
        <div>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            onChange={(e) => {
              onTaxChange(4, e.target.value);
            }}
          />
          <span
            style={{
              border: '1px solid black',
              padding: '3px',
              marginLeft: '15px',
            }}
          >
            {parseFloat((taxRate[4].taxRate * 100).toFixed(3))}%
          </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <label>1M $/day</label>
        <div>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            onChange={(e) => {
              onTaxChange(5, e.target.value);
            }}
          />
          <span
            style={{
              border: '1px solid black',
              padding: '3px',
              marginLeft: '15px',
            }}
          >
            {parseFloat((taxRate[5].taxRate * 100).toFixed(3))}%
          </span>
        </div>
      </div>
      <hr width='80%'></hr>
      <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>
        Individual Tax for Billionaires
      </h2>
      <span>coming soon :))</span>
    </div>
  );
};

export default TaxSlider;
