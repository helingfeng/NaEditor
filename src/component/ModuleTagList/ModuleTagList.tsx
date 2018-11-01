import React from 'react';
import { connect } from 'react-redux';

import ModuleTag from '../ModuleTag';
import { IModule, IState, IModuleData } from '../interface';

interface ModuleTagListProps {
    moduleList: IModuleData[];

}

interface ModuleTagListState {

}

class ModuleTagList extends React.Component<ModuleTagListProps, ModuleTagListState> {

    constructor(props: ModuleTagListProps) {
        super(props);

    }

    render() {

        return (
            <div className={`d-module-tag-list`}>
                {this.props.moduleList.map(v => <ModuleTag key={v.moduleId} moduleId={v.moduleId} />)}
            </div>
        );
    }

}

const mapStateToProps = (state: IState) => {
    return {
        moduleList: state.module.moduleList,
    };
};

export default connect(mapStateToProps, {
})(ModuleTagList);
