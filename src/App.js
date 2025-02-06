import React from 'react';
import RadioPlayer from './RadioPlayer';
import Geolocation from './geolocation';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
        <Geolocation />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Radio Internetowe. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default App;
