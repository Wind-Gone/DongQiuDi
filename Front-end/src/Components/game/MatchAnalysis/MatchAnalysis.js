import React from 'react'
import Head from '../Head/Head';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Bread2 from '../Breadcrumb/Bread2';
import GameColumn from '../GameColumn/GameColumn'
import SubHeaderMenu from '../HeaderMenu/SubMenu2'
import Footer from '../../footer/Footer'


function MatchAnalysis() {
    return (
        <div>
            <Head />
            <HeaderMenu />
            <Bread2 />
            <SubHeaderMenu select='a' />
            <GameColumn />
            <Footer />
        </div>
    )
}

export default MatchAnalysis
