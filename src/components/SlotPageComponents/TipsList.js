import React from 'react'
import { Header as SemanticHeader, Grid } from 'semantic-ui-react'
import _ from 'lodash'

const TipsList = (props) => {
    const tipList = () => <ul>{_.split(props.tipList, '@').map(t => <li>{t}</li>)}</ul>

    return (
        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                Consigli di gioco
            </SemanticHeader>
            {tipList()}
        </Grid.Column>
    )
}

export default TipsList;