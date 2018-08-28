import React, { Component } from 'react'
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import _ from 'lodash'
import Radium from 'radium'

class Test extends Component {


    state = {}

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { contextRef } = this.state

        const cardShadow = {
            boxShadow: '10px 10px 33px -8px rgba(122, 122, 122, 0.75)',
            margin: '1rem 1rem 1rem 1rem',
            transition: "all ease .5s",
            ":hover": {
                boxShadow: '10px 10px 33px -8px rgba(243, 109, 109, 0.75)'
            }
        }

        return (
            <div>
            <h2 className="tracking-in-contract-bck">Le Slot del giorno</h2>

            </div>
        )
    }
}

export default Radium(Test)
