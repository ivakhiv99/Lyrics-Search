import React, {useContext} from 'react';
import {Context} from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

const Tracks = () => {
    const value = useContext(Context);
    const {track_list, heading} = value;
    if (track_list === undefined || track_list.length === 0) {
        return <Spinner/>
    } else {
        return (
            <>
                <h3>{heading}</h3>
                <div>
                    {track_list.map(item => (
                        <Track key={item.track.track_id} track={item.track}/>
                    ))}
                </div>
            </>
        )
    }
};

export default Tracks;