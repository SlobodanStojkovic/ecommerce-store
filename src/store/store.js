import { compose, createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { loggerMiddleware } from "./middleware/logger";

//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
  sagaMiddleware,
].filter(Boolean); //if we are in development we will keep the middleware, else the array will be empty if its only middlerware, if not it will contain outhe middlewares that are not meant only for development - in this case it will have thunk in array

/* const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    action(dispatch); //runs the action and passes dispatch into that action so that we are able to use function as a action thunk
  }
}; */ //how thunk middleware works behind the scenes

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
