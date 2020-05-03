import React from 'react'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import PropTypes from 'prop-types'

class MyTweets extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 no-padding-right">
          <TweetsContainer profile={this.props.profile} onlyUserTweet={true}/>
        </div>
        <div className="hidden-xs hidden-sm hidden-md col-lg-4">
          <SuggestedUser/>
        </div>
      </div>
    )
  }
}

MyTweets.propTypes = {
  profile: PropTypes.object
}

export default MyTweets;
