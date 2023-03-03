import Home from './Pages/Home/home';
import Header from './Header/header';
import About from './Pages/About/about';
import Team from './Pages/Team/team';
import HowToUse from './Pages/HowToUse/howToUse';
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
