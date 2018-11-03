import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { showConfig, focusModule, removeModuleRequest, positionModuleRequest } from '../../actions';
import { IState } from '../interface';

interface IModuleNavItemProps {
    moduleId: number;
    isActive: boolean;
    isConfigVisible: boolean;
    moduleName: string;
    showConfig?: any;
    moduleData?: any;
    moduleConfig?: any;
    currentDrag?: number;
    focusModule: (moduleId: number) => void;
    removeModuleRequest: (args: any) => void;
    onDragedChange: (moduleId: number | undefined) => void;
    positionModuleRequest: (args: any) => void;
}

interface IModuleNavItemState {
    isDragOver: boolean;
    isVisible: boolean;
}

class ModuleNavItem extends PureComponent<IModuleNavItemProps, IModuleNavItemState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: IModuleNavItemProps) {
        super(props);
        this.state = {
            isDragOver: false,
            isVisible: true,
        };
    }

    componentWillReceiveProps(nextProps: IModuleNavItemProps) {
        if (nextProps.currentDrag === undefined) {
            this.setState({
                isDragOver: false,
            });
        }
    }

    onDragStart = (e: DragEvent) => {
        const {
            moduleData: {
                moduleId,
            },
            onDragedChange,
        } = this.props;
        this.setState({
            isVisible: false,
        });
        onDragedChange(moduleId);
        e.dataTransfer && e.dataTransfer.setData('moduleId', moduleId);
    }

    onDragEnter = (e: DragEvent) => {
        const {
            moduleData: {
                moduleId,
            },
        } = this.props;
        const { currentDrag } = this.props;

        if (moduleId !== currentDrag) {
            this.setState({
                isDragOver: true,
            });
        }
    }

    onDragLeave = () => {
        this.setState({
            isDragOver: false,
        });
    }

    onDrop = (e: React.DragEvent) => {
        const targetModuleId: number = Number.parseInt(e.dataTransfer.getData('moduleId'), 10);
        const {
            moduleData: {
                moduleId,
            },
            currentDrag,
            positionModuleRequest,
            onDragedChange,
        } = this.props;
        const { pageId } = this.context.BASE_DATA;
        // 移动自己不生效
        if (currentDrag === moduleId) { return; }
        positionModuleRequest({
            moduleId: targetModuleId,
            preModuleId: moduleId,
            pageId,
        });
        onDragedChange(undefined);
    }

    render() {

        const {
            isActive,
            isConfigVisible,
            moduleName,
            moduleData,
            moduleId,
            showConfig,
            focusModule,
            removeModuleRequest,
        } = this.props;

        const { isDragOver } = this.state;
        const { pageId } = this.context.BASE_DATA;
        return (
            <React.Fragment>
                <li
                    className={`d-module-nav-item ${isActive ? 'active' : ''}`}
                    onClick={(e) => { focusModule(moduleId); if (isConfigVisible) { showConfig(moduleData); } }}
                    onDragStart={(e: any) => { this.onDragStart(e); }}
                    onDragEnter={(e: any) => { this.onDragEnter(e); }}
                    onDragOver={(e: React.DragEvent) => { e.preventDefault(); }}
                    onDrop={(e: any) => { this.onDrop(e); }}
                    onDragLeave={this.onDragLeave}
                    draggable={true}
                >
                    <span className="d-module-name">{moduleName}</span>
                    <span className="d-module-operate">
                        <Icon
                            className="d-operate-icon"
                            type="setting"
                            onClick={(e) => { showConfig(moduleData); }}
                        />
                        <Icon
                            className="d-operate-icon"
                            type="delete"
                            onClick={(e) => { removeModuleRequest({ moduleId, pageId }); }}
                        />
                    </span>
                </li>
                {isDragOver ? <div className="d-placeholder" /> : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IState, props: any) => {

    const { moduleId } = props;

    const module = state.moduleList.filter(v => v.moduleId === moduleId)[0];

    const {
        tempData: {
            isActive,
        },
        moduleName,
    } = module;

    const {
        isVisible: isConfigVisible,
    } = state.moduleConfig;

    return {
        isActive,
        isConfigVisible,
        moduleName,
        moduleData: module,
    };
};

export default connect(mapStateToProps, {
    showConfig,
    focusModule,
    removeModuleRequest,
    positionModuleRequest,
})(ModuleNavItem);