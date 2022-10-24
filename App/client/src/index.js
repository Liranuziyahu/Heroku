import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ContextDataFromServer from './context/ContextDataFromServer';
import reportWebVitals from './reportWebVitals';
import ContextServer from './context/index'

ReactDOM.render(
  <BrowserRouter>
  <ContextServer>
        <ContextDataFromServer>
                  <App />
        </ContextDataFromServer>
  </ContextServer>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
