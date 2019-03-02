import { get, post } from '../utils/request';
import Interface from '../common/script/INTERFACE';
import isServer from '../common/script/isServer';

/**
 * 获取页面初始化数据
 * @param pageType 页面类型 0：装修 1：预览 2：浏览
 */
export const getInitData = async (pageType: number, pageId?: number) => {
  if (!pageId && !isServer()) {
    pageId = (window as any).location.href.match(/pageId=([0-9]+)/)[1];
  }
  const { success, data } = get(Interface.getInitData, { pageId });
  if (success === true) {
    console.log(data);
    return data;
  }
};
