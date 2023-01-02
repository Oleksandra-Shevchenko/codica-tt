import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import './App.css';
import { MainScreen } from './components/MainScreen';
import { AdditionalWeather } from './components/additionalWeather';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/allWeather" element={<AdditionalWeather />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
