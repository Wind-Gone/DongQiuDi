import React from 'react';
import Head from '../Head/Head';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import Bread from '../Breadcrumb/Bread'
import SubHeaderMenu from '../HeaderMenu/SubMenu';
import MatchContent from '../MatchContent/MatchContent'
import Footer from '../../footer/Footer'

function MatchList() {
    return (
        <div>
            <Head />
            <HeaderMenu />
            <Bread />
            <SubHeaderMenu />
            <Footer />
        </div>
    )
}

export default MatchList
