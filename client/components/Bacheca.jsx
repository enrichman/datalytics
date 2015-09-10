import React from 'react';
import mui from 'material-ui';
import TwitterButton from './TwitterButton.jsx';
import RouteMenuItem from './RouteMenuItem.jsx';
import RoutePage from './RoutePage.jsx';
import FluxComponent from 'flummox/component';
import ReactGridLayout from 'react-grid-layout';
import RouteMyAnalysis from './RouteMyAnalysis.jsx';
import RoutePrefered from './RoutePrefered.jsx';
import RoutePopular from './RoutePopular.jsx';
import RouteQuestion from './RouteQuestion.jsx';

class Bacheca extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.logged ? (
      <ReactGridLayout className="layout" cols={12} rowHeight={100}>
        <mui.List key={1} _grid={{x: 0, y: 0, w: 3, h: 4}}>
          <FluxComponent connectToStores={['datalytics']}>
            <RouteMenuItem icon="area-chart" route="my_analysis" text="Le mie analisi" />
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RouteMenuItem icon="bookmark" route="bookmark" text="Preferite" />
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RouteMenuItem icon="star" route="star" text="Popolari" />
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RouteMenuItem icon="question-circle" route="question" text="Assistenza" />
          </FluxComponent>
        </mui.List>
        <div className="RoutePage" key={2} _grid={{x: 3, y: 0, w: 9, h: 3}}>
          <FluxComponent connectToStores={['datalytics']}>
            <RoutePage name="my_analysis" page={<RouteMyAnalysis />}>analisi</RoutePage>
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RoutePage name="bookmark" page={<RoutePrefered />}></RoutePage>
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RoutePage name="star" page={<RoutePopular />}></RoutePage>
          </FluxComponent>
          <FluxComponent connectToStores={['datalytics']}>
            <RoutePage name="question" page={<RouteQuestion />}></RoutePage>
          </FluxComponent>
        </div>
      </ReactGridLayout>
    ) : null;
  }

}

export default Bacheca;
