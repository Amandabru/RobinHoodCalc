import React from "react";
import "./boxSlider.css";

const BoxSliders = () => {
  return (
    <div style={{ border: "1px solid black", width: "fit-content"}}>
      <h2 style={{ textAlign: "center" }}>Take From The Rich</h2>
        <div classname="boxsliderOwner">
          <div className="boxSliderContainer">
            <label>100-1k $/day</label>
            <div className="slider">
              <input
                className="boxSliderstyle"
                type="range"
                min="0"
                max="1"
                step="0.001"
                defaultValue={0}
                style={{writingMode: "bt-lr", height: "100px", width: "50px" }}
              />
            </div>
          </div>

          <div className="boxSliderContainer">
            <label>1k-10k $/day</label>
            <div className="slider">
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
            <div className="slider">
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
            <div className="slider">
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
            <div className="slider">
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
      </div>
    </div>
  );
};

export default BoxSliders;
