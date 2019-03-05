import React from "react";
import ReactDOM from "react-dom";
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from './redux-hooks';
import useStore from './use-store';
import Form, { reducers } from './Form';

import "./styles.css";

const appReducers = { form: reducers };
const middlewares = [thunk, reduxLogger];

function App() {
  const store = useStore(appReducers, middlewares);
  return (
    <Provider value={store}>
      <div className="container">
        <h1>Sample Form</h1>
        <Form />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
