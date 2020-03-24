import React from 'react';
import classes from './Layout.module.scss';
import Drawer from '../../containers/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';
import { autoLogin } from '../../store/actions/auth';

interface LayoutProps {
    isAuthenticated: boolean,
    autoLogin: () => void
}

class Layout extends React.Component<LayoutProps> {

    state = {
        menuOpen: false
    }

    componentDidMount() {
        this.props.autoLogin();
    }

    onToogleHandler = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    onCloseMenuHandler = () => {
        this.setState({
            menuOpen: false
        })
    }

    render() {
        return (
            <div className={classes['Layout']}>
                <Drawer 
                    isOpen={this.state.menuOpen} 
                    onToogle={this.onToogleHandler} 
                    onCloseMenu={this.onCloseMenuHandler} 
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps (state: any) {
    return {
        isAuthenticated: !!state.auth.token 
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        autoLogin: () => {dispatch(autoLogin())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout)