import React from "react";
import "./boxSlider.css";

const BoxSliders = ({ onTaxChange, taxRate }) => {
  return (
    <div>
      <input
        type="number"
        value={parseFloat(taxRate.toFixed(3))}
        onInput={(e) => (e.target.value = e.target.value.slice(0, 3))}
        onChange={(e) => {
          onTaxChange(e.target.value / 100);
        }}
      />

      <div
        style={{
          border: "1px solid black",
          width: "fit-content",
        }}
      >
        <button
          style={{ cursor: "pointer", float: "right", margin: "5px" }}
          onClick={() => {
            onTaxChange(0);
          }}
        >
          Clear All
        </button>

        <header style={{ position: "relative", textAlign: "center" }}>
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
                Tax different income levels within level 4
              </span>
            </div>
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
              value={taxRate / 100}
              onChange={(e) => {
                onTaxChange(e.target.value);
              }}
            />
            <span className="percentageBox">
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
    </div>
  );
};

export default BoxSliders;
