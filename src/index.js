import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/modules';
import { Provider } from 'react-redux';
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

const logger = createLogger(); 

const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk))
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);