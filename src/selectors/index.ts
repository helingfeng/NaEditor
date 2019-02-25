import { createSelector } from 'reselect';
import { IState, IModuleData } from '../component/interface';

const getModuleList = (state: IState) => state.moduleList;

// export const getModule = createSelector(
//     [getModuleList],
//     (moduleList: IModuleData[], moduleId: number) => {
//         return moduleList.filter(v => v.moduleId === moduleId)[0];
//     },
// );
