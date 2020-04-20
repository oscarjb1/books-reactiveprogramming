import React from 'react'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import PropTypes from 'prop-types'
import UserContext from './context/UserContext'

const TwitterDashboard = (props) => {

  return (
    <UserContext.Consumer>
      {context => <div id="dashboard" className="animated fadeIn">
        <div className="container-fluid">
          <div className="row">
            <div className="hidden-xs col-sm-4 col-md-push-1
              col-md-3 col-lg-push-1 col-lg-3" >
              <Profile profile={context} />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-push-1
              col-md-7 col-lg-push-1 col-lg-4">
              <TweetsContainer profile={context} />
            </div>
            <div className="hidden-xs hidden-sm hidden-md
              col-lg-push-1 col-lg-3">
              <SuggestedUser />
            </div>
          </div>
        </div>
      </div>}
    </UserContext.Consumer>
  )
}

export default TwitterDashboard;
