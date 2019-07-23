import React, {useState, useEffect} from 'react';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from './consts';

export const Context = React.createContext();

const reducer = (state, action) => {
    if (action.type === 'SEARCH_TRACKS') {
        return {
            ...state,
            track_list: action.payload,
            heading: 'Search Results'
        }
    } else {
        return state
    }
};


export const Provider = ({children}) => {

    const [state, setState] = useState({
        track_list: [],
        heading: 'top 10 tracks',
        dispatch: action => setState(state => reducer(state, action))
    });

    useEffect(() => {
        const getCharts = async () => {
            const req = await fetch(`${CORS_PROXY}${API_ROOT_URL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=ua&f_has_lyrics=1&apikey=${API_KEY}`);
            const data = await req.json();
            setState({
                ...state,
                track_list: data.message.body.track_list
            });
        };
        getCharts();
    }, []);

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

