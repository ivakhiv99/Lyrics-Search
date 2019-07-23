import React, {useState, useEffect} from 'react';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from '../../consts';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';


const Lirycs = (props) => {
    const [track, setTrack] = useState({});
    const [lyrics, setLyrics] = useState({});

    useEffect( () => {
        const fetchData = async () => {
            const reqLyrics = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.lyrics.get?track_id=${props.match.params.id}&apikey=${API_KEY}`);
            const dataLyrics = await reqLyrics.json();
            const reqTrack = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.get?track_id=${props.match.params.id}&apikey=${API_KEY}`);
            const dataTrack = await reqTrack.json();
            setTrack(dataTrack.message.body.track);
            setLyrics(dataLyrics.message.body.lyrics);
        };
        fetchData();
    }, []);

    if (track === undefined ||
        lyrics === undefined ||
        Object.keys(track).length === 0 ||
        Object.keys(lyrics).length === 0
    ) {
        return <Spinner/>
    } else {
        return (
            <>
                <Link to='/'>Back</Link>
                <h5>
                    {track.track_name} by <span>{track.artist_name}</span>
                </h5>
                <div>
                    <p>{lyrics.lyrics_body}</p>
                </div>
                {track.primary_genres.music_genre_list[0]
                    ?
                    <div>
                        <p><strong>Music
                            Genre: </strong> {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </p>
                    </div>
                    :
                    null
                }
                <div>
                    <p><strong>Explicit Words: </strong> {track.explicid === 0 ? 'No' : 'Yes'}</p>
                </div>
                <div>
                    <p><strong>Track Rating: </strong> {track.track_rating}</p>
                </div>
            </>
        );
    }
};

export default Lirycs;