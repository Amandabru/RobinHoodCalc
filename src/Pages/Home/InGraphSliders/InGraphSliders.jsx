import React, { useState } from 'react';
import './inGraphSliders.css';

function CustomSlider({ onTaxChange, taxes }) {
  return (
    <div className='sliders'>
      <div className='slider-container'>
        <input
          className='inGraphSlider'
          type='range'
          min='0'
          max='1'
          step='0.001'
          value={taxes[1].taxRate}
          onChange={(e) => {
            onTaxChange(1, e.target.value);
          }}
        />
        <div className='hoverLine' style={{ marginTop: -400*taxes[1].taxRate, left: '405px', top: '500px'}}>
        {(100*taxes[1].taxRate).toFixed(1) + "%"}
        </div>
      </div>
      <div className='slider-container'>
        <input
          className='inGraphSlider'
          type='range'
          min='0'
          max='1'
          step='0.001'
          value={taxes[2].taxRate}
          onChange={(e) => {
            onTaxChange(2, e.target.value);
          }}
        />
        <div className='hoverLine' style={{ marginTop: -400*taxes[2].taxRate, left: '460px', top: '500px'}}>
        {(100*taxes[2].taxRate).toFixed(1) + "%"}
        </div>
      </div>
      <div className='slider-container'>
        <input
          className='inGraphSlider'
          type='range'
          min='0'
          max='1'
          step='0.001'
          value={taxes[3].taxRate}
          onChange={(e) => {
            onTaxChange(3, e.target.value);
          }}
        />
        <div className='hoverLine' style={{ marginTop: -400*taxes[3].taxRate, left: '515px', top: '500px'}}>
        {(100*taxes[3].taxRate).toFixed(1) + "%"}
        </div>
      </div>
      <div className='slider-container'>
        <input
          className='inGraphSlider'
          type='range'
          min='0'
          max='1'
          step='0.001'
          value={taxes[4].taxRate}
          onChange={(e) => {
            onTaxChange(4, e.target.value);
          }}
        />
        <div className='hoverLine' style={{ marginTop: -400*taxes[4].taxRate, left: '570px', top: '500px'}}>
        {(100*taxes[4].taxRate).toFixed(1) + "%"}
        </div>
      </div>
      <div className='slider-container'>
        <input
          className='inGraphSlider'
          type='range'
          min='0'
          max='1'
          step='0.001'
          value={taxes[5].taxRate}
          onChange={(e) => {
            onTaxChange(5, e.target.value);
          }}
        />
        <div className='hoverLine' style={{ marginTop: -400*taxes[5].taxRate, left: '625px', top: '500px'}}>
        {(100*taxes[5].taxRate).toFixed(1) + "%"}
        </div>
      </div>
    </div>
  );
}

export default CustomSlider;
