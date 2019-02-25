import React from 'react';
import { connect } from 'react-redux';

import ModuleTag from '../ModuleTag';
import { IState, IModuleData } from '../interface';

interface ModuleTagListProps {
  moduleList: IModuleData[];
}

interface ModuleTagListState {}

class ModuleTagList extends React.Component<
  ModuleTagListProps,
  ModuleTagListState
> {
  constructor(props: ModuleTagListProps) {
    super(props);
  }

  render() {
    const { moduleList } = this.props;
    return (
      <div className={`d-module-tag-list`}>
        {moduleList.length
          ? moduleList.map(v => (
              <ModuleTag key={v.moduleId} moduleId={v.moduleId} />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    moduleList: state.moduleList,
  };
};

export default connect(
  mapStateToProps,
  {},
)(ModuleTagList);
