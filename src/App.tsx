import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import { MainScreen } from './components/MainScreen';
import { AdditionalWeather } from './components/additionalWeather';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/allWeather" element={<AdditionalWeather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
