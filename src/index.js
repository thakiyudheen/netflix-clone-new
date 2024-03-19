import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Firebase} from './Store/FirebaseContext'
import { Context } from './Store/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Firebase>
      <Context>
        <App />
      </Context>
    </Firebase>
  </React.StrictMode>
);
