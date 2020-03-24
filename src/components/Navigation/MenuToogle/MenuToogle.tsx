import React from 'react'
import classes from './MenuToogle.module.css'
import Button from '../../UI/Button/Button';

interface MenuToogleProps {
    isOpen: boolean,
    onToogle: () => void
}

const MenuToogle: React.FunctionComponent<MenuToogleProps> = (props) => {
    const classButton = [
        classes['MenuToogle']
    ]

    if (props.isOpen) {
        classButton.push(classes['open']);
    }
    else {
        classButton.push(classes['close'])
    }
    return (
        <Button
            className={classButton.join(' ')}
            onClick={props.onToogle}
            type='default'
        >
            {props.isOpen? 'Закрыть' : 'Меню'}
        </Button>
    )
}

export default MenuToogle;