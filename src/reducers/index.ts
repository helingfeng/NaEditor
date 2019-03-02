import { combineReducers } from 'redux';

import moduleConfig from './configReducer';
import moduleList from './moduleListReducer';
import templateList from './templateList';
import userInfo from './userInfo';
import pageInfo from './pageInfo';

export default combineReducers({
  moduleList,
  moduleConfig,
  templateList,
  userInfo,
  pageInfo,
});
