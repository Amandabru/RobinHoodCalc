import React, { useEffect, useState } from 'react';
import Toggle from '../Toggle/Toggle';
import { v4 as uuidv4 } from 'uuid';
import './taxbillionaires.css';

function TaxBillionaires({
  billionaires,
  onIndividualTaxChange,
  individualTaxes,
  clearAllIndividualTaxes,
  onChangeBillionaireList,
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
          { ...newBillionaire, id: newBillionaire.billionaire, active: true }, //uuidv4()
          ...billionaireList,
        ]);
      }
      setSelectedBillionaire('');
    }
  }

  function handleToggle(id, toggleState) {
    let newBillionaireList = billionaireList.map((b) => {
      if (b.id === id) {
        return { ...b, active: !toggleState };
      }
    });
    console.log(newBillionaireList);
    setBillionaireList(newBillionaireList);
  }

  function handleRemoveDiv(id) {
    if (id) {
      const newDivs = billionaireList.filter((div) => div.id !== id);
      setBillionaireList(newDivs);
    } else {
      setBillionaireList([]);
    }
    onChangeBillionaireList(billionaireList);
  }

  function formatIncome(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + 'k';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  }

  useEffect(() => {
    onChangeBillionaireList(billionaireList);
  }, [billionaireList, onChangeBillionaireList]);

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
            handleRemoveDiv();
            clearAllIndividualTaxes();
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
            className='dropdown'
            value={selectedBillionaire}
            onChange={handleOptionChange}
          >
            <option value=''>Add Billionaire</option>
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
                    {formatIncome(
                      billionaires.find(
                        (b) => b.billionaire === billionaire.billionaire
                      ).income
                    )}{' '}
                    $/day
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
                  <p className='taxTitle'> Tax Rate</p>
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
                  <Toggle
                    toggled={billionaire.active}
                    onClick={() =>
                      handleToggle(billionaire.id, billionaire.active)
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
