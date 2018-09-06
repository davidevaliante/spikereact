import React from 'react'

// components
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Loader } from 'semantic-ui-react-single/Loader'
import Navbar from './Navbar'
import LazyLoad from 'react-lazyload';
import ShortHandMenu from '../SlotPageComponents/ShortHandMenu'
import AamsBanner from "../AamsBanner";
import { getImageLinkFromName } from '../../utils/Utils'

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
}

const SlotPageHeader = ({ currentSlot, showFixedMenu, hideFixedMenu, fixmenu, loading }) => {

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
                    {loading ?
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                        :
                        <header
                            id='slotHeader'
                            className='fade-in-header'
                            style={{ backgroundImage: `url(${getImageLinkFromName('SLOT', currentSlot.name, 'big')})` }}>
                            <div
                                style={styles.overlay}>
                                <Navbar fixed={fixmenu} displaying={'SLOT'} />
                                <div className='description-alignment'>
                                    <div className='align-center'>
                                        <h1 className='header-spike-text'>{currentSlot.name}</h1>
                                        <h1 className='slideRight'>{(currentSlot && currentSlot.producer) && currentSlot.producer.name}</h1>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ShortHandMenu />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>}
                </LazyLoad>
            </Segment>
            <AamsBanner />
        </Visibility >
    )
}

export default SlotPageHeader