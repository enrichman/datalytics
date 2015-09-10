import FluxComponent from 'flummox/component';
import React from 'react';
import AppFlux from './appFlux.jsx';
import Datalytics from './components/Datalytics.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const flux = new AppFlux();

React.render(
  <FluxComponent flux={flux}>
    <Datalytics />
  </FluxComponent>,
  document.body
);
