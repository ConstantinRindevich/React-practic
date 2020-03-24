import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';

interface LogoutProps {
    logout: () => void;
}

class Logout extends React.Component<LogoutProps> {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <Redirect to={'/'} />
        )
    }
}

function mapDispatchToProps (dispatch: any) {
    return ({
        logout: () => dispatch(logout())
    })
}

export default connect(null, mapDispatchToProps)(Logout);