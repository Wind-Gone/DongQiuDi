import React,{useState} from "react";
import { Menu } from "antd";
import {useHistory} from 'react-router-dom'
import MatchContent from '../MatchContent/MatchContent'

const { Item } = Menu;

function SubHeaderMenu() {
  const history=useHistory();
  const [cardIndex, setCardIndex] = useState(1);
  const [year,setYear] = useState('');
  return (
    <div>
      <Menu  mode="horizontal" defaultSelectedKeys={['a']} style={{width:'80%', margin:'0 auto',display:'flex',justifyContent:'space-between'}}>
        <Item
        key='a'
          onClick={() => {setCardIndex(1);setYear('2021')}}
          style={{ fontSize: 30 }}
        >
          2021赛季
        </Item>
        <Item
        key='b'
          onClick={() =>{setCardIndex(2);setYear('2020')}}
          style={{fontSize: 30 }}
        >
          2020赛季
        </Item>
        <Item
        key='c'
          onClick={() =>{setCardIndex(3);setYear('2019')}}
          style={{fontSize: 30 }}
        >
          2019赛季
        </Item>
        <Item
        key='d'
          onClick={() =>{setCardIndex(4);setYear('2018')}}
          style={{fontSize: 30 }}
        >
          2018赛季
        </Item>
        
      </Menu>

      <MatchContent cardIndex={cardIndex} year={year}  />
    </div>
  );
}

export default SubHeaderMenu;
