import React, { useState } from "react";
import Toggle from "../Toggle/Toggle";
import { v4 as uuidv4 } from "uuid";
import "./taxbillionaires.css";
import "../TaxSliders/taxSliders.css";

function TaxBillionaires({ billionaires }) {
  const [selectedBillionaire, setSelectedBillionaire] = useState("");
  const [billionaireList, setBillionaireList] = useState([]);

  function handleOptionChange(e) {
    const selected = e.target.value;
    if (selected !== "") {
      const newBillionaire = billionaires.find(
        (billionaire) => billionaire.billionaire === selected
      );
      if (newBillionaire) {
        setBillionaireList([
          { ...newBillionaire, id: uuidv4() },
          ...billionaireList,
        ]);
      }
      setSelectedBillionaire("");
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

  function removeZeros(income) {
    return income / 1000000;
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
            handleRemoveDiv();
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
        <div style={{ display: "flex" }}>
          <select
            className="dropdown"
            value={selectedBillionaire}
            onChange={handleOptionChange}
          >
            <option value="">Add billionaire</option>
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
          <div className="billionaireEntry" key={billionaire.id}>
            <button
              className="cancelButton"
              onClick={() => handleRemoveDiv(billionaire.id)}
            >
              x
            </button>
            <div className="billionaireContent">
              <div className="containerLeft">
                <div className="nameAndIncome">
                  <p className="name"> {billionaire.billionaire} </p>
                  <p className="income">
                    {removeZeros(billionaire.income)} M$/day
                  </p>
                </div>
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  onChange={(e) => {}}
                />
              </div>
              <div className="containerRight">
                <div className="taxRate">
                  <p className="taxTitle">
                    {" "}
                    Tax Rate
                    <div
                      className="moreInfo"
                      style={{
                        marginLeft: "5px",
                        color: "gray",
                      }}
                    >
                      ?
                      <span className="moreInfoText">
                        Tax sdfaskdfjaskldf bskfbas jbfjsdfks
                      </span>
                    </div>
                  </p>
                  <div className="percentageBoxWrapper1">
                    <input
                      className={"percentage"}
                      type="text"
                      inputMode="numeric"
                    />
                    <span className="percentageSymbol"> % </span>
                  </div>
                </div>
                <div className="toggle">
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
