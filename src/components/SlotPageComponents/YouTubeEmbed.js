import React from 'react'
import { Header } from 'semantic-ui-react-single/Header'


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
                src='https://www.youtube.com/embed/EiazMhG7ZM8'

            ></iframe>
        </div>
    )
}

export default YouTubeEmbed;