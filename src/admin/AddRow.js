import React from 'react'
import { Divider, Icon, Dropdown, Input } from 'semantic-ui-react'

const AddRow = (props) => {
    const options = [
        { key: 'text', text: 'Testo', value: 'text' },
        { key: 'pic', text: 'Foto', value: 'pic' },
        { key: 'youtube', text: 'YouTube', value: 'youtube' },
    ]
    return (
        <div className='add-row-container' style={{ marginBottom: '1rem' }}>
            <div className='icon-content-container'>
                <Input
                    label={<Dropdown defaultValue='text' options={options} />}
                    labelPosition='left'
                    placeholder='Inserisci'
                />
            </div>
            <Divider />
        </div>
    );
}

export default AddRow;