import React from 'react'
import { Header } from 'semantic-ui-react-single/Header'
import split from 'lodash/split'
import { Embed } from 'semantic-ui-react-single/Embed'
import '../../static/slot-icon.svg'

const YouTubeEmbed = (props) => {

    const handleClick = () => {
        window.open('https://www.youtube.com/user/SpikeTuscani')
    }


    // https://www.youtube.com/embed/ + id del video



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