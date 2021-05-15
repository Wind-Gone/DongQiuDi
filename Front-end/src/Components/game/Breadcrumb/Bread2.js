import React from 'react'
import {Breadcrumb} from 'antd';
import {HomeOutlined,LeftCircleOutlined} from '@ant-design/icons'
import {useParams} from 'react-router-dom'

const {Item} = Breadcrumb;

function Bread2() {
    const {year,season} =useParams();

    return (
        <div>
            <Breadcrumb style={{fontSize:20, paddingLeft:10,marginLeft:'10%',marginTop:'20px',marginBottom:'20px'}}>
                <Item href='#/game'>
                    <HomeOutlined style={{fontSize:20}} /> 赛事首页
                </Item>
                <Item href='#/game/matchList'>
                   <LeftCircleOutlined style={{fontSize:20}} /> 数据列表
                </Item>
                <Item>
                    {year+'年'+'---'+season+'赛季'}
                </Item>
            </Breadcrumb>
        </div>
    )
}

export default Bread2
