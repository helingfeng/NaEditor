import { PageType } from './../../component/interface';
/**
 * 动态加入style样式
 */
export default (style: string, pageType: PageType, id?: string) => {
    const node = document.createElement('style');
    node.type = 'text/css';
    node.innerHTML = style;
    id && (node.id = id);
    // 装修页，样式放到iframe里面去
    if (pageType === PageType.Decorate) {
        const iframeDom = (document.querySelector('.J_canvas') as HTMLIFrameElement).contentDocument;
        let oldStyle = (iframeDom as Document).querySelector(`#${id}`);
        if (oldStyle !== null) {
            oldStyle = node;
        } else {
            iframeDom && iframeDom.head && iframeDom.head.appendChild(node);
        }
    } else {
        let oldStyle = (document as Document).querySelector(`#${id}`);
        if (oldStyle !== null) {
            oldStyle = node;
        } else {
            document && document.head && document.head.appendChild(node);
        }
    }
};