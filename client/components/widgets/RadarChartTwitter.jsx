import React from 'react';
import { Radar } from 'react-chartjs';
import _ from 'lodash';

class RadarChartTwitter extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    style: React.PropTypes.object,
    _style: React.PropTypes.object,
    _data: React.PropTypes.object,
  };

  static defaultProps = {
    data: {},
    style: {},
    _data: {
      labels: ['pizza', 'mandolino', 'pasta'],
      datasets: [
        {
          label: 'RadarChartTwitter',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [28, 48, 40],
        },
      ],
    },
    _style: {
      wrap: {
        width: '50%',
        float: 'left',
      },
      Radar: {
        width: '100%',
        height: '250',
      },
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const style = _.merge(this.props._style, this.props.style);
    const data = _.merge(this.props._data, this.props.data);
    return (
      <div style={style.wrap}>
        <Radar data={data} width={style.Radar.width} height={style.Radar.height} />
      </div>
    );
  }

}

export default RadarChartTwitter;
