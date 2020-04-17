import React from 'react';
import './Sidebar.scss';
import ImgButton from '../../components/ImgButton/ImgButton';
import Star from '../../assets/images/star.png';

class Sidebar extends React.Component {
    render() {
        return (
            <div className='Sidebar'>
                <div className='Sidebar_buttons_top'>
                    <div className='Sidebar_logo'>J</div>
                </div>
                <ImgButton styleClassName={''} width={25} height={25} imgUrl={Star}/>
                <div className='Sidebar_buttons_bottom'>

                </div>

            </div>
        );
    }
}

export default Sidebar;