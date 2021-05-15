import React from 'react';
import Head from '../Head/Head';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import './index.css'
import logo from './logo.png'
import Footer from '../../footer/Footer'
import WordCloudLPL from '../WordCloud/WordCloud';
import HomeContent from './HomeContent'

function Home() {
    return (
        <div>
            <Head />
            <HeaderMenu />
            <div style={{marginTop:4}}>
                <HomeContent />
                <WordCloudLPL />
            </div>
            <Footer />
        </div>
    )
}

export default Home
