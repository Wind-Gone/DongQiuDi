import React, { Component } from "react";
import aojiao from "./aojiao.png";
import wuhu from "./wuhu.jpeg";
import "./Head.css";
import { Input, Space } from "antd";
import 'antd/dist/antd.css';
const { Search } = Input;

const onSearch= (value) => {
  let str = 'https://cn.bing.com/search?q=' + value + ' NBA';
  window.open(str);
}

class Head extends Component {
  render() {
    return (
      <div className="header">
        <img src={wuhu} />
        <h1>季后赛 And 总决赛</h1>
        <img src={aojiao} />
        <div className='search-bar'>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        </div>
        <div className='clear'></div>
      </div>
    );
  }
}

export default Head;
