import React, { useEffect, useState } from 'react';
import Toggle from '../Toggle/Toggle';
import './taxbillionaires.css';
import { formatNumbers } from '../Utils/index';
import { isElementOfType } from 'react-dom/test-utils';

function TaxBillionaires({
  billionaires,
  selectedBillionaires,
  setSelectedBillionaires,
}) {
  const [selectedBillionaire, setSelectedBillionaire] = useState('');

  function handleOptionChange(e) {
    const selected = e.target.value;
    if (selected !== '') {
      const newBillionaire = billionaires.find(
        (billionaire) => billionaire.billionaire === selected
      );
      if (newBillionaire) {
        setSelectedBillionaires([
          { ...newBillionaire, individualTax: 0, active: true },
          ...selectedBillionaires,
        ]);
      }
      setSelectedBillionaire('');
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  function handleToggle(billionaire, toggleState) {
    setSelectedBillionaires(
      selectedBillionaires.map((b) => {
        if (b.billionaire === billionaire) {
          return { ...b, active: !toggleState };
        } else return { ...b };
      })
    );
  }

  function handleRemoveBillionaire(billionaire) {
    if (billionaire) {
      const newDivs = selectedBillionaires.filter(
        (b) => b.billionaire !== billionaire
      );
      setSelectedBillionaires(newDivs);
    } else {
      setSelectedBillionaires([]);
    }
  }

  function handleIndividualTaxChange(billionaire, newTax) {
    setSelectedBillionaires(
      selectedBillionaires.map((b) => {
        if (b.billionaire === billionaire) {
          return { ...b, individualTax: newTax };
        } else return { ...b };
      })
    );
  }

  return (
    <header
      style={{
        padding: '2em',
      }}
    >
      <div className='titleContainer headTitle'>
        <h2>Tax the 10 Richest</h2>
        <button
          className='btn'
          onClick={() => {
            handleRemoveBillionaire();
          }}
        >
          Clear All
        </button>
      </div>
      <p className='taxTheRichDescription'>
        Specify additional tax rates for the top ten richest. This additional
        tax is applied to the income that remains after all other Robin Hood
        taxes have been imposed.
      </p>
      <div>
        <div style={{ display: 'flex' }}>
          <select
            value={selectedBillionaire}
            className='dropdown'
            onChange={handleOptionChange}
          >
            <option value=''>Add Billionaire</option>
            {billionaires.map((billionaire) => (
              <option
                key={billionaire.billionaire}
                disabled={
                  selectedBillionaire === billionaire.billionaire ||
                  selectedBillionaires.some(
                    (b) => b.billionaire === billionaire.billionaire
                  )
                }
              >
                {billionaire.billionaire}
              </option>
            ))}
          </select>
        </div>
        {selectedBillionaires.map((billionaire) => (
          <div className='billionaireEntry' key={billionaire.billionaire}>
            <button
              className='cancelButton'
              onClick={() => {
                handleRemoveBillionaire(billionaire.billionaire);
              }}
            >
              x
            </button>
            <div className='billionaireContent'>
              <div
                className={
                  billionaire.active
                    ? 'containerLeft'
                    : 'containerLeft nonactive'
                }
              >
                <div className='nameAndIncome'>
                  <p className='name'> {billionaire.billionaire} </p>
                  <p className='income'>
                    Daily income:{' '}
                    {formatNumbers(
                      billionaires.find(
                        (b) => b.billionaire === billionaire.billionaire
                      ).income
                    )}{' '}
                    $
                  </p>
                </div>
                <input
                  className={'slider'}
                  type='range'
                  min='0'
                  max='1'
                  step='0.001'
                  value={billionaire.individualTax}
                  onChange={(e) => {
                    handleIndividualTaxChange(
                      billionaire.billionaire,
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className='containerRight'>
                <div
                  className={
                    billionaire.active ? 'taxRate' : 'taxRate nonactive'
                  }
                >
                  <p className='taxTitle'> Tax Rate</p>
                  <div className='percetageBoxWrapper1'>
                    <input
                      className={'percentage'}
                      type='number'
                      min='0'
                      max='100'
                      step='0.1'
                      value={parseFloat(
                        (billionaire.individualTax * 100).toFixed(1)
                      ).toString()}
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
                          handleIndividualTaxChange(billionaire.billionaire, 0);
                        } else {
                          handleIndividualTaxChange(
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
                  <Toggle
                    toggled={billionaire.active}
                    onClick={() =>
                      handleToggle(billionaire.billionaire, billionaire.active)
                    }
                  />
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
