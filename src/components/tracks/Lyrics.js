import React, {useState, useEffect} from 'react';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from '../../consts';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';


const Lirycs = (props) => {
    const [track, setTrack] = useState({});
    const [lyrics, setLyrics] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const reqLyrics = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.lyrics.get?track_id=${props.match.params.id}&apikey=${API_KEY}`);
            const dataLyrics = await reqLyrics.json();
            const reqTrack = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.get?track_id=${props.match.params.id}&apikey=${API_KEY}`);
            const dataTrack = await reqTrack.json();
            setTrack(dataTrack.message.body.track);
            setLyrics(dataLyrics.message.body.lyrics);
        };
        fetchData();
    }, [props]);

    if (track === undefined ||
        lyrics === undefined ||
        Object.keys(track).length === 0 ||
        Object.keys(lyrics).length === 0
    ) {
        return <Spinner/>
    } else {
        return (
            <>
                <Link to='/' className='btn btn-dark btn-sm mb-4'>Back</Link>
                <div className='card'>
                    <h5 className='card-header'>
                        {track.track_name} by <span>{track.artist_name}</span>
                    </h5>
                    <div className='card-body'>
                        <p className='card-text'>{lyrics.lyrics_body}</p>
                    </div>
                </div>
                <ul className='list-group mt-3'>
                    <li className='list-group-item'>
                        {track.primary_genres.music_genre_list[0]
                            ?
                            <>
                                <strong>Music Genre: </strong>
                                {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                            </>
                            :
                            null
                        }
                    </li>
                    <li className='list-group-item'>
                        <strong>Explicit Words: </strong> {track.explicid === 0 ? 'No' : 'Yes'}
                    </li>
                    <li className='list-group-item'>
                        <strong>Track Rating: </strong> {track.track_rating}
                    </li>
                </ul>
            </>
        );
    }
};

export default Lirycs;