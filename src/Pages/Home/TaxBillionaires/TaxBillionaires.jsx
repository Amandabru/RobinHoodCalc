import React, { useEffect, useState } from 'react';
import Toggle from '../Toggle/Toggle';
import './taxbillionaires.css';

function TaxBillionaires({ billionaires, setNewBillionaires }) {
  const [selectedBillionaire, setSelectedBillionaire] = useState('');
  function handleOptionChange(e) {
    const selected = e.target.value;
    if (selected !== '') {
      const newBillionaire = billionaires.find(
        (billionaire) => billionaire.billionaire === selected
      );
      if (newBillionaire) {
        setNewBillionaires(
          billionaires.map((b) => {
            if (b.billionaire === selected) {
              return { ...b, added: true };
            } else return { ...b };
          })
        );
      }
      setSelectedBillionaire('');
    }
  }

  function handleToggle(billionaire, toggleState) {
    setNewBillionaires(
      billionaires.map((b) => {
        if (b.billionaire === billionaire) {
          return { ...b, active: !toggleState };
        } else return { ...b };
      })
    );
  }

  function handleRemoveBillionaire(billionaire) {
    if (billionaire) {
      setNewBillionaires(
        billionaires.map((b) => {
          if (b.billionaire === billionaire) {
            return { ...b, added: false, individualTax: 0, active: true };
          } else return { ...b };
        })
      );
    } else {
      setNewBillionaires(
        billionaires.map((b) => {
          return { ...b, added: false, individualTax: 0, active: true };
        })
      );
    }
  }

  function handleIndividualTaxChange(billionaire, newTax) {
    setNewBillionaires(
      billionaires.map((b) => {
        if (b.billionaire === billionaire) {
          return { ...b, individualTax: newTax };
        } else return { ...b };
      })
    );
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
        tax rate is applied on all income that is left after having applied
        other Robin Hood taxes.
      </p>
      <div
        style={{
          padding: '15px',
        }}
      >
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
                  billionaire.added
                }
              >
                {billionaire.billionaire}
              </option>
            ))}
          </select>
        </div>
        {billionaires.map(
          (billionaire) =>
            billionaire.added && (
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
                        Daily income: {formatIncome(billionaire.income)} $
                      </p>
                    </div>
                    <input
                      className={'slider'}
                      type='range'
                      min='0'
                      max='1'
                      step='0.001'
                      value={
                        billionaires.find(
                          (b) => b.billionaire === billionaire.billionaire
                        ).individualTax
                      }
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
                          type='text'
                          inputMode='numeric'
                          value={parseFloat(
                            billionaires.find(
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
                              handleIndividualTaxChange(
                                billionaire.billionaire,
                                0
                              );
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
                          handleToggle(
                            billionaire.billionaire,
                            billionaire.active
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </header>
  );
}

export default TaxBillionaires;
