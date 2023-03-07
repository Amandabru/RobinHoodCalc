import React, { useState } from 'react';
import Toggle from '../Toggle/Toggle';
import { v4 as uuidv4 } from 'uuid';
import './taxbillionaires.css';

function TaxBillionaires({
  billionaires,
  onIndividualTaxChange,
  individualTaxes,
  clearAllIndividualTaxes,
}) {
  const [selectedBillionaire, setSelectedBillionaire] = useState('');
  const [billionaireList, setBillionaireList] = useState([]);

  function handleOptionChange(e) {
    const selected = e.target.value;
    if (selected !== '') {
      const newBillionaire = billionaires.find(
        (billionaire) => billionaire.billionaire === selected
      );
      if (newBillionaire) {
        setBillionaireList([
          { ...newBillionaire, id: newBillionaire.billionaire }, //uuidv4()
          ...billionaireList,
        ]);
      }
      setSelectedBillionaire('');
    }
  }
  function handleRemoveDiv(id) {
    if (id) {
      const newDivs = billionaireList.filter((div) => div.id !== id);
      setBillionaireList(newDivs);
    } else {
      setBillionaireList([]);
    }
  }

  function formatIncome(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + 'k';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  }

  return (
    <header
      style={{
        padding: '15px',
      }}
    >
      <div className='titleContainer headTitle'>
        <h2>
          Tax the 10 Richest
          <div
            className='info'
            style={{
              marginLeft: '10px',
              color: 'gray',
            }}
          >
            ?
            <span className='infoText'>
              Add specific billionaires to assign them individual taxes
            </span>
          </div>
        </h2>
        <button
          className='btn'
          onClick={() => {
            handleRemoveDiv();
            clearAllIndividualTaxes();
          }}
        >
          Clear All
        </button>
      </div>
      <div
        style={{
          padding: '15px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <select
            className='dropdown'
            value={selectedBillionaire}
            onChange={handleOptionChange}
          >
            <option value=''>Add billionaire</option>
            {billionaires.map((billionaire) => (
              <option
                key={billionaire.billionaire}
                disabled={
                  selectedBillionaire === billionaire.billionaire ||
                  billionaireList.some(
                    (b) => b.billionaire === billionaire.billionaire
                  )
                }
              >
                {billionaire.billionaire}
              </option>
            ))}
          </select>
        </div>
        {billionaireList.map((billionaire) => (
          <div className='billionaireEntry' key={billionaire.billionaire}>
            <button
              className='cancelButton'
              onClick={() => {
                handleRemoveDiv(billionaire.id);
                onIndividualTaxChange(billionaire.billionaire, 0);
              }}
            >
              x
            </button>
            <div className='billionaireContent'>
              <div className='containerLeft'>
                <div className='nameAndIncome'>
                  <p className='name'> {billionaire.billionaire} </p>
                  <p className='income'>
                    {formatIncome(billionaire.income)} $/day
                  </p>
                </div>
                <input
                  className='slider'
                  type='range'
                  min='0'
                  max='1'
                  step='0.001'
                  value={
                    individualTaxes.find(
                      (b) => b.billionaire === billionaire.billionaire
                    ).individualTax
                  }
                  onChange={(e) => {
                    onIndividualTaxChange(
                      billionaire.billionaire,
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className='containerRight'>
                <div className='taxRate'>
                  <p className='taxTitle'>
                    {' '}
                    Tax Rate
                    <div
                      className='moreInfo'
                      style={{
                        marginLeft: '5px',
                        color: 'gray',
                      }}
                    >
                      ?
                      <span className='moreInfoText'>
                        Tax sdfaskdfjaskldf bskfbas jbfjsdfksdjf sdfsbdkf.
                      </span>
                    </div>
                  </p>
                  <div className='percetageBoxWrapper1'>
                    <input
                      className={'percentage'}
                      type='text'
                      inputMode='numeric'
                      value={parseFloat(
                        individualTaxes.find(
                          (b) => b.billionaire === billionaire.billionaire
                        ).individualTax * 100
                      ).toFixed(0)}
                      onInput={(e) => {
                        if (e.target.value >= 100) {
                          e.target.value = 100;
                        } else if (isNaN(e.target.value)) {
                          e.target.value = 0;
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.value == '') {
                          onIndividualTaxChange(billionaire.billionaire, 0);
                        } else {
                          onIndividualTaxChange(
                            billionaire.billionaire,
                            e.target.value / 100
                          );
                        }
                      }}
                    />
                    <span className='percentageSymbol'> % </span>
                  </div>
                </div>
                <div className='toggle'>
                  <Toggle />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default TaxBillionaires;
