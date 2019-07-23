import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import Lyrics from './components/tracks/Lyrics';

import {Provider} from './context';

import './reset.css';

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/lyrics/track/:id' component={Lyrics}/>
                        </Switch>
                    </div>
                </>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
