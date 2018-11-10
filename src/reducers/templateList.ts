import { ITemplateList } from './../component/interface';
import {
    UPDATE_TEMPLATE,
} from '../actions';

export default (templateList: ITemplateList[] = [], action: any) => {
    switch (action.type) {
        case UPDATE_TEMPLATE:
            {
                let { id, templateBabeled } = action.templateInfo;
                new Function(templateBabeled)();
                const newList = Object.assign({}, templateList, {
                    [id]: {
                        ...action.templateInfo,
                        templateFn: (window as any).template[id],
                    },
                });
                return newList;
            }
        default:
            return templateList;
    }
};