import React, { Component } from 'react'
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import _ from 'lodash'

export default class Test extends Component {


    state = {}

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { contextRef } = this.state

        return (
            <div>
                <Grid centered columns={3}>
                    <Grid.Column>
                        <div ref={this.handleContextRef}>
                            <Segment>
                                {_.times(60, i => <h1>Hello</h1>)}

                                <Rail position='left'>
                                    {_.times(15, i => <h1>Hello</h1>)}

                                    <Sticky context={contextRef}>
                                        <Header as='h3'>Stuck Content</Header>
                                        <Image src='../static/slot-header-img.jpg' size='large' />
                                    </Sticky>
                                </Rail>

                                <Rail position='right'>
                                    <Sticky context={contextRef}>
                                        <Header as='h3'>Stuck Content</Header>
                                        <Image src='../static/slot-header-img.jpg' size='large' />
                                    </Sticky>
                                </Rail>
                            </Segment>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
