import { useState } from "react";
import "./switch.css";

export const Switch = ({ toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <div className="toggleContainer">
      <label className="toggleSwitch nolabel">
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <a></a>
        <span>
          <span className="left-span">Population</span>
          <span className="right-span">Income Accumulation</span>
        </span>
      </label>
      <span className="y-percentage">(%)</span>
    </div>
  );
};

export default Switch;

/*  <Toggle toggled={true} onClick={logState} /> 
import Toggle from "../Toggle/Toggle"; */
