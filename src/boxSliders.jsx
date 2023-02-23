import React from "react";
import "./boxSlider.css";

const BoxSliders = ({ onTaxChange, taxRate }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "fit-content",
      }}
    >
      <button
        style={{ cursor: "pointer", float: "right" }}
        onClick={() => {
          onTaxChange(0);
        }}
      >
        Clear All
      </button>

      <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
        Take From The Rich
      </h2>

      <div className="boxSliderContainer">
        <label>Income of: 100-1k $/day</label>

        <div>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={taxRate / 100}
            onChange={(e) => {
              onTaxChange(e.target.value);
            }}
          />
          <span
            style={{
              border: "1px solid black",
              padding: "3px",
              marginLeft: "15px",
            }}
          >
            {parseFloat(taxRate.toFixed(3))}%
          </span>
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
            defaultValue={0}
          />
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
            defaultValue={0}
          />
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
            defaultValue={0}
          />
        </div>
      </div>
      <div className="boxSliderContainer">
        <label>1M $/day</label>
        <div>
          <input
            className="boxSlider"
            type="range"
            min="0"
            max="1"
            step="0.001"
            defaultValue={0}
          />
        </div>
      </div>
      <hr width="80%"></hr>
      <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
        Individual Tax for Billionaires
      </h2>
      <span>coming soon :))</span>
    </div>
  );
};

export default BoxSliders;
