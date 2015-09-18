import React from 'react';
import FluxComponent from 'flummox/component';
import AppFlux from './appFlux.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Router, IndexRoute } from 'react-router';
import { Datalytics, Home, AnalysisDetails, Prefered, Popular, Question } from './layout/index.jsx';

injectTapEventPlugin();

const flux = new AppFlux();

React.render(
  <FluxComponent flux={flux}>
    <Router>
      <Route location="history" path="/" component={Datalytics}>
        <IndexRoute component={Home}/>
        <Route path="analysis/:id" component={AnalysisDetails}/>
        <Route path="bookmark" component={Prefered}/>
        <Route path="popular" component={Popular}/>
        <Route path="question" component={Question}/>
      </Route>
    </Router>
  </FluxComponent>,
  document.body
);
