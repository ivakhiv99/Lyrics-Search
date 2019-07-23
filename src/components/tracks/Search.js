import React, {useState, useContext} from 'react';
import {Context} from '../../context';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from '../../consts';


const Search = () => {
    const [trackTitle, handleInputChange] = useState('');

    const findTrack = async (dispatch, e) => {
        e.preventDefault();
        const req = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`);
        const data = await req.json();
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: data.message.body.track_list
        });
    };

    const value = useContext(Context);
    const {dispatch} = value;

    return (
        <div>
            <h1>Search For A Song</h1>
            <form onSubmit={(e) => findTrack(dispatch, e)}>
                <input type='text'
                       placeholder='Song title...'
                       value={trackTitle}
                       onChange={e => handleInputChange(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    );

};

export default Search;