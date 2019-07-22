import React from 'react';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from '../../consts';
import Spinner from '../layout/Spinner';
import {Link} from "react-router-dom";


class Lirycs extends React.Component {
    state = {
        track: {},
        lyrics: {}
    }

    render() {
        const {track, lyrics} = this.state;
        console.log(track);
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
    }

    async componentDidMount() {
        const reqLyrics = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`);
        const dataLyrics = await reqLyrics.json();
        // console.log(data);
        const reqTrack = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`);
        const dataTrack = await reqTrack.json();
        // console.log(dataTrack);

        this.setState({
            lyrics: dataLyrics.message.body.lyrics,
            track: dataTrack.message.body.track
        })
    }
}

export default Lirycs;