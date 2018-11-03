import { combineReducers } from 'redux';

import moduleConfig from './configReducer';
import moduleList from './moduleListReducer';

export default combineReducers({
    moduleList,
    moduleConfig,
});