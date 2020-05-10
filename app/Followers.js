import React, { useEffect } from 'react'
import UserCard from './UserCard'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { useDispatch, useSelector } from 'react-redux'
import { loadFollowers } from './redux/actions/userPageActions'

const Followers = (props) => {

  const dispath = useDispatch()
  const state = useSelector(state => state.userPage.followers)

  useEffect(() => {
    if (state === null) {
      dispath(loadFollowers())
    }
  }, [props.profile.userName])

  return (
    <section>
      <div className="container-fluid no-padding">
        <div className="row no-padding">
          <CSSTransitionGroup
            transitionName="card"
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionAppear={false}
            transitionAppearTimeout={0}
            transitionLeave={false}
            transitionLeaveTimeout={0}>
            <For each="user" of={state || []}>
              <div className="col-xs-12 col-sm-6 col-lg-4"
                key={user._id}>
                <UserCard user={user} />
              </div>
            </For>
          </CSSTransitionGroup>
        </div>
      </div>
    </section>
  )
}

Followers.propTypes = {
  profile: PropTypes.object
}

export default Followers;
