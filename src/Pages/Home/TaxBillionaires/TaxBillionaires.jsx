import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TaxBillionaires({ billionaires }) {
  const [divs, setDivs] = useState([]);

  const options = billionaires.map((item) => item.billionaire);

  function addNewDiv() {
    // Create a new div element
    const newDiv = {
      id: uuidv4(),
      option: "",
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
    if (value !== "") {
      // If a dropdown is selected, add a new div with a default value of ""
      const newDiv = {
        id: uuidv4(),
        option: "",
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

  return (
    <div>
      <button onClick={addNewDiv} disabled={divs.length >= options.length}>
        Add billionaire
      </button>
      {divs.map((div) => (
        <div key={div.id} style={{ display: "flex", alignItems: "center" }}>
          <div>
            {div.selected ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>{div.option}</p>
                <p style={{ marginLeft: "10px" }}>
                  {
                    billionaires.find(
                      (billionaire) => billionaire.billionaire === div.option
                    ).income
                  }{" "}
                  $/day
                </p>
              </div>
            ) : (
              <select
                value={div.option}
                onChange={(e) => handleOptionChange(e, div.id)}
              >
                <option value="">Select an option</option>
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
          <button onClick={() => removeDiv(div.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default TaxBillionaires;
