import React,{useState} from "react";
import { Menu } from "antd";
import {useHistory,useParams} from 'react-router-dom'
import MatchContent from '../MatchContent/MatchContent'

const { Item } = Menu;

function SubHeaderMenu2(props) {
  const {select}=props;
  const history=useHistory();
  const {year,season}=useParams();
  const url1='/game/matchAnalysis/'+year+'/'+season;
  const url2='/game/playerAnalysis/'+year+'/'+season;
  return (
    <div>
      <Menu  mode="horizontal" defaultSelectedKeys={[select]} style={{width:'80%', margin:'0 auto',display:'flex',justifyContent:'space-between'}}>
        <Item
          key='a'
          onClick={()=>history.push(url1)}
          style={{ fontSize: 30 }}
        >
          战队数据
        </Item>
        <Item
        key='b'
        onClick={()=>history.push(url2)}
          style={{fontSize: 30 }}
        >
          个人数据
        </Item>
        
      </Menu>
    </div>
  );
}

export default SubHeaderMenu2;
