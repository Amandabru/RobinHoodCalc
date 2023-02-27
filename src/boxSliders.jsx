import React from "react";
import "./boxSlider.css";

const BoxSliders = ({ onTaxChange, clearAllTaxes, taxes }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "fit-content",
      }}
    >
      <header
        style={{ position: "relative", textAlign: "center", padding: "15px" }}
      >
        <h2 style={{ textDecoration: "underline" }}>
          Take From The Rich
          <div
            className="info"
            style={{
              marginLeft: "10px",
              color: "gray",
            }}
          >
            ?
            <span className="infoText">
              Tax different income levels to redistribute income to the poor by
              dragging the slider corresponding to each income level
            </span>
          </div>
          <button
            style={{ cursor: "pointer", float: "right", marginLeft: "1rem" }}
            onClick={() => {
              clearAllTaxes();
              console.log("cleared");
            }}
          >
            Clear All
          </button>
        </h2>
      </header>

      <div className="boxSliderContainer">
        <label>Income of: 100-1k $/day</label>

        <div>
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
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[1].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              }
            }}
            onChange={(e) => {
              onTaxChange(1, e.target.value / 100);
            }}
          />
          <span> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <label>1k-10k $/day</label>
        <div>
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
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[2].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              }
            }}
            onChange={(e) => {
              onTaxChange(2, e.target.value / 100);
            }}
          />
          <span> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <label>10k-100k $/day</label>
        <div>
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
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[3].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              }
            }}
            onChange={(e) => {
              onTaxChange(3, e.target.value / 100);
            }}
          />
          <span> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <label>100k-1M $/day</label>
        <div>
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
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[4].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              }
            }}
            onChange={(e) => {
              onTaxChange(4, e.target.value / 100);
            }}
          />
          <span> % </span>
        </div>
      </div>

      <div className="boxSliderContainer">
        <label>≥ 1M $/day</label>
        <div>
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
          <input
            className="percentageBox"
            type="text"
            inputMode="numeric"
            value={parseFloat((taxes[5].taxRate * 100).toFixed(0))}
            onInput={(e) => {
              if (e.target.value >= 100) {
                e.target.value = 100;
              }
            }}
            onChange={(e) => {
              onTaxChange(5, e.target.value / 100);
            }}
          />
          <span> % </span>
        </div>
      </div>

      <hr width="80%"></hr>

      <button style={{ cursor: "pointer", float: "right", margin: "5px" }}>
        Clear All
      </button>

      <header style={{ position: "relative", textAlign: "center" }}>
        <h2 style={{ textDecoration: "underline" }}>
          Individual Tax for Billionaires
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
      </header>
      <span>coming soon :))</span>
    </div>
  );
};

export default BoxSliders;
