import React, {MouseEvent} from 'react';
import './ImgButton.scss';

type TProps = {
    styleClassName?: string;
    width: number;
    height: number;
    imgUrl: string;
    action?: Function;
};

class ImgButton extends React.Component<TProps> {
    render() {
        const { styleClassName, width, height, imgUrl, action } = this.props;
        const style = {
            backgroundImage: `url('${imgUrl}')`,
            width: `${width}px`,
            height: `${height}px`,

        };
        const componentAction = action ? action : (e:MouseEvent):void => {};

        return (
            <div className={`ImgButton ${styleClassName}`}
                 style={style}
                 onClick={(e:MouseEvent<HTMLDivElement>) => componentAction(e)}/>
        );
    }
}

export default ImgButton;