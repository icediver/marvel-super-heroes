import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/temp/App_hooks';
// import App from './components/temp/App_Ref';
// import App from './components/temp/App_Portal';
// import App from './components/temp/App_memo';
// import App from './components/temp/App_140_useContext';
import App from './components/temp/App_141_useReducer';
// import App from './components/app/App';

import './style/style.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

