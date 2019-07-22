import React from 'react';
import {Consumer} from '../../context';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from "../../consts";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackTitle: ''
        }

    }

    handleInputChange = (e) =>{
        this.setState({
            trackTitle: e.target.value
        })
    }

    findTrack = async (dispatch, e) =>{
        const req = await fetch(`${CORS_PROXY}${API_ROOT_URL}track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`);
        const data = await req.json();
        console.log(data);
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: data.message.body.track_list
        });
    }


    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div>
                            <h1>Search For A Song</h1>
                                <input type="text"
                                       placeholder='Song title...'
                                       value={this.state.trackTitle}
                                       onChange={this.handleInputChange}
                                />
                                <button onClick={this.findTrack.bind(this, dispatch)} >Search</button>

                        </div>
                    );
                }}
            </Consumer>
        );
    }

}

export default Search;