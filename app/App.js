import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react'
import { render } from 'react-dom'
import TwitterApp from './TwitterApp'
import Signup from './Signup'
import Login from './Login'
import UserPage from './UserPage'
import { Router, Route, Switch } from "react-router-dom"
import history from './History'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import Home from "./Home";

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

console.log("env => ", process.env.NODE_ENV);

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

render((
  <Provider store={store}>
    <Router history={history}>
      <TwitterApp>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:user" component={UserPage} />
          <Route exact path="/:user/:tab" component={UserPage} />
        </Switch>

        {
          /* 
          <Switch>
            <Route exact path="/:user" component={MyTweets} />
            <Route exact path="/:user/followers" component={Followers} tab="followers" />
            <Route exact path="/:user/following" component={Followings} tab="followings" />
            <Route exact path="/:user/:tweet" component={TweetDetail} />
          </Switch>
          */
        }
      </TwitterApp>
    </Router>
  </Provider>
), document.getElementById('root'));
