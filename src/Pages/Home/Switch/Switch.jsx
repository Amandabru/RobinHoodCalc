import { useState } from 'react';
import './switch.css';

export const Switch = ({ toggled, onClick }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <div className='toggleContainer'>
      <label class='toggleSwitch nolabel' onclick=''>
        <input type='checkbox' defaultChecked={isToggled} onClick={callback} />
        <a></a>
        <span>
          <span class='left-span'>Population</span>
          <span class='right-span'>Income</span>
        </span>
      </label>
    </div>
  );
};

export default Switch;

/*  <Toggle toggled={true} onClick={logState} /> 
import Toggle from "../Toggle/Toggle"; */
