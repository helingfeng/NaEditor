import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';

import { focusModule } from '../../actions';
import { IModuleData, IState } from '../interface';
// import { getModule } from '../../selectors';

interface IModuleTagProps {
  moduleId: number;
  focusModule: (moduleId: number) => void;
  top: number;
  height: number;
  isActive: boolean;
  moduleName: string;
}

interface IModuleTagState {}

class ModuleTag extends Component<IModuleTagProps, IModuleTagState> {
  constructor(props: IModuleTagProps) {
    super(props);
  }

  render() {
    const {
      moduleId,
      moduleName,
      focusModule,
      top,
      height,
      isActive,
    } = this.props;

    return (
      <Tooltip title={moduleName} placement="left">
        <div
          className={`d-module-tag ${isActive ? 'active' : ''}`}
          style={{ top, maxHeight: isActive ? '' : height }}
          onClick={() => {
            focusModule(moduleId);
          }}
        >
          {moduleName}
        </div>
      </Tooltip>
    );
  }
}

// TOOD:这里props为什么加类型会报错
const mapStateToProps = (state: IState, props: any) => {
  // 获取当前模块id
  const { moduleId } = props;

  // 筛选出本模块
  const module: IModuleData = state.moduleList.filter(
    v => v.moduleId === moduleId,
  )[0];

  const {
    tempData: { top, height, isActive },
    moduleName,
  } = module;

  return {
    top,
    height,
    isActive,
    moduleName,
  };
};

export default connect(
  mapStateToProps,
  { focusModule },
)(ModuleTag);
