import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/docs/css/mdb.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css/animate.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger' 
import BusPlayApp from './reducer/reducer'
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';

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
    <App />
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
