var isServer = typeof window === 'undefined';

var protocol;
if (isServer) {
    protocol = 'http://';
} else {
    protocol = '//';
}


var host;
// host = '47.107.69.189'; //远程
host = '127.0.0.1'; //本地

// dev
module.exports = {
    host,
    serverAddress: true ? '' : protocol + 'h5editor.cn',
    staticAddress: protocol + 'static.h5editor.cn',
    viewAddress: protocol + 'view.h5editor.cn',
};