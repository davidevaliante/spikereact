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
                    src='https://netent-static.casinomodule.com/games/sparks_mobile_html/game/sparks_mobile_html.xhtml?staticServer=https%3A%2F%2Fnetent-static.casinomodule.com%2F&gameName=sparks.desktop&targetElement=game&flashParams.bgcolor=000000&mobileParams.lobbyURL=https%253A%252F%252Fwww.netent.com%252Fen%252Fsection%252Fentertain%252F&gameId=sparks_not_mobile&server=https%3A%2F%2Fnetent-game.casinomodule.com%2F&lang=it&sessId=DEMO-1946785649284&operatorId=default'

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