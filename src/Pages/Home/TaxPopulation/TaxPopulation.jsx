import React from "react";
import "./taxPopulation.css";

const TaxPopulation = ({ onTaxChange, clearAllTaxes, taxes }) => {
  return (
    <div>
      <header
        style={{
          padding: "2em",

        }}
      >
        <div className="titleContainer headTitle">
          <h2>Tax the Rich</h2>
          <button
            className="btn"
            onClick={() => {
              clearAllTaxes();
            }}
          >
            Clear All
          </button>
        </div>
        <p className="taxationDescription">
          The Robin Hood Taxation System taxes the world’s richest and
          redistributes directly to people of lower income levels. The system is
          progressive and you as user control the marginal rate of taxation for
          five different income intervals.
        </p>
      </header>
      <div className="titleContainer">
        <h4> Income Interval ($/day) </h4>
        <h4 className="marginalTax">
          {" "}
          Marginal Tax Rate
          <div
            className="info"
            style={{
              marginLeft: "5px",
              color: "gray",
            }}
          >
            ?
            <span className="infoText">
              Marginal tax rate is the tax rate that applies to each additional
              level of income. In this progressive tax system, people pay more
              in taxes as their income increases and a portion of their income
              moves into a higher income bracket.
            </span>
          </div>
        </h4>
      </div>
      <div className="boxSliderContainer">
        <div>
          <h4>100-1k</h4>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxes[1].taxRate}
            onChange={(e) => {
              onTaxChange(1, e.target.value);
            }}
          />
        </div>
        <div className="percetageBoxWrapper">
          <input
            className={"percentageBox"}
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[1].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              if (e.target.value == "") {
                onTaxChange(1, 0);
              } else {
                onTaxChange(1, e.target.value / 100);
              }
            }}
          />
          <span className="percentageSymbol"> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <div>
          <h4>1k-10k</h4>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxes[2].taxRate}
            onChange={(e) => {
              onTaxChange(2, e.target.value);
            }}
          />
        </div>
        <div className="percetageBoxWrapper">
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[2].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              onTaxChange(2, e.target.value / 100);
            }}
          />
          <span className="percentageSymbol"> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <div>
          <h4>10k-100k</h4>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxes[3].taxRate}
            onChange={(e) => {
              onTaxChange(3, e.target.value);
            }}
          />
        </div>
        <div className="percetageBoxWrapper">
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[3].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              onTaxChange(3, e.target.value / 100);
            }}
          />
          <span className="percentageSymbol"> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <div>
          <h4>100k-1M</h4>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxes[4].taxRate}
            onChange={(e) => {
              onTaxChange(4, e.target.value);
            }}
          />
        </div>
        <div className="percetageBoxWrapper">
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[4].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              onTaxChange(4, e.target.value / 100);
            }}
          />
          <span className="percentageSymbol"> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <div>
          <h4>≥ 1M </h4>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxes[5].taxRate}
            onChange={(e) => {
              onTaxChange(5, e.target.value);
            }}
          />
        </div>
        <div className="percetageBoxWrapper">
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[5].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              } else if (isNaN(e.target.value)) {
                e.target.value = 0;
              }
            }}
            onChange={(e) => {
              onTaxChange(5, e.target.value / 100);
            }}
          />
          <span className="percentageSymbol"> % </span>
        </div>
      </div>

      <hr
        width="100%"
        style={{
          marginTop: "15px",
        }}
      ></hr>
    </div>
  );
};

export default TaxPopulation;
