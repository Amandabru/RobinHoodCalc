import DataVis from './DataVis';
import Header from './Header/Header';
import About from './About';
import Team from './Team';
import HowToUse from './HowToUse';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<DataVis />} />
          <Route path='/how-to-use' element={<HowToUse />} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Team />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
