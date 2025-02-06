import React, { useState, useRef, useEffect } from 'react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [volume, setVolume] = useState(1);  // Dodaj stan dla głośności
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx');
    audioRef.current.preload = 'none';

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Funkcja do obsługi zmiany głośności
  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue; // Ustawiamy głośność na audioRef
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Antyradio</h2>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pauza' : 'Odtwórz'}
      </button>
      <div className="date-time">
        <p>Data: {currentDateTime.toLocaleDateString()}</p>
        <p>Godzina: {currentDateTime.toLocaleTimeString()}</p>
      </div>
      {/* Dodaj suwak do regulacji głośności */}
      <div className="volume-control">
        <label htmlFor="volume">Głośność:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{Math.round(volume * 100)}%</span> {/* Wyświetl procent głośności */}
      </div>
    </div>
  );
};

export default RadioPlayer;
