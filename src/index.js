import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import App from "./App";
import { PUBLIC_URL } from "./constants/globalConstants";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router basename={PUBLIC_URL}>
          <App />
        </Router>
    </Provider>,
  document.getElementById("root")
);