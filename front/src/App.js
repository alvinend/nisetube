import React from 'react';
import './App.css';
import Layout from './components/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Upload from './components/Upload'
import List from './components/List'
import Video from './components/Video';

export const baseurl = '/'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/video/:videoID" component={Video} />
          <Route path="/video/:videoID">
            <Video />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
