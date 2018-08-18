import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import HomepageHeading from './HomepageHeading'
import Navbar from './Navbar'
import { makeNavBarVisible, makeNavBarInvisible } from '../../reducers/NavbarVisibilityReducer'


class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        console.log(this.state)
        const { children } = this.props
        const { fixed } = this.state
        return (
            <Responsive
                minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical>
                        <header>
                            <Navbar fixed={fixed} />
                        </header>
                        {
                            //<HomepageHeading />
                        }
                    </Segment>
                </Visibility>

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
})

export default connect(mapStateToProps)(DesktopContainer)