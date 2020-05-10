import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from './context/UserContext'

class AuthRoute extends React.Component {

    render() {
        const { component: Component, isLoged, ...rest } = this.props
        return (<Route {...rest} render={(props) => (
            isLoged
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />)

    }
}
AuthRoute.contextType = UserContext

export default AuthRoute