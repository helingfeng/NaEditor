import React, { Component, PureComponent } from 'react';
import { addModuleRequest } from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './ModuleList.less';
import { IState } from '../interface';
import INTERFACE from '../../common/script/INTERFACE';
import isIpad from '../../common/script/isIpad';

interface IModuleListProps {
    addModuleRequest: (args: any) => void;
}

interface IModuleListState {
    list: any;
}

class ModuleList extends PureComponent<IModuleListProps, IModuleListState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: IModuleListProps) {
        super(props);
        this.addModule = this.addModule.bind(this);
        this.state = {
            list: [],
        };
    }

    async componentDidMount() {
        const result = (await axios(INTERFACE.getModuleList)).data;
        if (result.success === true) {
            const list = result.data.map((v: any) => {
                v.isActive = true;
                return v;
            });
            this.setState({
                list,
            });

            // 将moduleList挂载到上，供其他地方调用
        }
    }

    addModule(moduleTypeId: number) {
        const { addModuleRequest } = this.props;
        const pageId = this.context.BASE_DATA.pageId;

        const args = {
            moduleTypeId,
            pageId,
        };
        addModuleRequest(args);
    }

    moduleDragStart = (moduleTypeId: string, e: DragEvent) => {
        e.dataTransfer && e.dataTransfer.setData('moduleTypeId', moduleTypeId);
    }

    activeChange = (index: number) => {
        const { list } = this.state;
        const newList = list.map((v: any, i: number) => {
            if (i === index) {
                v.isActive = !v.isActive;
            }
            return v;
        });
        this.setState({
            list: newList,
        });
    }

    render() {
        const { list } = this.state;
        if (list.length > 0) {
            return (
                <div className="d-module-list" >
                    {list.map((moduleCate: any, i: number) =>
                        <React.Fragment key={i}>
                            <div
                                className={`d-module-cate ${moduleCate.isActive === true ? 'active' : ''}`}
                                onClick={() => { this.activeChange(i); }}
                            >
                                <Icon type="caret-right" />
                                <span className="d-cate-name">{moduleCate.name}</span>
                            </div>
                            <div className="d-sub-list">
                                {moduleCate.list.map((module: any, i: number) =>
                                    <div
                                        key={module.moduleTypeId}
                                        className="d-module-item"
                                        data-type-id={module.moduleTypeId}
                                        draggable={true}
                                        onClick={() => {
                                            // 如果是ipad，那么点击添加模块。PC端则不响应
                                            if (isIpad()) {
                                                this.addModule(module.moduleTypeId);
                                            }
                                        }}
                                        onDoubleClick={(e) => { this.addModule(module.moduleTypeId); }}
                                        onDragStart={this.moduleDragStart.bind(this, module.moduleTypeId)}
                                    >
                                        <div className="d-module-icon">
                                            <span style={{ backgroundImage: `url(${module.iconUrl})` }} />
                                        </div>
                                        <span className="d-module-name">{module.moduleName}</span>
                                    </div>,
                                )}
                            </div>
                        </React.Fragment>,
                    )}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default connect(null, { addModuleRequest })(ModuleList);