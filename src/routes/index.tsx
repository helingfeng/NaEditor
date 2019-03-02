import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routeConfig from './routeConfig';

class RoutesWrapper extends React.Component {
  componentDidMount() {
    this.getInitialData();
  }
  getInitialData = () => {};
  render() {
    return null;
  }
}

const Routes = () => (
  <BrowserRouter basename="/">{renderRoutes(routeConfig)}</BrowserRouter>
);

export default Routes;
