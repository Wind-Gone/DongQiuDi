import React from 'react'
import {Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons'

const {Item} = Breadcrumb;

function Bread() {
    return (
        <div>
            <Breadcrumb style={{fontSize:20, paddingLeft:10,marginLeft:'10%',marginTop:'20px',marginBottom:'20px'}}>
                <Item href='#/game'>
                    <HomeOutlined style={{fontSize:20}} /> 赛事首页
                </Item>
                <Item>
                    赛季列表
                </Item>
            </Breadcrumb>
        </div>
    )
}

export default Bread
