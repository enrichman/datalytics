import React from 'react';
import { List } from 'material-ui';
import MenuItem from './MenuItem.jsx';
import NavLink from './../Router/components/NavLink.jsx';
import Route from './../Router/components/Route.jsx';
import FluxComponent from 'flummox/component';
import ReactGridLayout from 'react-grid-layout';
import MyAnalysis from './pages/MyAnalysis.jsx';
import Prefered from './pages/Prefered.jsx';
import Popular from './pages/Popular.jsx';
import Question from './pages/Question.jsx';
import AnalysisDetails from './pages/AnalysisDetails.jsx';
import FormCreateAnalysis from './forms/FormCreateAnalysis.jsx';

class Bacheca extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.logged ? (
      <ReactGridLayout isDraggable={false} isResizable={false} className="Bacheca" cols={12} rowHeight={100}>
        <List key={1} _grid={{x: 0, y: 0, w: 2, h: 4}}>
          <FluxComponent connectToStores={['route']}>
            <NavLink href="/" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="area-chart" text="Le mie analisi" /></FluxComponent>} />
            <NavLink href="/bookmark" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="bookmark" text="Preferite" /></FluxComponent>} />
            <NavLink href="/star/1" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="star" text="Popolari" /></FluxComponent>} />
            <NavLink href="/question" handler={<FluxComponent connectToStores={['datalytics']}><MenuItem icon="question-circle" text="Assistenza" /></FluxComponent>} />
          </FluxComponent>
        </List>
        <div className="RoutePage" key={2} _grid={{x: 2, y: 0, w: 7, h: 3}}>
          <FluxComponent connectToStores={['route']}>
            <Route path="/" page={<FluxComponent connectToStores={['datalytics']}><MyAnalysis /></FluxComponent>} />
            <Route path="/bookmark" page={<FluxComponent connectToStores={['datalytics']}><Prefered /></FluxComponent>} />
            <Route path="/star/:id" page={<FluxComponent connectToStores={['datalytics']}><Popular /></FluxComponent>} />
            <Route path="/question" page={<FluxComponent connectToStores={['datalytics']}><Question /></FluxComponent>}/>
            <Route path="/analysis/:id" page={<FluxComponent connectToStores={['datalytics', 'route']}><AnalysisDetails /></FluxComponent>}/>
          </FluxComponent>
        </div>
        <div key={4} _grid={{x: 9, y: 2, w: 3, h: 4}}>
          <FluxComponent connectToStores={['datalytics']}>
            <FormCreateAnalysis />
          </FluxComponent>
        </div>
      </ReactGridLayout>
    ) : null;
  }

}

export default Bacheca;
