import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {connect} from 'react-redux'
import {findFollowersFollowings, resetFollowersFollowings}
  from  './actions/Actions'


class Followers extends React.Component{

  constructor(props){
    super(props)
    let user = this.props.match.params.user
    this.props.findFollowersFollowings(user,'followers')
  }

  componentWillUnmount(){
  this.props.resetFollowersFollowings()
  }

  render(){
    let tab = this.props.match.params.tab
    return(
      <section>
        <div className="container-fluid no-padding">
          <div className="row no-padding">
            <CSSTransitionGroup
              transitionName="card"
              transitionEnter = {true}
              transitionEnterTimeout={500}
              transitionAppear={false}
              transitionAppearTimeout={0}
              transitionLeave={false}
              transitionLeaveTimeout={0}>
              <For each="user" of={ this.props.state.users }>
                <div className="col-xs-12 col-sm-6 col-lg-4"
                  key={tab + "-" + user._id}>
                  <UserCard user={user} />
                </div>
              </For>
            </CSSTransitionGroup>
          </div>
        </div>
      </section>
    )
  }
}

Followers.propTypes = {
  profile: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    state: state.followerReducer
  }
}

export default connect(mapStateToProps,
  {findFollowersFollowings, resetFollowersFollowings})(Followers);
