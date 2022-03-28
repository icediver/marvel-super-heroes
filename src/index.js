import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/temp/App_Ref';
import App from './components/app/App';
// import App from './components/temp/App_Portal';

import './style/style.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

