import React from 'react'
import { render } from 'react-dom'
import TwitterApp from './TwitterApp'
import { Router } from "react-router-dom";
import history from './History'

render((
  <Router history={history}>
    <div id="dialog" />
    <TwitterApp />
  </Router>
), document.getElementById('root'));
