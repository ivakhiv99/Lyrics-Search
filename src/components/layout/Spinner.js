import React from 'react';
import spinner from '../../img/spiner.gif';

const Spinner = () => {
    return (
        <div>
            <img
                src={spinner}
                alt='Loading...'
                style={{width: '200px', margin: '0 auto', display: 'block'}}
            />
        </div>
    );
};

export default Spinner;