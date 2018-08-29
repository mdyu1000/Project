import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css/animate.min.css'

import 'simple-line-icons/css/simple-line-icons.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger' 
import BusPlayApp from './reducer/reducer'
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

const middleware = [ thunk ]
if(process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

let store = createStore(
  BusPlayApp,
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
