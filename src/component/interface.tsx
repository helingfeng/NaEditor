import { ImageHotspotConfData } from './ImageHotspotConfig/interface';
import { CarouselConfData } from './CarouselConfig/interface';

export interface ImageInfo {
    url: string;
    name?: string;
}

// tempData定义
export interface ITempData {
    isActive: boolean;
    top: number;
    height: number;
}

// moduleData接口定义
export interface IModuleData {
    modueleTypeId: number;
    moduleName: number;
    pageId: number;
    moduleId: number;
    data: any;
    configData: ImageHotspotConfData | CarouselConfData | undefined;
    tempData: ITempData;
}

// moduleConfig接口定义
export interface IModuleConfig {
    isVisible: boolean;
    moduleData: IModuleData;
}

// state中module定义
export interface IModule {
    moduleList: IModuleData[];
}

// state定义
export interface IState {
    module: IModule;
    moduleConfig: IModuleConfig;
}