import { combineReducers } from 'redux';

import moduleConfig from './configReducer';
import moduleList from './moduleListReducer';
import templateList from './templateList';

export default combineReducers({
  moduleList,
  moduleConfig,
  templateList,
});
