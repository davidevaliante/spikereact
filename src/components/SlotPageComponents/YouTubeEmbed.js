import React from 'react'
// semantic
import { Header } from 'semantic-ui-react-single/Header'
import { Embed } from 'semantic-ui-react-single/Embed'
// mix
import split from 'lodash/split'
// static
import '../../static/slot-icon.svg'

const YouTubeEmbed = (props) => {

    const handleClick = () => {
        window.open('https://www.youtube.com/user/SpikeTuscani')
    }

    return (
        <div className='column-centered' style={{ marginBottom: '4rem' }} >
            <Header color='red' style={{ fontSize: '2rem', marginBottom: '2rem', cursor: 'pointer', fontFamily: 'Raleway' }} onClick={() => handleClick()}>Rimani sempre aggiornato, iscriviti al mio canale YouTube</Header>
            <iframe
                title='ytcontent'
                width={props.width}
                height={props.height}
                src={props.src}>
            </iframe>
        </div>
    )
}

export default YouTubeEmbed;