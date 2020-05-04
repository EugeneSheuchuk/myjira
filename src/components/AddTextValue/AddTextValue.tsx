import React from 'react';
import './AddTextValue.scss';

interface IProps {
  startValue: string;
  placeholder?: string;
  returnValueAction: (isCancel: boolean, value: string) => void;
  isForceGetValue?: boolean;
}

type State = {
  tempValue: string;
};

class AddTextValue extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tempValue: props.startValue,
    };
  }

  componentDidUpdate() {
    if (this.props.isForceGetValue) this.check();
  }

  check = () => {
    const { returnValueAction, startValue } = this.props;
    const tempValue = this.state.tempValue.trim();
    if (tempValue === '' || tempValue === startValue) {
      returnValueAction(true, '');
    } else {
      returnValueAction(false, tempValue);
    }
  };

  typeBoardName = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const tempValue = e.currentTarget.value;
    this.setState({ tempValue });
  };

  pressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { returnValueAction } = this.props;
    if (e.keyCode === 27) {
      returnValueAction(true, '');
    } else if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.check();
    }
  };

  onBlur = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.check();
  };

  render() {
    const { placeholder = '' } = this.props;
    const { tempValue } = this.state;
    return (
      <textarea
        value={tempValue}
        placeholder={placeholder}
        autoFocus={true}
        onChange={this.typeBoardName}
        onKeyDown={this.pressKey}
        onBlur={this.onBlur}
      />
    );
  }
}

export default AddTextValue;
