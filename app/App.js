import React from 'react'
import { render } from 'react-dom'
import TwitterApp from './TwitterApp'
import Signup from './Signup'
import Login from './Login'
import UserPage from './UserPage'
import MyTweets from './MyTweets'
import Followings from './Followings'
import Followers from './Followers'
import TweetDetail from './TweetDetail'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

console.log("env => ", process.env.NODE_ENV);

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={TwitterApp} >
        <Route path="signup" component={Signup}/>
        <Route path="login" component={Login}/>

        <Route path=":user" component={UserPage} >
          <IndexRoute component={MyTweets} tab="tweets" />
          <Route path="followers" component={Followers} tab="followers"/>
          <Route path="following" component={Followings} tab="followings"/>
          <Route path=":tweet" component={TweetDetail}/>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
