import React from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
// components
import LazyLoad from 'react-lazyload'
import AamsBanner from "../AamsBanner"

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
}

const HomePageHeader = ({ displaying }) => {
    return (
        <div>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header
                        className='fade-in-header'>
                        <div style={styles.overlay}>
                            <div className='hero-text-box'>
                                <h1 className='header-spike-text' style={{ fontSize: '600%' }}>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
            <AamsBanner />
        </div>
    )
}

export default HomePageHeader