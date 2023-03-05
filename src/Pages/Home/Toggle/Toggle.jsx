import { useState } from "react";
import "./toggle.css";

export const Toggle = ({ label, toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <div className="togglemargin">
      <label className="togglelabel">
        <input
          className="toggleinput"
          type="checkbox"
          defaultChecked={isToggled}
          onClick={callback}
        />
        <span className="togglespan" />
        <strong>{label}</strong>
      </label>
    </div>
  );
};

export default Toggle;

/*  <Toggle toggled={true} onClick={logState} /> 
import Toggle from "../Toggle/Toggle"; */
