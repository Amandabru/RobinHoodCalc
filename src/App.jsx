import React, { useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv?fbclid=IwAR21ILavgwgRxV4nzOa4tL-KAlwzUElOyUSlaw2lDXhdtYljSdIiXFH5GuM';

const App = () => {
  useEffect(() => {
    csv(csvUrl).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <p>Check console for some nice data</p>
    </div>
  );
};

export default App;
