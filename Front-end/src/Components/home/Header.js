import React from 'react';
import './Header.css';
import 'antd/dist/antd.css';
import {Menu,Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
const {Search} = Input;
const {SubMenu, ItemGroup, Item} =Menu;


function Header() {
    const onSearch= (e) => {
        const {value}=e.target;
        let str = 'https://cn.bing.com/search?q=' + value;
        window.open(str);
      }


    return (
        <>
        
        <div className='home-header'>
            <a id='logo'>
                <span>懂球帝</span>
            </a>
            
            
            
            <div id='nav'>
                
                <Menu mode="horizontal">
                   
                    <Item>
                        <Input  placeholder="Search" onPressEnter={onSearch}   style={{borderRadius:20}} />
                    </Item>
                    <SubMenu title="构建">
                        <Menu.ItemGroup title="frontend">
                            <Menu.Item>
                                react
                            </Menu.Item>
                            <Item>
                                antd
                            </Item>
                       </Menu.ItemGroup>
                       <ItemGroup title="backend">
                           <Item>
                               sprintboot
                           </Item>
                           <Item>
                               mybatis
                           </Item>
                           <Item>
                               MySQL
                           </Item>
                       </ItemGroup>
                    </SubMenu>

                    <SubMenu title='预测技术'>
                        <Item>
                            knn
                        </Item>
                        <Item>
                            神经网络
                        </Item>
                        <Item>
                            luojihuigui
                        </Item>
                    </SubMenu>

                    <SubMenu title='核心成员'>
                        <Item>
                            蔡正海
                        </Item>
                        <Item>
                            胡梓蕊
                        </Item>
                        <Item>
                            萧筱
                        </Item>
                    </SubMenu>

                    <SubMenu title='官方网站链接'>
                        <Item>

                        </Item>
                        <Item>

                        </Item>

                    </SubMenu>
                    
                </Menu>
            </div>
            
        </div>
        </>
    )
}

export default Header
