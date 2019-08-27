import React, { Component } from 'react';
import './App.css';
import ContinentsSelector from './components/ContinentsSelector';
require('dotenv').config()

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Select Continent</h1>
        <ContinentsSelector />
      </div>
    );
  }
}

export default App;