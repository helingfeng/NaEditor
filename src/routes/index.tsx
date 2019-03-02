import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routeConfig from './routeConfig';

import { getInitalData } from '../api';
import Connect from '../component/Connect';
import { updateUserInfo } from '../actions/userInfo';
import { updatePageInfo } from '../actions/pageInfo';

@(Connect('userInfo', { updateUserInfo, updatePageInfo }) as any)
class RoutesWrapper extends React.Component<any, any> {
  componentDidMount() {
    this.getInitialData();
  }
  async getInitialData() {
    const { username, pageInfo, pageId } = await getInitalData(0);
    this.props.updateUserInfo({ username });
    this.props.updatePageInfo({ ...pageInfo, ...{ pageId } });
  }
  render() {
    return this.props.children;
  }
}

const Routes = () => (
  <RoutesWrapper>
    <BrowserRouter basename="/">{renderRoutes(routeConfig)}</BrowserRouter>
  </RoutesWrapper>
);

export default Routes;
