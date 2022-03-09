import React from 'react';
import { Tooltip } from 'antd';

export default (props) => {
  return <Tooltip title={props.title} style={{cursor: 'pointer'}}>
    {props.children}
  </Tooltip>;
}
