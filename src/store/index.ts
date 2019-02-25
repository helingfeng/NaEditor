import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from '../reducers';
import isServer from '../common/script/isServer';
import { IState } from '../component/interface';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
}
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

let initialState: any = {
  moduleList: [],
  moduleConfig: {
    isVisible: false,
    moduleData: undefined,
  },
};
if (!isServer()) {
  initialState = (window as any).__INITIAL_STATE__ || initialState;
} else {
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ),
);

export const initialStore = initialState;

if (!isServer()) {
  (window as any).store = store;
}

export default store;
