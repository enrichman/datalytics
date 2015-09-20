import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Menu, CounterTwitter, TimeSeriesChart } from './../components/index.jsx';

import {
  ChartVolumeLastMinuteContainer,
  ChartVolumeLastHourContainer,
  ChartSentimentLastMinuteContainer,
  ChartSentimentLastHourContainer,
} from './../containers/index.jsx';

import FluxComponent from 'flummox/component';

class AnalysisDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props.params;
    return (
      <ReactGridLayout isDraggable={false} isResizable={false} className="Bacheca" cols={12} rowHeight={100}>
        <div key={1} _grid={{x: 0, y: 0, w: 2, h: 4}}>
          <Menu />
        </div>
        <div className="RoutePage" key={2} _grid={{x: 2, y: 0, w: 10, h: 3}}>
          <div>
            <h1>Dettagli</h1>

            <FluxComponent connectToStores={['socket', 'analysis']}>
              <CounterTwitter type="comment" channel={id} />
              <CounterTwitter type="reached" channel={id} message="persone raggiunte" />
            </FluxComponent>

            <FluxComponent connectToStores={['timeSeries']}>
              <ChartVolumeLastMinuteContainer id={id} />
              <ChartSentimentLastMinuteContainer id={id} />
              <ChartVolumeLastHourContainer id={id} />
              <ChartSentimentLastHourContainer id={id} />
            </FluxComponent>

          </div>
        </div>
      </ReactGridLayout>
    );
  }

}

export default AnalysisDetails;
