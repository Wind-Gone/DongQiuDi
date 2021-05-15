import React from 'react'
import {Button} from 'antd'
import {SmileTwoTone,GithubOutlined,CheckOutlined} from '@ant-design/icons'
import './Hero.css'
import img from './logo.png'

function Hero() {
    return (
        <div>
            <div id='hero'>
                <div className='inner'>
                    <div className='left'>
                        <img className='logo' src={img} alt='logo' />
                    </div>
                    <div className='right'>
                        <h1>懂球帝<br/>Sports / Esports 平台</h1>
                        <p>
                            <Button icon={<SmileTwoTone />} size='large' style={{backgroundColor:'#fae3d9',borderRadius:20,marginRight:20}}>Why choose us</Button>
                            <Button icon={<CheckOutlined />} size='large' style={{borderRadius:20,marginRight:20}}>Join us</Button>
                            <Button icon={<GithubOutlined />} size='large' style={{backgroundColor:'#f6f6f6', borderRadius:20}}>GITHUB</Button>
                        </p>
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default Hero
