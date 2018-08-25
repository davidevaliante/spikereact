import React from 'react'
import {Item, Label, Segment} from 'semantic-ui-react'

export const Responsability = (props) => {
    return (
        <div style={{marginTop: '2rem'}} className='align-center'>
            <Segment size='large'>
                <Item>
                    <Item.Image floated='left' size='small' src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo1-1.png?alt=media&token=6e7f46b7-daf1-41d6-a5a8-edd4c6b3010a'/>
                    <Item.Image floated='right' size='small' src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Finfo-2-3.png?alt=media&token=90dd6083-df32-4ec1-bd84-e4ef418e09c0'/>
                    <Item.Content>
                        {/*<Item.Header as='a'>Header</Item.Header>*/}
                        <Item.Description text>
                            <p>Il gioco è vietato ai minori e può causare dipendenza patologica.</p>
                            <p>Verifica la probabilità di vincita su <a href="https://www.agenziadoganemonopoli.gov.it/portale/">www.aams.gov.it</a> Gioca responsabilmente</p>
                        </Item.Description>
                    </Item.Content>

                </Item>
            </Segment>
        </div>
    )
}

export default Responsability