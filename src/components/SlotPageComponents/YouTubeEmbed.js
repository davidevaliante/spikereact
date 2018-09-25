import React from 'react'
// semantic
import {Header} from 'semantic-ui-react-single/Header'
// mix
// static
import '../../static/slot-icon.svg'
import {Responsive} from "semantic-ui-react-single/Responsive";
import {RESPONSIVE_RESOLUTION} from "../../enums/Constants";

const YouTubeEmbed = (props) => {

    const handleClick = () => {
        window.open('https://www.youtube.com/user/SpikeTuscani')
    };

    return (
        <div className='column-centered' style={{ marginBottom: '4rem' }} >
            <Header color='red' style={{ fontSize: '2rem', marginBottom: '2rem', cursor: 'pointer', fontFamily: 'Raleway' }} onClick={() => handleClick()}>Rimani sempre aggiornato, iscriviti al mio canale YouTube</Header>
            <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                <iframe
                    title='ytcontent'
                    width='300'
                    height='150'
                    src={props.src}>
                </iframe>

            </Responsive>
            <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL + 1}
                        maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                <iframe
                    title='ytcontent'
                    width='750'
                    height='325'
                    src={props.src}>
                </iframe>
            </Responsive>
            <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} >
                <iframe
                    title='ytcontent'
                    width='900'
                    height='450'
                    src={props.src}>
                </iframe>
            </Responsive>
        </div>
    )
};

export default YouTubeEmbed;