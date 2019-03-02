import React from 'react';
import { Redirect } from 'react-router-dom';
import Manage from '../page/manage/index';
import Decorate from '../page/decorate/Decorate';

const routeConfig = [
  {
    component: Decorate,
    exact: true,
    path: '/page/decorate/:pageId',
  },
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
