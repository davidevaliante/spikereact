// react
import React from 'react'
import PropTypes from 'prop-types';

// components
import { Grid } from 'semantic-ui-react-single/Grid'
import { Sticky } from 'semantic-ui-react-single/Sticky'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import SlotList from './SlotList'
import BonusList from './BonusList'

// misc
import { SLOT_TYPES } from '../../../enums/Constants'



const dropdownOptions = [
    { key: 1, text: 'Rating', value: 'rating' },
    { key: 2, text: 'Data', value: 'time' },
    { key: 3, text: 'Nome', value: 'name' }
]

const HomeBody = ({ orderHandler, slotorder, handleContextRef, type, isSticky }) => (
    <Grid style={{ marginTop: '0rem' }} celled='internally' stackable className='row-centered-spaced'>
        <Grid.Row style={{ paddingBottom: '4rem' }}>
            <Grid.Column width={12} style={{ paddingLeft: '0' }}>
                <Dropdown
                    style={{ marginBottom: '2rem' }}
                    onChange={orderHandler}
                    options={dropdownOptions}
                    placeholder='Ordina per'
                    selection
                    value={slotorder}
                />
                <div ref={handleContextRef}>
                    <SlotList cardPerRow={3} maxSlot={12} type={type} order={slotorder} />
                </div>
            </Grid.Column>

            <Grid.Column
                style={{ paddingTop: '0' }}
                width={4}>
                <Sticky context={isSticky} offset={80}>
                    <BonusList maxNumber={15} />
                </Sticky>
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

HomeBody.propTypes = {
    orderHandler: PropTypes.func,   // cosa fare quando viene selezionato qualcosa dal menu
    slotorder: PropTypes.oneOf(['rating', 'time', 'name']),
    updateSticky: PropTypes.func,    // update del ref per lo sticky
    type: PropTypes.oneOf([SLOT_TYPES.BAR, SLOT_TYPES.GRATIS]),
    isSticky: PropTypes.bool
}

export default HomeBody