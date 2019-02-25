import React, { Component, PureComponent } from 'react';
import _ from 'lodash';

import isServer from '../../common/script/isServer';
const IsServer = isServer();

interface LazyImageProps {
  src: string;
}

let body: HTMLElement, screenHeight: number;
if (!IsServer) {
  body = document.body;
  screenHeight = window.innerHeight;
}

export default class LazyImage extends PureComponent<LazyImageProps, any> {
  static bindedFlag: boolean = false;

  static handle: any = _.debounce(() => {
    const screenTop = body.scrollTop;
    (Array.from(
      document.querySelectorAll('img.lazy-img'),
    ) as HTMLImageElement[])
      .filter(img => {
        const top = offsetTop(img); // 目前图片相对文档顶端的距离
        return (
          top > screenTop - screenHeight * 0.5 &&
          top < screenTop + screenHeight * 1.5
        ); // 前后各预加载半屏
      })
      .map(img => {
        const image = new Image();
        image.src = img.src.replace(`?x-oss-process=image/quality,q_1`, '');
        image.onload = () => {
          img.src = image.src;
          img.classList.remove('lazy-img');
          img.classList.add('loaded-img');
        };
      });

    function offsetTop(el: HTMLElement) {
      let result = 0;
      while (el.parentElement !== null) {
        result += el.offsetTop;
        el = el.parentElement;
      }
      return result;
    }
  }, 150);

  constructor(props: LazyImageProps) {
    super(props);
  }

  componentDidMount() {
    if (!LazyImage.bindedFlag) {
      this.bindEvent();
      LazyImage.bindedFlag = true;
    }
  }

  bindEvent = () => {
    body.addEventListener('scroll', LazyImage.handle);
    window.addEventListener('load', LazyImage.handle);
  };

  render() {
    let { src } = this.props;
    let node;
    IsServer
      ? (node = (
          <img
            className="lazy-img"
            src={`${src}?x-oss-process=image/quality,q_1`}
            data-src={src}
          />
        ))
      : (node = <img src={src} />);
    return node;
  }
}
