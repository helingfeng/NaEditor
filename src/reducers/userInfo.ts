import { UPDATE_USER_INFO } from '../actions/userInfo';

export default (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      const { data } = action;
      return data;
    default:
      return state;
  }
};
