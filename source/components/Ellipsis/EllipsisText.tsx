import * as React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '../Tooltip';

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str = '', maxLength: number) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

export interface EllipsisTextProps {
  prefix: string;
  text: React.ReactNode | string;
  length: number;
  tooltip: boolean;
  className: string;
  fullWidthRecognition: boolean;
  tooltipProps: TooltipProps;
}
const getCustomClsNames=function(className){
  let clsarr=className?.split(" ");
  if(clsarr&&clsarr.length){
    //原来这里一直没有赋值任何className，所以过滤掉fishd-ellipsis默认样式，只赋值用户增加的自定义样式，避免引起意外的BUG。
    clsarr=clsarr.filter(item=>item.indexOf("fishd-ellipsis")==-1);
  }
  return (clsarr||[]).join(" ")
}
const EllipsisText: React.SFC<EllipsisTextProps> = ({
  prefix,
  text,
  length,
  tooltip,
  className,
  fullWidthRecognition,
  tooltipProps,
  ...other
}) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) {
    return <span {...other} className={getCustomClsNames(className)}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  if (tooltip) {
    return (
      <Tooltip {...tooltipProps} overlayClassName={`${prefix}-tooltip`} title={text}>
        <span className={getCustomClsNames(className)}>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span className={className} {...other}>
      {displayText}
      {tail}
    </span>
  );
};

EllipsisText.propTypes = {
  prefix: PropTypes.string,
  text: PropTypes.string,
  length: PropTypes.number,
  tooltip: PropTypes.bool,
  fullWidthRecognition: PropTypes.bool,
  tooltipProps: PropTypes.object
};

export default EllipsisText;
