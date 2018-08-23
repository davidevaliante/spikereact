import React from 'react'
import { Header as SemanticHeader, Grid } from 'semantic-ui-react'
import _ from 'lodash'

const TecnicalsList = (props) => {

    const tecnicalList = () => <ul>{_.split(props.tecList, '$').map(t => <li>{t}</li>)}</ul>

    return (
        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                Scheda tecnica
            </SemanticHeader>
            {tecnicalList()}
        </Grid.Column>
    )
}

export default TecnicalsList;