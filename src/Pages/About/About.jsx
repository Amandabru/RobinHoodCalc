import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className='AboutContainer'>
    <h1 className> About</h1>
    <p>
      - Vad vi ville uppnå
      <br></br>
      - Vad det blev
    </p>
    <h2>Data</h2>
    <p>
     The data used in this visualization is from Gapminder and can be found <a href = "" > here </a>
    </p>
    <h2>Calculations</h2>
    <p>
      - Formel?
    </p>
    <h2>Tools</h2>
    <p>
      - React
      <br></br>
      - D3 
      <br></br>
      - HTML
      <br></br>
      - CSS
    </p>

    <h2>References</h2>
    <a href = "" > Gapminder </a>
    <br></br>
    <a href = "" > How Rich Am I? </a>
    <p>

    </p>
  </div>
  )
};

export default About;
