import React from 'react'
import Toolbar from './Toolbar'
import TwitterDashboard from './TwitterDashboard'
import { connect } from 'react-redux'

const Home = (props) => {
    return (
        <div id="mainApp" className="animated fadeIn">
            <TwitterDashboard profile={props.profile} />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        load: state.loginReducer.load,
        profile: state.loginReducer.profile
    }
}

export default connect(mapStateToProps, {})(Home);