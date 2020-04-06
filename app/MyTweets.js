import React from 'react'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'

const MyTweets = (props) => {
  return(
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12
         col-lg-8 no-padding-right">
        <TweetsContainer onlyUserTweet={true}/>
      </div>
      <div className="hidden-xs hidden-sm hidden-md col-lg-4">
        <SuggestedUser/>
      </div>
    </div>
  )
}

export default MyTweets
