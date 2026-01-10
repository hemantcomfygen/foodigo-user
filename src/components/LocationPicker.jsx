import React, { useState } from "react";

const LocationPicker = ({ onLocationDetected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    console.log("Location button clicked");

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Position:", position);

        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setLoading(false);

        onLocationDetected?.({ lat, long });
      },
      (err) => {
        console.error("Location error:", err);
        setLoading(false);

        switch (err.code) {
          case 1:
            setError("Permission denied");
            break;
          case 2:
            setError("Position unavailable");
            break;
          case 3:
            setError("Request timeout");
            break;
          default:
            setError("Unknown error");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <button onClick={getLocation} disabled={loading}>
        {loading ? "Detecting..." : "Enable Location"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LocationPicker;
