import React from 'react';
import './Menu.scss'
import MenuItem from '../../components/MenuItem/MenuItem';
import Settings from '../../assets/images/settings.png';

type TState = {
    width: number;
};

class Menu extends React.Component<{}, TState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            width: 240,
        }
    }

    render() {
        return (
            <div className='Menu' style={{width: `${this.state.width}px`}}>
                <MenuItem imgURL={Settings} name='Settings' tabIndex={0}/>
            </div>
        );
    }
}

export default Menu;