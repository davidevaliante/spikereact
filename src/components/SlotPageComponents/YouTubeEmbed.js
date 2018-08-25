import React from 'react'
import { Embed, Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const YouTubeEmbed = (props) => {

    const handleClick = () => {
        window.open('https://www.youtube.com/user/SpikeTuscani')
    }

    return (
        <div className='column-centered' style={{ marginBottom: '4rem' }} >
            <Header color='red' style={{marginBottom:'2rem', cursor:'pointer'}} onClick={()=> handleClick()}>Rimani sempre aggiornato, iscriviti al mio canale YouTube</Header>
            <iframe

                title='ytcontent'
                width='900'
                height='450'
                src='https://www.youtube.com/embed/watch?v=EiazMhG7ZM8&t'

            ></iframe>
        </div>
    )
}

export default YouTubeEmbed;