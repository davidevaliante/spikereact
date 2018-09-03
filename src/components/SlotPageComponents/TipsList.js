import React from 'react'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider'
import slice from 'lodash/slice'
import split from 'lodash/split'

const TipsList = (props) => {

    const splittedArray = split(props.tipList, '@')



    const tipList = () =>
        <ul>
            {slice(splittedArray, 1, splittedArray.length).map(
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
        <Grid.Column style={!props.noStyle ? { paddingTop: '5em', paddingBottom: '0rem', paddingLeft: '4rem' } : { width: '100%' }} {...props}>
            <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Raleway', marginBottom: '4rem' }}>
                {props.title ? props.title : 'Consigli di gioco'}
            </Header>
            {tipList()}
        </Grid.Column>
    )
}

export default TipsList;