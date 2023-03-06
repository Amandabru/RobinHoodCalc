import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toggle from '../Toggle/Toggle';
import './taxbillionaires.css';

function TaxBillionaires({ billionaires }) {
  const [divs, setDivs] = useState([]);

  const options = billionaires.map((item) => item.billionaire);

  function addNewDiv() {
    // Create a new div element
    const newDiv = {
      id: uuidv4(),
      option: '',
      selected: false,
    };

    // Add the new div to the array of divs
    if (divs.length > 0) {
      setDivs([newDiv, ...divs]);
    } else {
      setDivs([...divs, newDiv]);
    }
  }

  function handleOptionChange(e, id) {
    const value = e.target.value;
    if (value !== '') {
      // If a dropdown is selected, add a new div with a default value of ""
      const newDiv = {
        id: uuidv4(),
        option: '',
        selected: false,
      };
      setDivs([...divs, newDiv]);
    }
    const newDivs = divs.map((div) => {
      if (div.id === id) {
        return { ...div, option: value, selected: true };
      } else {
        return div;
      }
    });
    setDivs(newDivs);
  }

  function removeDiv(id) {
    const newDivs = divs.filter((div) => div.id !== id);
    setDivs(newDivs);
  }

  function removeZeros(income) {
    return income / 1000000;
  }

  return (
    <>
      <button onClick={addNewDiv} disabled={divs.length >= options.length}>
        Add billionaire
      </button>
      {divs.map((div) => (
        <div key={div.id}>
          {div.selected ? (
            <div className='billionaireEntry'>
              <button
                className='cancelButton'
                onClick={() => removeDiv(div.id)}
              >
                x
              </button>
              <div className='billionaireContent'>
                <div className='containerLeft'>
                  <div className='nameAndIncome'>
                    <p className='name'> {div.option} </p>
                    <p className='income'>
                      {removeZeros(
                        billionaires.find(
                          (billionaire) =>
                            billionaire.billionaire === div.option
                        ).income
                      )}{' '}
                      M$/day
                    </p>
                  </div>
                  <input
                    className='slider'
                    type='range'
                    min='0'
                    max='1'
                    step='0.001'
                    onChange={(e) => {}}
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
          ) : (
            <select
              value={div.option}
              onChange={(e) => handleOptionChange(e, div.id)}
            >
              <option value=''>Select an option</option>
              {options.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  disabled={divs.some(
                    (d) => d.option === option && d.id !== div.id
                  )}
                >
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </>
  );
}

export default TaxBillionaires;
