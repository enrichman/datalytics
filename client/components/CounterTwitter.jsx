import React from 'react';

class CounterTwitter extends React.Component {

  static propTypes = {
    type: React.PropTypes.string,
    message: React.PropTypes.string,
    background: React.PropTypes.string,
    counter: React.PropTypes.number,
    _style: React.PropTypes.object,
  }

  static defaultProps = {
    type: 'comments',
    message: 'tweet pubblicati',
    background: '#4f5592',
    counter: 0,
    _style: {
      wrap: {
        width: '48%',
        margin: '1%',
        float: 'left',
        height: '125px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      h4: {
        color: '#fff',
        textAlign: 'center',
      },
      counter: {
        fontSize: '2em',
        textAlign: 'center',
      },
      message: {
        display: 'block',
      },
    },
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.stream = this.props.socket.subscribe(`${this.props.channel}:ping`);
  }

  componentDidMount() {
    this.stream.watch(ping => {
      this.setState({
        counter: this.state.counter + ping[this.props.type],
      });
    });
  }

  componentWillUnmount() {
    this.stream.unsubscribe(`${this.props.channel}:ping`);
  }

  state = {
    counter: 0,
  }

  render() {
    const style = this.props._style;
    style.wrap.background = this.props.background;
    return (
      <div style={style.wrap}>
        <h4 style={style.h4}>
          <span style={style.counter}>{this.state.counter}</span>
          <span style={style.message}>{this.props.message}</span>
        </h4>
      </div>
    );
  }

}

export default CounterTwitter;
