import React, { Component } from "react";
import aojiao from "./aojiao.png";
import wuhu from "./wuhu.jpeg";
import "./Head.css";
import { Input, Space } from "antd";
import {SearchOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
const { Search } = Input;

const onSearch= (e) => {
  const {value} = e.target;
  let str = 'https://cn.bing.com/search?q=' + value + ' LPL';
  window.open(str);
}

class Head extends Component {
  render() {
    return (
      <div className="header">
        <img src={wuhu} />
        <h1>LPL 赛事分析</h1>
        <img src={aojiao} />
        <div className='search-bar'>
        <Input
          allowClear
          prefix={<SearchOutlined />}
          style={{borderRadius:20}}
          placeholder="Search"
          onPressEnter={onSearch}
        />
        </div>
        <div className='clear'></div>
      </div>
    );
  }
}

export default Head;
