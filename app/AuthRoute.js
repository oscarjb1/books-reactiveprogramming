import React from 'react'
import { Route, Redirect } from 'react-router-dom'

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

export default AuthRoute