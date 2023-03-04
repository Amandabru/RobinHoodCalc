import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import About from './Pages/About/About';
import Team from './Pages/Team/Team';
import HowToUse from './Pages/HowToUse/HowToUse';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/how-to-use' element={<HowToUse />} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Team />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
