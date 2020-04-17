import React, { MouseEvent } from 'react';
import './Sidebar.scss';
import ImgButton from '../../components/ImgButton/ImgButton';
import Star from '../../assets/images/star.png';
import Search from '../../assets/images/search.png';
import Add from '../../assets/images/add.png';
import Bell from '../../assets/images/bell.png';
import Blocks from '../../assets/images/blocks.png';
import Question from '../../assets/images/question.png';
import Settings from '../../assets/images/settings.png';
import Logo from '../../assets/images/logo.png';

class Sidebar extends React.Component {
  click = (e: MouseEvent<HTMLDivElement>, title: string): void => {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line
    alert(`You are click on '${title}' button`);
  };

  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar_buttons_top">
          <ImgButton
            action={this.click}
            title="MyJIRA"
            width={35}
            height={35}
            imgUrl={Logo}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Starred and resent"
            width={35}
            height={35}
            imgUrl={Star}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Search"
            width={35}
            height={35}
            imgUrl={Search}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Create"
            width={35}
            height={35}
            imgUrl={Add}
            tabIndex={0}
          />
        </div>
        <div className="Sidebar_buttons_bottom">
          <ImgButton
            action={this.click}
            title="Notifications"
            width={35}
            height={35}
            imgUrl={Bell}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Switch to..."
            width={35}
            height={35}
            imgUrl={Blocks}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Help"
            width={35}
            height={35}
            imgUrl={Question}
            tabIndex={0}
          />
          <ImgButton
            action={this.click}
            title="Settings"
            width={35}
            height={35}
            imgUrl={Settings}
            tabIndex={0}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
