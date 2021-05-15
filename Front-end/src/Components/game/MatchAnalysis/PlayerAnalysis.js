import React from 'react'
import Head from '../Head/Head';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Bread2 from '../Breadcrumb/Bread2';
import PlayerColumn from '../GameColumn/PlayerColumn'
import SubHeaderMenu from '../HeaderMenu/SubMenu2'
import Footer from '../../footer/Footer'

function PlayerAnalysis() {
    return (
        <div>
            <Head />
            <HeaderMenu />
            <Bread2 />
            <SubHeaderMenu select='b' />
            <PlayerColumn />
            <Footer />
        </div>
    )
}

export default PlayerAnalysis
