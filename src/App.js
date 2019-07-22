import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

import {Provider} from './context';

import './reset.css';

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <>
                    <Navbar/>
                    <Switch>
                        <Route exact path='/' component={Index}/>
                        <Route path='/lyrics/track/:id' component={Lyrics}/>
                    </Switch>
                </>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
