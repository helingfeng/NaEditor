import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isArray, isPlainObject, isString } from 'lodash';

// TODO:单测
function Connect(mapStates: string | string[], mapActions?: any, ...args: any) {
  let mapDispatchToProps: any;
  let mapStateToProps: any;

  // 如果"mapActions"是一个对象，那么说明使用了简写形式，这时候要根据mapActions去生成mapStateToProps函数
  if (isPlainObject(mapActions)) {
    mapDispatchToProps = (dispatch: any) =>
      bindActionCreators(mapActions, dispatch);
  } else {
    mapDispatchToProps = mapActions;
  }

  // 如果mapStates是一个字符串，那么先按','或空格，分隔成数组
  if (isString(mapStates)) {
    mapStates = mapStates.split(/[\s,]+/);
  }
  // 如果mapStates是一个数组,说明使用了数组简写形式，这时候要根据array中的key去生成mapStates
  if (isArray(mapStates)) {
    mapStateToProps = (state: any) =>
      (mapStates as string[]).reduce((acc: any, v) => {
        acc[v] = state[v];
        return acc;
      }, {});
  } else {
    mapStateToProps = mapStates;
  }

  return function(target: React.Component) {
    return (connect as any)(mapStateToProps, mapDispatchToProps, ...args)(
      target,
    );
  };
}

export default Connect;
