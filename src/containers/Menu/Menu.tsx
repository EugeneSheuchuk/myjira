import React from 'react';
import './Menu.scss'
import MenuItem from '../../components/MenuItem/MenuItem';
import Settings from '../../assets/images/settings.png';
import Roadmap from '../../assets/images/roadmap.png';
import Board from '../../assets/images/board.png';
import AddItem from '../../assets/images/additem.png';
import Page from '../../assets/images/page.webp';

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
                <MenuItem imgURL={Roadmap} name='Roadmap' tabIndex={0}/>
                <MenuItem imgURL={Board} name='Board' tabIndex={0}/>
                <MenuItem imgURL={Page} name='Pages' tabIndex={0}/>
                <MenuItem imgURL={AddItem} name='Add item' tabIndex={0}/>
                <MenuItem imgURL={Settings} name='Property settings' tabIndex={0}/>
            </div>
        );
    }
}

export default Menu;