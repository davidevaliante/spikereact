import React from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Loader } from 'semantic-ui-react-single/Loader'
// components
import AamsBanner from "../AamsBanner";
// mix
import LazyLoad from 'react-lazyload';

const styles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        height: '100vh',
    }
};

const ProducerHeader = ({ loading, currentProducer}) => {
    return (
        <Visibility
            once={false}
            >
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
                            id='producerHeader'
                            className='fade-in-header'
                            // style={{ backgroundImage: `url(${getImageLinkFromName('producer', 'LottoMatica')})` }}
                            // TODO: sistemare immagine di BG
                            style={{ backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/ProducerImages%2Flottomatica-logo.png?alt=media' }}
                        >
                            <div
                                style={styles.overlay}>
                                <div className='description-alignment' >
                                    <div className='align-center' style={{ marginTop: '15rem' }}>
                                        <h1 className='header-spike-text'>{(currentProducer && currentProducer.name)}</h1>
                                        {/*<h1 className='slideRight'>{currentProducer.name}</h1>*/}
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>}
                </LazyLoad>
            </Segment>
            <AamsBanner />
        </Visibility>
    )
};

export default ProducerHeader