import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ReactLoading from 'react-loading';

import { IModuleData, IState, IBASE_DATA, IContext } from '../interface';
import UserDefine from '../UserDefine';
import ImageHotspot from '../ImageHotspot';
import Text from '../Text';
import { fetchModuleList, focusModule, addModuleRequest } from '../../actions';
import Carousel from '../Carousel';
import Layer from '../Layer';
import Fixed from '../Fixed';
import Goods from '../Goods';

interface ICanvasProps {
  fetchModuleList: (pageId: number) => void;
  moduleList: IModuleData[];
  addModuleRequest: (args: any) => void;
}

interface ICanvasState {
  nextPlaceholder?: HTMLDivElement;
  isLoading: boolean;
}

class Canvas extends React.Component<ICanvasProps, ICanvasState> {
  static contextTypes = {
    BASE_DATA: PropTypes.object,
  };

  root?: HTMLDivElement;

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      nextPlaceholder: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    // 初始化模块
    this.props.fetchModuleList(this.context.BASE_DATA.pageId.toString());

    // 开启loading
    if (this.context.BASE_DATA.pageType === 0) {
      // type为0为装修
      setTimeout(() => {
        (window as any).resizeIframe();
      }, 1000);
    }
  }

  componentWillReceiveProps(props: ICanvasProps) {
    this.setState({
      isLoading: false,
    });
  }

  /**
   * 画布更新
   */
  componentDidUpdate() {
    if (this.context.BASE_DATA.pageType === 0) {
      // type为0为装修
      (window as any).resizeIframe();
    }
  }

  dragOver = (e: React.DragEvent) => {
    const { nextPlaceholder } = this.state;
    if (nextPlaceholder === undefined) {
      const placeholder = document.createElement('div');
      placeholder.className = 'd-next-placeholder';
      placeholder.innerHTML = `松开鼠标模块会被放置到这里`;
      this.setState(
        {
          nextPlaceholder: placeholder,
        },
        () => {
          if (this.root) {
            this.root.appendChild(placeholder);
          }
          (window as any).resizeIframe();
        },
      );
    }
    e.preventDefault();
  };

  dragLeave = () => {
    this.clearNextPlaceholder();
  };

  /**
   * 清除dragover时生成的占位元素
   */
  clearNextPlaceholder = () => {
    const { nextPlaceholder } = this.state;
    if (nextPlaceholder) {
      nextPlaceholder.remove();
    }
    (window as any).resizeIframe();
    this.setState({
      nextPlaceholder: undefined,
    });
  };

  drop = async (e: React.DragEvent) => {
    const { pageId } = this.context.BASE_DATA;
    const moduleTypeId =
      e.dataTransfer &&
      Number.parseInt(e.dataTransfer.getData('moduleTypeId'), 10);
    const { addModuleRequest } = this.props;
    addModuleRequest({
      moduleTypeId,
      pageId,
    });
    this.clearNextPlaceholder();
  };

  renderPlaceholder = () => {
    return (
      <div className="d-empty-placeholder">
        <img src="//gw.alicdn.com/tfs/TB1Sm8ARXXXXXciaXXXXXXXXXXX-254-212.png_290x10000.jpg" />
        <p>您还未添加任何模块</p>
        <p>请将左侧模块拖动到这里</p>
      </div>
    );
  };

  render() {
    const moduleList: IModuleData[] = this.props.moduleList;
    const isDecorate = this.context.BASE_DATA.pageType === 0;
    const { isLoading } = this.state;
    function getModuleList(moduleList: IModuleData[]) {
      if (!moduleList) {
        return null;
      }

      return moduleList.map((v, i) => {
        const { moduleTypeId } = v;
        switch (moduleTypeId) {
          case 1:
            return <UserDefine key={v.moduleId} moduleData={v} />;
          case 2:
            return <ImageHotspot key={v.moduleId} moduleData={v} />;
          case 3:
            return <Text key={v.moduleId} moduleData={v} />;
          case 4:
            return <Carousel key={v.moduleId} moduleData={v} />;
          case 5:
            return <Layer key={v.moduleId} moduleData={v} />;
          case 6:
            return <Fixed key={v.moduleId} moduleData={v} />;
          case 7: // 商品
            return <Goods key={v.moduleId} moduleData={v} />;
          default:
            return null;
        }
      });
    }
    return (
      <div
        className="d-module-list"
        onDragOver={this.dragOver}
        onDragLeave={this.dragLeave}
        onDrop={(e: React.DragEvent) => {
          this.drop(e);
        }}
        ref={(root: HTMLDivElement) => {
          this.root = root;
        }}
      >
        {this.context.BASE_DATA.pageType === 0 && (
          <div
            className="d-header"
            onDragOver={(e: React.DragEvent) => {
              e.stopPropagation();
            }}
            onDragLeave={(e: React.DragEvent) => {
              e.stopPropagation();
            }}
            onDrag={(e: React.DragEvent) => {
              e.stopPropagation();
            }}
          />
        )}
        {isLoading && (
          <div className="d-loading">
            {/* <ReactLoading type="spinningBubbles" color={'#1890ff'} /> */}
          </div>
        )}
        {isDecorate &&
          (!moduleList || moduleList.length === 0) &&
          this.renderPlaceholder()}
        {getModuleList(moduleList)}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return { moduleList: state.moduleList };
};

export default connect(
  mapStateToProps,
  {
    fetchModuleList,
    focusModule,
    addModuleRequest,
  },
)(Canvas);
