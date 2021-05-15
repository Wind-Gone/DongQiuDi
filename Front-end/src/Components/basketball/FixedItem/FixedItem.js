import React from 'react'
import {Button,Tooltip} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import './index.css'
import {useHistory} from 'react-router-dom'

function FixedItem() {
    const history =useHistory();

    const handleClick = () => {
        history.push('/basketball')
    }

    return (
        <div className="fixed-item">
            <Tooltip title='返回首页'>
            <Button onClick={handleClick} size='large' type='primary' shape='circle' icon={<HomeOutlined />} />
            </Tooltip>              
        </div>
    )
}

export default FixedItem
