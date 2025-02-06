import React, { useState, useRef, useEffect } from 'react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [volume, setVolume] = useState(1);
  const [selectedStation, setSelectedStation] = useState(null);
  const audioRef = useRef(null);

  const stations = [
    {
      name: 'Antyradio',
      url: 'http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx',
    },
    {
      name: 'Rock Radio',
      url: 'https://stream.open.fm/369?type=.mp4&playertype=live&from=web',
    },
    {
      name: 'RMF FM',
      url: 'https://rs102-krk.rmfstream.pl/rmf_fm',
    },
  ];

  useEffect(() => {
    audioRef.current = new Audio(stations[0].url);
    audioRef.current.preload = 'none';
    setSelectedStation(stations[0].url);

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      audioRef.current.pause();
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleStationChange = (e) => {
    const newUrl = e.target.value;
    const wasPlaying = isPlaying;
    
    if (wasPlaying) {
      audioRef.current.pause();
    }

    audioRef.current.src = newUrl;
    setSelectedStation(newUrl);

    if (wasPlaying) {
      audioRef.current.play()
        .catch(error => console.error('Błąd odtwarzania:', error));
    }
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Radiowy</h2>
      
      <div className="station-selector">
        <label>Wybierz stację: </label>
        <select 
          value={selectedStation} 
          onChange={handleStationChange}
        >
          {stations.map((station, index) => (
            <option key={index} value={station.url}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={togglePlayPause}>
        {isPlaying ? '⏸ Pauza' : '▶ Odtwarzaj'}
      </button>

      <div className="volume-control">
        <label>Głośność: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{(volume * 100).toFixed(0)}%</span>
      </div>

      <div className="date-time">
        <p>Aktualna data: {currentDateTime.toLocaleDateString()}</p>
        <p>Aktualny czas: {currentDateTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default RadioPlayer;