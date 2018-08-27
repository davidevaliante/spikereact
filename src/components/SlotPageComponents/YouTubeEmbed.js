import React from 'react'
import { Embed, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const YouTubeEmbed = (props) => {

    const handleClick = () => {
        window.open('https://www.youtube.com/user/SpikeTuscani')
    }

    // https://www.youtube.com/embed/ + id del video

    return (
        <div className='column-centered' style={{ marginBottom: '4rem' }} >
            <Header color='red' style={{ marginBottom: '2rem', cursor: 'pointer' }} onClick={() => handleClick()}>Rimani sempre aggiornato, iscriviti al mio canale YouTube</Header>
            <iframe

                title='ytcontent'
                width={props.width}
                height={props.height}
                src='https://www.youtube.com/embed/EiazMhG7ZM8'

            ></iframe>
        </div>
    )
}

export default YouTubeEmbed;