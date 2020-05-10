import React, { useEffect } from 'react'
import browserHistory from './History'
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from './Signup'
import Login from './Login'
import UserPage from './UserPage'
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar';
import UserContext from './context/UserContext'
import useLogin from './hooks/useLogin'
import AuthRoute from './AuthRoute'
import { Provider } from 'react-redux'
import store from './redux/store'


const TwitterApp = (props) => {

  const [load, user] = useLogin()

  const render = () => {
    if (!load) return null

    return (
      <UserContext.Provider value={user}>
        <Provider store={store} >
          <Toolbar />
          <div id="mainApp" className="animated fadeIn">
            <Switch>
              <AuthRoute isLoged={user != null} exact path="/" component={TwitterDashboard} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <AuthRoute isLoged={user != null} path="/:user" component={UserPage} />
            </Switch>
          </div>
        </Provider>
      </UserContext.Provider>
    )
  }

  return render()
}
export default TwitterApp