import React, {Component} from 'react';
import {API_KEY, API_ROOT_URL, CORS_PROXY} from './consts';

const Context = React.createContext();

const reducer = (state, action) =>{
  switch (action.type) {
      case 'SEARCH_TRACKS':
          return{
              ...state,
              track_list: action.payload,
              heading: 'Search Results'
          };
      default: return state;
  }
};

export class Provider extends Component {
    state = {
        track_list: [],
        heading: 'top 10 tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    };


    async componentDidMount() {
        const req = await fetch(`${CORS_PROXY}${API_ROOT_URL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=ua&f_has_lyrics=1&apikey=${API_KEY}`);
        const data = await req.json();
        // console.log('result', data);
        this.setState({
            track_list: data.message.body.track_list
        })
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;