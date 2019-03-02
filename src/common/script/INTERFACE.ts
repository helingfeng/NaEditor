const { serverAddress, viewAddress } = require('../../../config');

const SLD = {
  backend: serverAddress,
  view: viewAddress,
};

const prefix = '/api';

const INTERFACE = {
  uploadImage: `${SLD.backend}${prefix}/uploadImage`,
  getImageList: `${SLD.backend}${prefix}/getImageList`,
  getAllModule: `${SLD.backend}${prefix}/getAllModule`,
  getModuleList: `${SLD.backend}${prefix}/getModuleList`,
  addModule: `${SLD.backend}${prefix}/addModule`,
  removeModule: `${SLD.backend}${prefix}/removeModule`,
  positionModule: `${SLD.backend}${prefix}/positionModule`,
  updateModule: `${SLD.backend}${prefix}/updateModule`,
  copyModule: `${SLD.backend}${prefix}/copyModule`, // 复制模块

  getPageList: `${SLD.backend}${prefix}/getPageList`, // 获取页面列表
  addPage: `${SLD.backend}${prefix}/addPage`, // 新建页面
  deletePage: `${SLD.backend}${prefix}/deletePage`, // 删除页面
  copyPage: `${SLD.backend}${prefix}/copyPage`, // 复制页面
  publishPage: `${SLD.backend}${prefix}/publishPage`, // 发布页面
  getInitData: `${SLD.backend}${prefix}/getInitData`, // 获取页面初始化数据

  updateTemplate: `${SLD.backend}${prefix}/updateTemplate`, // 更新模板（没有则新建）
  deleteTemplate: `${SLD.backend}${prefix}/deleteTemplate`, // 删除模板
  copyTemplate: `${SLD.backend}${prefix}/copyTemplate`, // 复制模板
  getTemplateInfo: `${SLD.backend}${prefix}/getTemplateInfo`, // 获取模板信息
  getTemplateList: `${SLD.backend}${prefix}/getTemplateList`, // 获取模板列表

  getGoodsInfo: `${SLD.backend}${prefix}/getGoodsInfo`, // 获取商品信息

  logout: `${SLD.backend}${prefix}/logout`, // 退出登录

  viewAddress: `${SLD.view}/page`,
};
console.log(INTERFACE);
export default INTERFACE;
