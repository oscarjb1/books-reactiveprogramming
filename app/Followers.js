import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Followers extends React.Component{

  constructor(props){
    super(props)
    this.state={
      users: []
    }
  }

  componentWillMount(){
    this.findUsers(this.props.profile.userName)
  }

  componentWillReceiveProps(props){
    this.setState({
      tab: props.route.tab,
      users: []
    })
    this.findUsers(props.profile.userName)
  }

  findUsers(username){
    APIInvoker.invokeGET('/followers/' + username, response => {
      this.setState({
        users: response.body
      })
    },error => {
      console.log("Error en la autenticación");
    })

  }

  render(){
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
              <For each="user" of={ this.state.users }>
                <div className="col-xs-12 col-sm-6 col-lg-4"
                  key={this.state.tab + "-" + user._id}>
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

export default Followers;
