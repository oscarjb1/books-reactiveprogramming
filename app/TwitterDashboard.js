import React from 'react'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import UserContext from './context/UserContext'
import { useContext } from 'react'


const TwitterDashboard = (props) => {

  const userContext = useContext(UserContext)

  return (
    <div id="dashboard" className="animated fadeIn">
      <div className="container-fluid">
        <div className="row">
          <div className="hidden-xs col-sm-4 col-md-push-1
              col-md-3 col-lg-push-1 col-lg-3" >
            <Profile profile={userContext} />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-push-1
              col-md-7 col-lg-push-1 col-lg-4">
            <TweetsContainer profile={userContext} />
          </div>
          <div className="hidden-xs hidden-sm hidden-md
              col-lg-push-1 col-lg-3">
            <SuggestedUser />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwitterDashboard;
