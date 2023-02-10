import './App.css';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {csv, request} from 'd3';


const csvUrl = 'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/b3cd5377a6503e055f47562026ca630d58251bab/GapminderData.csv';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(data => {
      console.log(data);
    });
  }, []);
  return (
    <div className="App">
      <p>Hej</p>
    </div>
  );
}

export default App;
