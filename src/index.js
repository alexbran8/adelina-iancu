import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivacyPolicy } from './components/PrivacyPolicy'
import { PreluareComenzi } from './components/PreluareComenzi/PreluareComenzi'
import { Footer } from "./components/Footer.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app">
      <div className="content">
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/preluare-comenzi" element={<PreluareComenzi />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
