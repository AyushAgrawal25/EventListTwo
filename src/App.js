import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import EventList from './EventList/EventList';
import Event from './Event/Event'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import ECellCadets from './ECellCadets/ECellCadets';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <Route path='/' component={Navbar} />
          <div className="qb-container">
            
            <Route exact path='/' component={EventList} />
            <Route path='/Event/:post_id' component={Event} />
            <Route path='/ECellCadets' component={ECellCadets} />
            
          </div>
          <Route path='/' component={Footer}  />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
