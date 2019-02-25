import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';

import { IModuleData } from '../interface';
import UserDefineConfig from '../UserDefineConfig';
import { hideConfig, saveConfigRequest } from '../../actions';
import ImageHotspotConfig from '../ImageHotspotConfig';
import TextConfig from '../TextConfig';
import CarouselConfig from '../CarouselConfig';
import LayerConfig from '../LayerConfig';
import FixedConfig from '../FixedConfig';
import GoodsConfig from '../GoodsConfig';

interface ConfigDialogProps {
  moduleList?: IModuleData[];
  moduleConfig?: any;
  saveConfigRequest: any;
  hideConfig: any;
}

class ConfigDialog extends React.Component<ConfigDialogProps, any> {
  /**
   * 子配置框组件实例
   */
  subRef: any;

  constructor(props: ConfigDialogProps) {
    super(props);
    this.state = {
      moduleConfig: this.props.moduleConfig,
    };
    this.subRef = React.createRef();
  }

  componentWillReceiveProps(nextProps: ConfigDialogProps) {
    const { moduleConfig } = nextProps;
    this.setState({
      moduleConfig,
    });
  }

  handleSubmit() {
    const { saveConfigRequest } = this.props;
    const subComp = this.subRef.current.getWrappedInstance();
    const configData = subComp.getConfigData();
    let moduleData = subComp.toModuleData(configData);
    moduleData.configData = configData;
    saveConfigRequest(moduleData);
  }

  renderSub = (moduleData: any) => {
    const { moduleTypeId } = moduleData;
    switch (moduleTypeId) {
      case 1: // 自定义代码
        return <UserDefineConfig moduleData={moduleData} ref={this.subRef} />;

      case 2: // 图片热区
        return <ImageHotspotConfig moduleData={moduleData} ref={this.subRef} />;
      case 3: // 文字
        return <TextConfig moduleData={moduleData} ref={this.subRef} />;
      case 4: // 图片轮播
        return <CarouselConfig moduleData={moduleData} ref={this.subRef} />;
      case 5: // 浮层
        return <LayerConfig moduleData={moduleData} ref={this.subRef} />;
      case 6: // 定位
        return <FixedConfig moduleData={moduleData} ref={this.subRef} />;
      case 7: // 商品
        return <GoodsConfig moduleData={moduleData} ref={this.subRef} />;
      default:
        return <div>没有找到该模块的配置项</div>;
    }
  };

  render() {
    const { hideConfig, moduleList } = this.props;
    const { moduleConfig } = this.state;
    let activeModule =
      moduleList &&
      moduleList.filter((v: any) => v.tempData && v.tempData.isActive)[0];

    if (moduleConfig.isVisiable && activeModule !== undefined) {
      let top = 90;
      top += activeModule.tempData.top || 0;

      const {
        moduleData,
        moduleData: { moduleName },
      } = moduleConfig;

      return (
        <div className="d-config-dialog" style={{ top }}>
          <div className="d-header">
            <p className="d-module-name">{moduleName}</p>
            <span>
              <Icon
                className="d-close"
                type="close"
                onClick={() => hideConfig()}
              />
              <Icon type="question-circle-o" />
            </span>
          </div>
          <div className="d-content">{this.renderSub(moduleData)}</div>
          <div className="d-footer">
            <Button onClick={() => hideConfig()}>取消</Button>
            <Button
              type="primary"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              确定
            </Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    moduleConfig: state.moduleConfig,
    moduleList: state.moduleList,
  };
};

export default connect(
  mapStateToProps,
  { hideConfig, saveConfigRequest },
)(ConfigDialog);
