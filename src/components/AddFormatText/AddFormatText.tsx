import React from 'react';
import './AddFormatText.scss';

interface IProps {
  startValue: string;
  placeholder?: string;
  returnValueAction: (isCancel: boolean, value: string) => void;
  // isForceGetValue?: boolean;
}

type State = {
  tempValue: string;
};

class AddFormatText extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tempValue: props.startValue,
    };
  }

  // componentDidUpdate() {
  //   if (this.props.isForceGetValue) this.check();
  // }

  cancel = () => this.props.returnValueAction(true, '');

  check = () => {
    const { returnValueAction, startValue } = this.props;
    const { tempValue } = this.state;
    if (tempValue.trim() === '' || tempValue === startValue) {
      this.cancel();
    } else {
      returnValueAction(false, tempValue.trimEnd());
    }
  };

  typeBoardName = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const tempValue = e.currentTarget.value;
    this.setState({ tempValue });
  };

  pressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { returnValueAction } = this.props;
    if (e.keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      returnValueAction(true, '');
    }
  };

  onBlur = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.check();
  };


  render() {
    const { placeholder = '' } = this.props;
    const { tempValue } = this.state;
    return (
      <div className='AddFormatText'>
        <textarea
          value={tempValue}
          placeholder={placeholder}
          autoFocus={true}
          onChange={this.typeBoardName}
          onKeyDown={this.pressKey}
          onBlur={this.onBlur}
        />
        <button onClick={this.check}>Save</button>
        <button onClick={this.cancel}>Cancel</button>
      </div>
    );
  }
}

export default AddFormatText;
