import React from 'react';
import mui from 'material-ui';
import MenuItem from './MenuItem.jsx';
import NavLink from './../Router/components/NavLink.jsx';
import Route from './../Router/components/Route.jsx';
import FluxComponent from 'flummox/component';
import ReactGridLayout from 'react-grid-layout';
import MyAnalysis from './pages/MyAnalysis.jsx';
import Prefered from './pages/Prefered.jsx';
import Popular from './pages/Popular.jsx';
import Question from './pages/Question.jsx';
import FormCreateAnalysis from './forms/FormCreateAnalysis.jsx';

class Bacheca extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.logged ? (
      <ReactGridLayout className="Bacheca" cols={12} rowHeight={100}>
        <mui.List key={1} _grid={{x: 0, y: 0, w: 3, h: 4}}>
          <FluxComponent connectToStores={['route']}>
            <NavLink route="my_analysis" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="area-chart" text="Le mie analisi" /></FluxComponent>} />
            <NavLink route="bookmark" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="bookmark" text="Preferite" /></FluxComponent>} />
            <NavLink route="star" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="star" text="Popolari" /></FluxComponent>} />
            <NavLink route="question" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="question-circle" text="Assistenza" /></FluxComponent>} />
          </FluxComponent>
        </mui.List>
        <div className="RoutePage" key={2} _grid={{x: 3, y: 0, w: 5, h: 3}}>
          <FluxComponent connectToStores={['route']}>
            <Route name="my_analysis" page={<FluxComponent connectToStores={['datalytics']}><MyAnalysis /></FluxComponent>} />
            <Route name="bookmark" page={<FluxComponent connectToStores={['datalytics']}><Prefered /></FluxComponent>} />
            <Route name="star" page={<FluxComponent connectToStores={['datalytics']}><Popular /></FluxComponent>} />
            <Route name="question" page={<FluxComponent connectToStores={['datalytics']}><Question /></FluxComponent>}/>
          </FluxComponent>
        </div>
        <div key={4} _grid={{x: 10, y: 2, w: 4, h: 4}}>
          <FluxComponent connectToStores={['datalytics']}>
            <FormCreateAnalysis />
          </FluxComponent>
        </div>
      </ReactGridLayout>
    ) : null;
  }

}

export default Bacheca;
