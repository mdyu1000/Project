import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/docs/css/mdb.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css/animate.min.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
