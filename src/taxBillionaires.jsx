import React from "react";
import Toggle from "./toggle";

const TaxBillionaires = ({ billionaires }) => {
  const logState = (state) => {
    console.log("Toggled:", state);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "80%",
        margin: "50px",
      }}
    >
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
          <button> + Add</button>
        </h2>
      </header>
      <div>
        <div>
          <Toggle toggled={true} onClick={logState} />
        </div>
      </div>
    </div>
  );
};

export default TaxBillionaires;
