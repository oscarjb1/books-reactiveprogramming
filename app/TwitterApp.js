import React from 'react'
import APIInvoker from "./utils/APIInvoker"
import Toolbar from './Toolbar'
import { browserHistory } from 'react-router'
import TwitterDashboard from './TwitterDashboard'
import { connect } from 'react-redux'
import { relogin } from './actions/Actions'

class TwitterApp extends React.Component{

  constructor(props){
    super(props)
    // this.state = {
    //   load: true,
    //   profile: null
    // }
  }

  componentWillMount(){
    this.props.relogin()
  }

  // componentWillMount(){
  //   let token = window.localStorage.getItem("token")
  //   if(token == null){
  //     browserHistory.push('/login')
  //     this.setState({
  //       load: true,
  //       profile: null
  //     })
  //   }else{
  //     APIInvoker.invokeGET('/secure/relogin', response => {
  //       this.setState({
  //         load: true,
  //         profile: response.profile
  //       });
  //       window.localStorage.setItem("token", response.token)
  //       window.localStorage.setItem("username", response.profile.userName)
  //     },error => {
  //       console.log("Error al autenticar al autenticar al usuario " );
  //       window.localStorage.removeItem("token")
  //       window.localStorage.removeItem("username")
  //       browserHistory.push('/login');
  //     })
  //   }
  // }

  render(){
    return (
      <div id="mainApp">
        <Toolbar profile={this.props.profile} />
        <Choose>
          <When condition={!this.props.load}>
            <div className="tweet-detail">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          </When>
          <When condition={this.props.children == null
            && this.props.profile != null}>
            <TwitterDashboard  profile={this.props.profile}/>
          </When>
          <Otherwise>
            {this.props.children}
          </Otherwise>
        </Choose>
        <div id="dialog"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    load: state.loginReducer.load,
    profile: state.loginReducer.profile
  }
}

export default connect(mapStateToProps, { relogin })(TwitterApp);
