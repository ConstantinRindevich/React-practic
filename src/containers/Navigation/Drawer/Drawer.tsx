import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../../components/UI/Backdrop/Backdrop'
import MenuToogle from '../../../components/Navigation/MenuToogle/MenuToogle'
import { NavLink } from 'react-router-dom'

interface DrawerProps {
    isOpen: boolean;
    onToogle: () => void;
    onCloseMenu: () => void;
    isAuthenticated: boolean;
}

class Drawer extends React.Component<DrawerProps> {

    onClickHandler = () => {
        this.props.onCloseMenu();
    }

    renderLinks = (links: any[]) => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        to={link.to} 
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.onClickHandler}
                    >
                        {link.label}
                        </NavLink>
                </li>
            )
        })
    }
    render() {
        const className=[classes.Drawer];

        if (!this.props.isOpen) {
            className.push(classes.close);
        }

        let links = [];

        if (this.props.isAuthenticated) {
            links = [
                {
                    to: '/',
                    label: "Список тестов",
                    exact: true
                }, 
                {
                    to: '/quiz-creator',
                    label: "Создать тест",
                    exact: false
                },
                {
                    to: '/logout',
                    label: "Выйти",
                    exact: false
                }
            ]
        }
        else {
            links = [
                {
                    to: '/',
                    label: "Список тестов",
                    exact: true
                }, 
                {
                    to: '/auth',
                    label: "Авторизация",
                    exact: false
                }
            ]
        }

        return (
            <>
                <MenuToogle
                    isOpen={this.props.isOpen}
                    onToogle={this.props.onToogle}
                />
                {this.props.isOpen ? <Backdrop onClick={this.props.onCloseMenu}></Backdrop> : null}
                <nav className={className.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </>
        )
    }
}

export default Drawer;