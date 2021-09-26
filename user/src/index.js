import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import store from "./store";
import { Provider } from "react-redux";

const token = window.localStorage.getItem("token");
const user = window.localStorage.getItem("user");

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
    <Router>
      <App token={token} user={user}/>
</Router>
  </React.StrictMode>
</Provider>,
  document.getElementById('root')
);

