import React from 'react';
import Navigation from './Navigation';

const Header = () => {
    return(
        <header>
            <Navigation />
            <div className='hero-text-box'>
                <h1>Vinci soldi veri.<br></br>I migliori consigli per vincere con le slot machine.</h1>
                <a href='#' className='btn btn-full'>Slot</a>
                <a href='#' className='btn btn-ghost'>Bonus</a>
            </div>

        </header>
    );
}

export default Header;
