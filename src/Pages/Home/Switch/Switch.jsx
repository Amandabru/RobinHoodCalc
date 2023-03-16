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
      <label className='toggleSwitch nolabel'>
        <input type='checkbox' defaultChecked={isToggled} onClick={callback} />
        <a></a>
        <span>
          <span className='distribution'>
            Population
            <div className='distributionText'>
              Displays how the world population (in percentage) is spread across
              different income ranges
            </div>
          </span>
          <span className='distribution'>
            Income
            <div className='distributionText'>
              Displays how the world's total daily income (in percentage) is
              spread across different income ranges.
            </div>
          </span>
        </span>
      </label>
      <span className='y-percentage'>(%)</span>
    </div>
  );
};

export default Switch;

/*
<div className='distributionInfo' style={{ marginLeft: '5px', color: 'gray' }}>
  <span className='left-span'>Population</span>
  <span className='distributionText'>
    Distributes to the people at the current lowest income, but to avoid
    population accumulation, some will receive more than others, making it more
    expensive to move people out of poverty.
  </span>
</div>;*/
