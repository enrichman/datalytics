import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import { Menu, FormCreateAnalysis, CounterTwitter, TimeSeriesChart } from './../components/index.jsx';
import FluxComponent from 'flummox/component';
import moment from 'moment';

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
            <FluxComponent connectToStores={['socket', 'analysis', 'timeSeries']}>
              <TimeSeriesChart
                config={{
                  title: {
                    text: 'Ultimo minuto',
                  },
                  xAxis: {
                    labels: {
                      formatter: function() {
                        return moment(this.value * 1000).format('HH:mm:ss');
                      },
                    },
                  },
                }}
                query={{
                  analysis: 'timeseries',
                  key: id,
                  type: 'area',
                  granularity: '1second',
                  period: 60,
                }}
              />
            </FluxComponent>

            <FluxComponent connectToStores={['socket', 'analysis', 'timeSeries']}>
              <TimeSeriesChart
                config={{
                  title: {
                    text: 'Ultima ora',
                  },
                  xAxis: {
                    labels: {
                      formatter: function() {
                        return moment(this.value * 1000).format('HH:mm');
                      },
                    },
                  },
                }}
                query={{
                  analysis: 'timeseries',
                  key: id,
                  type: 'area',
                  granularity: '1minute',
                  period: 60,
                }}
              />
            </FluxComponent>

            <FluxComponent connectToStores={['socket', 'analysis', 'timeSeries']}>
              <TimeSeriesChart
                _config={{
                  chart: {
                    type: 'scatter',
                    zoomType: 'xy',
                  },
                  title: {
                    text: 'Analisi sentiment/volume dell\'ultimo minuto',
                  },
                  yAxis: {
                    title: {
                      text: 'Sentiment',
                    },
                  },
                  plotOptions: {
                    scatter: {
                      tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} tweet, {point.y} sentiment',
                      },
                    },
                  },
                }}
                query={{
                  analysis: 'sentiment',
                  key: id,
                  granularity: '1minute',
                  period: 1,
                }}
                />
            </FluxComponent>

            <FluxComponent connectToStores={['socket', 'analysis', 'timeSeries']}>
              <TimeSeriesChart
                _config={{
                  chart: {
                    type: 'scatter',
                    zoomType: 'xy',
                  },
                  title: {
                    text: 'Analisi sentiment/volume di oggi',
                  },
                  yAxis: {
                    title: {
                      text: 'Sentiment',
                    },
                  },
                  plotOptions: {
                    scatter: {
                      tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} tweet, {point.y} sentiment',
                      },
                    },
                  },
                }}
                query={{
                  analysis: 'sentiment',
                  key: id,
                  granularity: '1day',
                  period: 1,
                }}
                />
            </FluxComponent>
          </div>
        </div>
      </ReactGridLayout>
    );
  }

}

export default AnalysisDetails;
