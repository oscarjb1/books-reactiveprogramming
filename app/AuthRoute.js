import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from './context/UserContext'

class AuthRoute extends React.Component {

    render() {
        const { component: Component, ...rest } = this.props
        return (<Route {...rest} render={(props) => (
            this.context
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />)
    }
}
AuthRoute.contextType = UserContext

export default AuthRoute