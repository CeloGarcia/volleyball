import React from 'react';
import logo from './logo.svg';
import './App.css';
import TablePlayers from './components/TablePlayers';
import AddPlayers from './components/AddPlayers';
import playersData from './players.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main className='container'>
        <div className="table-times">
          {/* <TablePlayers/> */}
          <AddPlayers players={playersData}/>
        </div>
      </main>
    </div>
  );
}

export default App;
