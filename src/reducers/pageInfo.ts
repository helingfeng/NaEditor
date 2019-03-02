import { UPDATE_PAGE_INFO } from '../actions/pageInfo';

export default (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_PAGE_INFO:
      const { data } = action;
      return { ...state, ...data };
    default:
      return state;
  }
};
