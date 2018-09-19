import React from 'react'
// semantic
import { Image } from 'semantic-ui-react-single/Image'
import { Responsive } from 'semantic-ui-react-single/Responsive';
import { Container } from 'semantic-ui-react-single/Container';


export const AamsBanner = (props) => {

    return (
        <div>
            <Responsive as={Container} minWidth={1200} >
                <div style={{ marginTop: '2rem', marginBottom: '1.6rem' }} className='ams-box' >
                    <div className='row-centered-spaced'>
                        <Image size='small' src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo1-1.png?alt=media&token=6e7f46b7-daf1-41d6-a5a8-edd4c6b3010a' />

                        <div className='column-centered'>
                            <p className='ams-center-text'>Il gioco è vietato ai minori e può causare dipendenza patologica.</p>
                            <p className='ams-center-text' >Verifica la probabilità di vincita su <a style={{ marginLeft: '0.3rem' }} href="https://www.agenziadoganemonopoli.gov.it/portale/"> www.aams.gov.it</a></p>
                            <p className='ams-center-text'>Gioca responsabilmente</p>
                        </div>
                        <Image size='small' src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo-2-3.png?alt=media&token=90dd6083-df32-4ec1-bd84-e4ef418e09c0' />
                    </div>
                </div>

            </Responsive>
            <Responsive as={Container} maxWidth={1200} textAlign="center">

                <Image src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo1-1.png?alt=media&token=6e7f46b7-daf1-41d6-a5a8-edd4c6b3010a' size='small' verticalAlign='middle' />
                <p >Il gioco è vietato ai minori e può causare dipendenza patologica.</p>
                <p  >Verifica la probabilità di vincita su <a href="https://www.agenziadoganemonopoli.gov.it/portale/"> www.aams.gov.it</a></p>
                <p >Gioca responsabilmente</p>
                <Image src="https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo-2-3.png?alt=media&token=90dd6083-df32-4ec1-bd84-e4ef418e09c0" size='small' verticalAlign='middle' />

            </Responsive>

        </div>
    )
}

export default AamsBanner