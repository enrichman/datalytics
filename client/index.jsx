import FluxComponent from 'flummox/component';
import React from 'react';
import AppFlux from './appFlux.jsx';
import Datalytics from './components/Datalytics.jsx';
import socketCluster from 'socketcluster-client';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const flux = new AppFlux();
const socket = socketCluster.connect({port: 3000});

React.render(
  <FluxComponent socket={socket} flux={flux}>
    <Datalytics />
  </FluxComponent>,
  document.body
);
