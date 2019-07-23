import React, {useState, useContext} from 'react';
import {Context} from '../../context';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from '../../consts';


const Search = () => {
    const [trackTitle, handleInputChange] = useState('');

    const value = useContext(Context);
    const {dispatch} = value;

    const findTrack = async (dispatch, e) => {
        e.preventDefault();
        const req = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`);
        const data = await req.json();
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: data.message.body.track_list
        });
    };

    return (
        <div className='card card-boy mb-4 p-4'>
            <h1 className='display-4 text-center'>
                <i className='fas fa-music'></i>
                 Search For A Song
            </h1>
            <p className='lead text-center'>Get the lyrics for your favorite songs</p>
            <form onSubmit={(e) => findTrack(dispatch, e)} className='form-group'>
                <input type='text'
                       placeholder='Song title...'
                       value={trackTitle}
                       onChange={e => handleInputChange(e.target.value)}
                       className='form-control form-control-lg mb-2'
                />
                <button type='submit' className='btn btn-primary btn-lg btn-block mb-3'>Search</button>
            </form>
        </div>
    );

};

export default Search;