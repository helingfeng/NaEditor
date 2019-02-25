import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import Module from '../Module';
import { IModuleData, HotspotInfo, IContext } from '../interface';
import isServer from '../../common/script/isServer';

interface FixedProps {
  moduleData: IModuleData;
}

interface FixedState {}

export default class Fixed extends Component<FixedProps, FixedState> {
  static contextTypes = {
    BASE_DATA: PropTypes.object,
  };

  rootEl?: HTMLDivElement;

  constructor(props: FixedProps) {
    super(props);
  }

  componentDidMount() {
    this.rootEl = document.createElement('div');
    if (this.context.BASE_DATA.pageType !== 0) {
      document.body.appendChild(this.rootEl);
      // 触发一次更新，rootEl被渲染出来
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.rootEl && this.rootEl.remove();
  }

  onClose = () => {
    this.rootEl && this.rootEl.remove();
  };

  renderChild = () => {
    let {
      moduleData: {
        data: {
          imgUrl,
          hotspots,
          vertical,
          verticalDir,
          verticalUnit,
          horizontal,
          horizontalDir,
          horizontalUnit,
          width,
          widthUnit,
        },
      },
    } = this.props;

    verticalUnit === undefined && (verticalUnit = '%');
    horizontalUnit === undefined && (horizontalUnit = '%');

    let left, right, top, bottom;

    if (verticalDir === 'top') {
      top = `${vertical}${verticalUnit}`;
    } else {
      verticalDir = verticalDir;
      verticalUnit = verticalUnit;
      bottom = `${vertical}${verticalUnit}`;
    }

    if (horizontalDir === 'left') {
      left = `${horizontal}${horizontalUnit}`;
    } else {
      horizontal = horizontal;
      horizontalUnit = horizontalUnit;
      right = `${horizontal}${horizontalUnit}`;
    }
    return (
      <div
        className="d-fixed"
        style={{
          left,
          right,
          top,
          bottom,
          width: `${width ? `${width}${widthUnit}` : 'auto'}`,
        }}
      >
        <div className="d-img">
          <img src={imgUrl} />
          <div className="d-hotspots-wrap">
            {hotspots &&
              hotspots.map((v: HotspotInfo, i: number) => {
                return <a key={i} href={v.url} />;
              })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { moduleData } = this.props;
    const isDecorate = this.context.BASE_DATA.pageType === 0;

    // 装修时的展示
    if (isDecorate) {
      return (
        <Module moduleData={moduleData}>
          <span className="d-hint">定位模块效果请在预览页中查看</span>
        </Module>
      );
    } else {
      if (this.rootEl !== undefined) {
        return ReactDOM.createPortal(this.renderChild(), this.rootEl);
      } else {
        return null;
      }
    }
  }
}
