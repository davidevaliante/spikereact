import React from 'react'
import { Header as SemanticHeader, Grid, Icon, Divider } from 'semantic-ui-react'
import _ from 'lodash'

const TipsList = (props) => {

    const splittedArray = _.split(props.tipList, '@')

    const tipList = () =>
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
                            {t}
                        </div>
                        <Divider />
                    </div>
            )
            }
        </ul>

    return (
        <Grid.Column style={{ paddingTop: '5em', paddingBottom: '0rem', paddingLeft:'4rem' }}>
            <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                Consigli di gioco
            </SemanticHeader>
            {tipList()}
        </Grid.Column>
    )
}

export default TipsList;