import React from 'react'
import { connect } from 'react-redux'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { setUserNotPlaying } from '../../reducers/PlayModeReducer'
import RandomBonus from './RandomBonus'

const PlayDimmer = (props) => {

    // src da cambiare in {props.url}

    return (
        <div>
            <Dimmer
                page
                active={props.isPlaying}
                onClickOutside={() => props.dispatch(setUserNotPlaying())} >
                <div>
                    <iframe
                        style={{ position: 'absolute', right: '25%', top: '11%' }}
                        title='test'
                        width='900'
                        height='500'
                        src={props.url}
                    ></iframe>
                    <div style={{ position: 'absolute', left: '77%', top: '39%' }}>
                        <RandomBonus bonus={props.bonusList} />
                    </div>
                </div>
            </Dimmer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(PlayDimmer)