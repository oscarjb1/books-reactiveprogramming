import React from 'react'
import Toolbar from './Toolbar'
import TwitterDashboard from './TwitterDashboard'
import { connect } from 'react-redux'
import { relogin } from './actions/Actions'

class TwitterApp extends React.Component {

  constructor(args) {
    super(args)
    this.props.relogin()
  }

  render() {
    if (!this.props.load) {
      return null
    }

    return (
      <>
        <Toolbar />
        <div id="mainApp" className="aminate fadeIn">
          {this.props.children}
          <div id="dialog" />
        </div>
      </>
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
