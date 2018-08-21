import React from 'react'

import DesktopContainer from './DesktopContainer';
import PropTypes from 'prop-types'

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export default ResponsiveContainer