import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive'
import { connect } from 'react-redux'
import Header from '../Header'


class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })



    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive
                minWidth={Responsive.onlyTablet.minWidth}>
                <Header displaying='HOME' />

                {children}

            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    lista: state.slotList
})

export default connect(mapStateToProps)(DesktopContainer)