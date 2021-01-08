import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/around-react">
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

