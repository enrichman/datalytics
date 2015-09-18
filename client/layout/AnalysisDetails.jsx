import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Menu, FormCreateAnalysis, CounterTwitter, TimeSeriesChart } from './../components/index.jsx';
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
        <div className="RoutePage" key={2} _grid={{x: 2, y: 0, w: 7, h: 3}}>
          <div>
            <h1>Dettagli</h1>
            <FluxComponent connectToStores={['socket', 'analysis']}>
              <CounterTwitter type="comment" channel={id} />
              <CounterTwitter type="reached" channel={id} message="persone raggiunte" />
            </FluxComponent>
            <FluxComponent connectToStores={['socket', 'analysis', 'timeSeries']}>
              <TimeSeriesChart title="" idAnalysis={id} type="linea" granularity="1minute" period={30} />
            </FluxComponent>
          </div>
        </div>
        <div key={4} _grid={{x: 9, y: 2, w: 3, h: 4}}>
          <FluxComponent>
            <FormCreateAnalysis />
          </FluxComponent>
        </div>
      </ReactGridLayout>
    );
  }

}

export default AnalysisDetails;
