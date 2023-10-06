import React from 'react';
import './taxPopulation.css';

const TaxPopulation = ({ onTaxChange, clearAllTaxes, taxes }) => {
  return (
    <div>
      <header className='taxHeader'>
        <div className='titleContainer headTitle'>
          <h2 className='titleText'>Tax the Rich</h2>
          <button
            className='btn'
            onClick={() => {
              clearAllTaxes();
            }}
          >
            Clear All
          </button>
        </div>
        <p className='taxationDescription'>
          The Robin Hood Taxation System taxes the world’s richest and
          redistributes directly to the people with the lowest income. The
          system is progressive and you as user control the marginal rate of
          taxation for five different income brackets.
        </p>
      </header>
      <div className='titleContainer'>
        <h4 className='smallerTitleText'> Income Bracket ($/day) </h4>
        <h4 className='marginalTax smallerTitleText'>
          {' '}
          Marginal Tax Rate
          <div
            className='info'
            style={{
              marginLeft: '5px',
              color: 'gray',
            }}
          >
            ?
            <span className='infoText'>
              Marginal tax rate is the tax rate that applies to each additional
              level of income. In this progressive tax system, people pay more
              in taxes as their income increases and a portion of their income
              moves into a higher income bracket.
            </span>
          </div>
        </h4>
      </div>
      <div className='boxSliderContainer'>
        <div>
          <h4 className='smallerTitleText'>100-1k</h4>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            value={taxes[1].taxRate}
            onChange={(e) => {
              onTaxChange(1, e.target.value);
            }}
          />
        </div>
        <div className='percetageBoxWrapper'>
          <input
            className={'percentageBox'}
            type='number'
            min='0'
            max='100'
            step='0.1'
            value={parseFloat((taxes[1].taxRate * 100).toFixed(1)).toString()}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value).toFixed(1);
              if (e.target.value == '') {
                onTaxChange(1, 0);
              } else {
                onTaxChange(1, e.target.value / 100);
              }
            }}
            onFocus={(e) => {
              if (e.target.value == 0) {
                e.target.value = '';
              }
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                e.target.value = 0;
              }
            }}
          />
          <span className='percentageSymbol'> % </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <div>
          <h4 className='smallerTitleText'>1k-10k</h4>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            value={taxes[2].taxRate}
            onChange={(e) => {
              onTaxChange(2, e.target.value);
            }}
          />
        </div>
        <div className='percetageBoxWrapper'>
          <input
            className='percentageBox'
            type='number'
            min='0'
            max='100'
            step='0.1'
            value={parseFloat((taxes[2].taxRate * 100).toFixed(1)).toString()}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value).toFixed(1);

              onTaxChange(2, e.target.value / 100);
            }}
            onFocus={(e) => {
              if (e.target.value == 0) {
                e.target.value = '';
              }
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                e.target.value = 0;
              }
            }}
          />
          <span className='percentageSymbol'> % </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <div>
          <h4 className='smallerTitleText'>10k-100k</h4>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            value={taxes[3].taxRate}
            onChange={(e) => {
              onTaxChange(3, e.target.value);
            }}
          />
        </div>
        <div className='percetageBoxWrapper'>
          <input
            className='percentageBox'
            type='number'
            min='0'
            max='100'
            step='0.1'
            value={parseFloat((taxes[3].taxRate * 100).toFixed(1)).toString()}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value).toFixed(1);

              onTaxChange(3, e.target.value / 100);
            }}
            onFocus={(e) => {
              if (e.target.value == 0) {
                e.target.value = '';
              }
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                e.target.value = 0;
              }
            }}
          />
          <span className='percentageSymbol'> % </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <div>
          <h4 className='smallerTitleText'>100k-1M</h4>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            value={taxes[4].taxRate}
            onChange={(e) => {
              onTaxChange(4, e.target.value);
            }}
          />
        </div>
        <div className='percetageBoxWrapper'>
          <input
            className='percentageBox'
            type='number'
            min='0'
            max='100'
            step='0.1'
            value={parseFloat((taxes[4].taxRate * 100).toFixed(1)).toString()}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value).toFixed(1);

              onTaxChange(4, e.target.value / 100);
            }}
            onFocus={(e) => {
              if (e.target.value == 0) {
                e.target.value = '';
              }
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                e.target.value = 0;
              }
            }}
          />
          <span className='percentageSymbol'> % </span>
        </div>
      </div>

      <div className='boxSliderContainer'>
        <div>
          <h4 className='smallerTitleText'>≥ 1M </h4>
          <input
            className='boxSlider'
            type='range'
            min='0'
            max='1'
            step='0.001'
            value={taxes[5].taxRate}
            onChange={(e) => {
              onTaxChange(5, e.target.value);
            }}
          />
        </div>
        <div className='percetageBoxWrapper'>
          <input
            className='percentageBox'
            type='number'
            min='0'
            max='100'
            step='0.1'
            value={parseFloat((taxes[5].taxRate * 100).toFixed(1)).toString()}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value).toFixed(1);

              onTaxChange(5, e.target.value / 100);
            }}
            onFocus={(e) => {
              if (e.target.value == 0) {
                e.target.value = '';
              }
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                e.target.value = 0;
              }
            }}
          />
          <span className='percentageSymbol'> % </span>
        </div>
      </div>

      <hr
        width='100%'
        style={{
          marginTop: '15px',
        }}
      ></hr>
    </div>
  );
};

export default TaxPopulation;
