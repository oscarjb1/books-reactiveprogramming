import React, {useEffect} from 'react'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import UserContext from './context/UserContext'
import { useContext } from 'react'
import {resetTweets} from './redux/actions/tweetsActions'
import { useDispatch } from 'react-redux'

const TwitterDashboard = (props) => {

  const userContext = useContext(UserContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetTweets())
  })

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
            <TweetsContainer profile={userContext} onlyUserTweet={false}/>
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
