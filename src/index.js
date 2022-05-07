import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { Elements } from "@stripe/react-stripe-js";

import App from "./App";

import { store, persistor } from "./store/store";
import { stripePromise } from "./utils/stripe/stripe.utils";

import "./index.scss";
import Spinner from "./components/spinner/spinner.component";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        {/* instead of Spinner we can put null, null means not to show anything while loading */}
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
