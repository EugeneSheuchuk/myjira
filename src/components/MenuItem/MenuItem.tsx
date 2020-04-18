import React, { KeyboardEvent } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuItem.scss';

type TProps = {
    imgURL: string;
    name: string;
    action?: Function;
    tabIndex: number;
};

const MenuItem: React.FC<TProps> = ({
                                        imgURL,
                                        name,
                                        action,
                                        tabIndex,
                                    }) => {

    const defaultFunc = () => {
    };
    const componentAction = action || defaultFunc;

    // eslint-disable-next-line
    const pressEnter = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') componentAction(e);
    };

    return (
        <NavLink
            to='/'
            className="MenuItem"
            onKeyPress={(e: KeyboardEvent) => pressEnter(e)}
            tabIndex={tabIndex}
            activeClassName='MenuItem_active'
        >
            <img src={imgURL} className="MenuItem_icon" alt={`${name}`}/>
            <div className="MenuItem_name">{name}</div>
        </NavLink>
    );
};

export default MenuItem;
