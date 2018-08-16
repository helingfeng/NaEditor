import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from 'antd';

import Module from '../Module';
import { IModuleData, HotspotInfo } from '../interface';


interface LayerProps {
    moduleData: IModuleData;
}

interface LayerState {

}

const body = document.body;
const pageType = (window as any).BASE_DATA.type;

const rootEl = document.createElement('div');
rootEl.classList.add('d-layer')

export default class Layer extends React.Component<LayerProps, LayerState> {


    constructor(props: LayerProps) {
        super(props);
    }

    componentDidMount() {
        if (pageType !== '0') {
            body.appendChild(rootEl);
        }
    }

    componentWillUnmount() {
        rootEl.remove();
    }

    onClose = () => {
        rootEl.remove();
    }

    renderChild = () => {

        let {
            moduleData: {
                data: {
                    imgUrl,
                    hotspots,
                },
            },
        } = this.props;

        return (
            <React.Fragment>
                <div className="d-img">
                    <img src={imgUrl} />
                    <Icon type="close" />
                    <div className="d-hotspots-wrap">
                        {hotspots && hotspots.map((v: HotspotInfo) => {
                            <a href={v.url}></a>
                        })}
                    </div>

                </div>
                <div className="d-mask" onClick={this.onClose}></div>
            </React.Fragment>
        )
    }

    render() {
        const { moduleData } = this.props;

        // 装修时的展示
        if (pageType === '0') {
            return (
                <Module moduleData={moduleData}>
                    <span className="d-hint">浮层模块效果请在预览页中查看</span>
                </Module>
            );
        } else {
            return ReactDOM.createPortal(
                this.renderChild(),
                rootEl,
            );
        }

    }
}