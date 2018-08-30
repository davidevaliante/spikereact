import React from 'react'
import { Header as SemanticHeader, Grid, Icon, Divider } from 'semantic-ui-react'
import _ from 'lodash'

const TecnicalsList = (props) => {

    const splittedArray = _.split(props.tecList, '$')

    const tecnicalList = () =>
        <ul>
            {_.slice(splittedArray, 1, splittedArray.length).map(
                t =>
                    <div className='tip-tec-card'>
                        <div className='tip-tec-row'>
                            <div className='column-align-start-center'>
                                <Icon
                                    className='column-align-start-center'
                                    size='small'
                                    style={{ marginRight: '2rem' }}
                                    circular inverted color='red' name='angle right' />
                            </div>
                            <p style={{ fontFamily: 'Raleway' }}>{t}</p>
                        </div>
                        <Divider />
                    </div>
            )
            }
        </ul>

    return (
        <Grid.Column style={{ paddingTop: '5em', paddingBottom: '0rem', paddingRight: '4rem' }}>
            <SemanticHeader as='h3' style={{ fontSize: '2em', fontFamily: 'Raleway', marginBottom: '4rem' }}>
                Scheda tecnica
            </SemanticHeader>
            {tecnicalList()}
        </Grid.Column>
    )
}

export default TecnicalsList;