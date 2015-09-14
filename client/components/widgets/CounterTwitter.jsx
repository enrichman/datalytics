import React from 'react';
import _ from 'lodash';

class CounterTwitter extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
    counter: React.PropTypes.number,
    style: React.PropTypes.object,
    _style: React.PropTypes.object,
  }

  static defaultProps = {
    message: 'tweet pubblicati',
    counter: 0,
    style: {},
    _style: {
      wrap: {
        width: '50%',
        float: 'left',
      },
      h2: {
        textAlign: 'center',
        paddingTop: '3em',
      },
      counter: {
        textAlign: 'center',
        paddingTop: '3em',
      },
      message: {
        display: 'block',
      },
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const style = _.merge(this.props._style, this.props.style);
    return (
      <div style={style.wrap}>
        <h2 style={style.h2}>
          <span style={style.counter}>{this.props.counter}</span>
          <span style={style.message}>{this.props.message}</span>
        </h2>
      </div>
    );
  }

}

export default CounterTwitter;
