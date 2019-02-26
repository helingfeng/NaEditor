import React from 'react';
import { Redirect } from 'react-router-dom';
import Manage from '../page/manage/index';

const routeConfig = [
  {
    component: Manage,
    exact: true,
    path: '/page/manage',
  },
  {
    path: '*',
    component: () => <Redirect to="/page/manage" />,
  },
];

export default routeConfig;
