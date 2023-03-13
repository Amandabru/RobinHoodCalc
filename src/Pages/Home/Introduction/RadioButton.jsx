import React, { useState } from "react";
import "./radioButton.css"

const RadioButton = ({selectedOption, onChange}) => {
    const [option, setOption] = useState(selectedOption);
 
    const handleOptionChange = (changeEvent) => {
    setOption(changeEvent.target.value);
    onChange(changeEvent.target.value);
    };
      

  return (
    <div className="radioButtonsContainer">
    <label className="radioButtonContainer">Avoid Population Accumulation
        <input type="checkbox" value={'Avoid Population Accumulation'} onChange={(e) => handleOptionChange(e)} checked={option === 'Avoid Population Accumulation'} />
        <span className="checkmark"></span>
    </label>
    <label className="radioButtonContainer">To Lowest Paid Only
        <input type="checkbox" value={'To Lowest Paid Only'} onChange={(e) => handleOptionChange(e)} checked={option === 'To Lowest Paid Only'}/>
        <span className="checkmark"></span>
    </label>
  </div>
  )
}

export default RadioButton