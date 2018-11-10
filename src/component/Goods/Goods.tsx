import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IModuleData, IGoodsInfo, IContext, IState, ITemplateList, Itemplate } from '../interface';
import Module from '../Module';
import Axios from '../../../node_modules/axios';
import INTERFACE from '../../common/script/INTERFACE';
import addStyle from '../../common/script/addStyle';
import isServer from '../../common/script/isServer';
import { connect } from 'react-redux';
import { updateTemplate } from '../../actions';

if (!isServer()) {
    (window as any).React = React;
    (window as any).template = {};
}

interface IGoodsProps {
    moduleData: IModuleData;
    template: Itemplate;
    updateTemplate: any;
}

interface IGoodsState {
    skuids: string;
    goodsList: IGoodsInfo[];
}

class Goods extends Component<IGoodsProps, IGoodsState> {

    static contextTypes = {
        BASE_DATA: PropTypes.object,
    };

    constructor(props: IGoodsProps) {
        super(props);
        const { moduleData } = this.props;
        let { data: { skuids, goodsList } } = moduleData;
        goodsList = goodsList || [];
        this.state = {
            skuids,
            goodsList,
        };
        if (skuids) {
            this.requestGoodsInfo(skuids);
        }
    }

    renderFunction = () => { return null; };

    async requestGoodsInfo(skuids: string) {
        const result = (await Axios(INTERFACE.getGoodsInfo, {
            params: {
                skuids,
            },
        })).data;

        if (result.success === true) {
            this.setState({
                goodsList: result.data,
            });
        }
    }

    async fetchTemplate(templateId: number) {
        const result = (await Axios(INTERFACE.getTemplateInfo, {
            params: {
                id: templateId,
            },
        })).data;
        if (result.success) {
            const { updateTemplate } = this.props;
            console.log(result.data);
            updateTemplate(result.data);
        }
    }

    componentDidMount() {
        const {
            moduleData: {
                data: {
                    templateId,
                },
            },
        } = this.props;

        this.fetchTemplate(templateId);
    }

    componentWillReceiveProps(nextProps: IGoodsProps) {
        const { skuids, templateId } = nextProps.moduleData.data;
        if (skuids !== this.state.skuids) {
            this.setState({
                skuids,
            }, () => {
                this.requestGoodsInfo(skuids);
            });
        }

        const {
            moduleData: {
                data: {
                    templateId: currentTemplateId,
                },
            },
        } = this.props;

        if (currentTemplateId !== templateId) {
            this.fetchTemplate(templateId);
        }
    }

    renderGoodsList(goodsList: IGoodsInfo[]) {
        return goodsList.map((v, i) => {
            return (
                <div key={v.id}>
                    <img src={v.img} />
                    <p key={v.id}>{v.name}</p>
                    <p>{v.price}</p>
                </div>
            );
        });
    }

    componentDidUpdate(prevProps: IGoodsProps, prevState: IGoodsState) {
        if (!this.props.template) {
            return;
        }
        const { style, id } = this.props.template;
        if (!prevProps.template || prevProps.template.style !== style) {
            addStyle(style, this.context.BASE_DATA.pageType, `templateStyle_${id}`);
        }
    }

    componentDidCatch(err: any) {
        console.log(err);
    }

    render() {
        const { moduleData } = this.props;
        const { template } = this.props;

        return (
            <Module moduleData={moduleData}>
                {template && template.templateFn && typeof template.templateFn === 'function' ? template.templateFn.call(this) : null}
            </Module>
        );
    }
}

const mapStateToProps = (state: IState, props: any) => {

    const {
        moduleData: {
            data: {
                templateId,
            },
        },
    } = props;

    const template = state.templateList[templateId];

    return Object.assign({}, props, {
        template: template ? template : null,
    });
};

export default connect(mapStateToProps, {
    updateTemplate,
})(Goods);