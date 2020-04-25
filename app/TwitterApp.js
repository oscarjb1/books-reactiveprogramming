import React from 'react'
import APIInvoker from "./utils/APIInvoker"
import browserHistory from './History'
import { Route, Switch } from "react-router-dom";
import Signup from './Signup'
import Login from './Login'
import UserPage from './UserPage'
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar';
import UserContext from './context/UserContext'
import AuthRoute from './AuthRoute'

class TwitterApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      load: false,
      profile: null
    }
  }

  componentDidMount() {
    let token = window.localStorage.getItem("token")
    if (token == null) {
      this.setState({
        load: true,
        profile: null
      })
      browserHistory.push('/login')
    } else {
      APIInvoker.invokeGET('/secure/relogin', response => {
        this.setState({
          load: true,
          profile: response.profile
        });
        window.localStorage.setItem("token", response.token)
        window.localStorage.setItem("username", response.profile.userName)
      }, error => {
        console.log("Error al autenticar al autenticar al usuario ");
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        browserHistory.push('/login');
      })
    }
  }

  render() {
    if (!this.state.load) {
      return null
    }

    return (
      <UserContext.Provider value={this.state.profile}>
        <Toolbar profile={this.state.profile} />
        <div id="mainApp" className="animated fadeIn">
          <Switch>
            <AuthRoute isLoged={this.state.profile != null} exact path="/" component={() =>
              <TwitterDashboard profile={this.state.profile} />} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <AuthRoute isLoged={this.state.profile != null} path="/:user" component={UserPage} />
          </Switch>
        </div>
      </UserContext.Provider>
    )
  }
}
export default TwitterApp;
