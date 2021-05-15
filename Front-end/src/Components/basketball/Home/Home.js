import React from "react";
import HomeContent from "./HomeContent";
import HomeCarousel from "./HomeCarousel";
import PlayoffTimeline  from '../Timeline/PlayoffTimeline'
import {Affix,Button} from 'antd'
import './Home.css'
import Head from "../Head/Head";
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import FixedItem from '../FixedItem/FixedItem'



function Home(props) {
  return (
    <>
    <Head />
    <HeaderMenu />
    <div className='home'>
      <HomeCarousel />
      <HomeContent />
      <PlayoffTimeline />   
    </div>
    <FixedItem />
    </>
  );
}

export default Home;
