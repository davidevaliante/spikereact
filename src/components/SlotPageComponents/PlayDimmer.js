import React from 'react'
import { connect } from 'react-redux'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { setUserNotPlaying } from '../../reducers/PlayModeReducer'

const PlayDimmer = (props) => {

    // src da cambiare in {props.url}

    return (
        <div>
            <Dimmer
                page
                active={props.isPlaying}
                onClickOutside={() => props.dispatch(setUserNotPlaying())} >
                <iframe
                    title='test'
                    width='900'
                    height='500'
                    src={props.url}
                ></iframe>
            </Dimmer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(PlayDimmer)