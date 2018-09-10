import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react-single/Container'
import { Segment } from 'semantic-ui-react-single/Segment'
import { Image } from 'semantic-ui-react-single/Image'



const NotFound = () => {
    return (

        <Container textAlign="center">
            <Segment>

                <Image src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Ferror404.jpg?alt=media&token=66ab4c3d-3e21-4c22-8137-e0c92d3c8ec0' fluid />
            </Segment>


            <Segment>
                <center><Link to="/">Return to Home Page</Link></center>
            </Segment>
        </Container>

    )
}


export default NotFound;




