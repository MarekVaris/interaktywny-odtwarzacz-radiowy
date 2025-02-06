import React, { useState, useEffect } from 'react';

const Geolocation = () => {
  const [location, setLocation] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error("Geolokalizacja nie powiodła się", error);
        }
      );
    }
    setBrowserInfo(navigator.userAgent);
  }, []);

  return (
    <div className="geolocation">
      <p>Twoja lokalizacja: {location ? `${location.latitude}, ${location.longitude}` : "Brak dostępu"}</p>
      <p>Informacje o przeglądarce: {browserInfo}</p>
    </div>
  );
  
};

export default Geolocation;
