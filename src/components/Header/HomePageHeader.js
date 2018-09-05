import React from 'react'

// components
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import Navbar from './Navbar'
import LazyLoad from 'react-lazyload'
import AamsBanner from "../AamsBanner"


const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
}

const HomePageHeader = ({ fixmenu, hideFixedMenu, showFixedMenu, displaying }) => {
    return (
        <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header
                        style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fslot-header-img-min-min.jpg?alt=media&token=6648de0a-3cd6-402f-9ada-a961cf893c2a')` }}>
                        <div style={styles.overlay}>
                            <Navbar fixed={fixmenu} displaying={displaying} />
                            <div className='hero-text-box'>
                                <h1 className='header-spike-text' style={{ fontSize: '600%' }}>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
            <AamsBanner />
        </Visibility>
    )
}

export default HomePageHeader