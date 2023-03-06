import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./taxbillionaires.css";
import "../TaxSliders/taxSliders.css";

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
    if (id) {
      const newDivs = divs.filter((div) => div.id !== id);
      setDivs(newDivs);
    } else {
      setDivs([]);
    }
  }

  return (
    <header
      style={{
        padding: "15px",
      }}
    >
      <div className="titleContainer headTitle">
        <h2>
          Tax the 10 Richest
          <div
            className="info"
            style={{
              marginLeft: "10px",
              color: "gray",
            }}
          >
            ?
            <span className="infoText">
              Add specific billionaires to assign them individual taxes
            </span>
          </div>
        </h2>
        <button
          className="btn"
          onClick={() => {
            removeDiv();
          }}
        >
          Clear All
        </button>
      </div>
      <div
        style={{
          padding: "15px",
        }}
      >
        <div>
          <button
            className="btnAdd"
            onClick={addNewDiv}
            disabled={divs.length >= options.length}
          >
            + Add billionaire
          </button>
          {divs.map((div) => (
            <div key={div.id} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                {div.selected ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>{div.option}</p>
                    <p style={{ marginLeft: "10px" }}>
                      {
                        billionaires.find(
                          (billionaire) =>
                            billionaire.billionaire === div.option
                        ).income
                      }{" "}
                      $/day
                    </p>
                  </div>
                ) : (
                  <select
                    className="dropdown"
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
              <button className="btnRemove" onClick={() => removeDiv(div.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default TaxBillionaires;
