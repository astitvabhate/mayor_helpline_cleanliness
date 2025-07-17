import React, { useEffect, useRef, useState } from "react";

const LocationPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapInstance = useRef(null);
  const autocomplete = useRef(null);
  const [address, setAddress] = useState("");

  // ✅ Reverse geocode and call onLocationSelect with plain lat/lng/address
  const getAddressFromCoords = ({ lat, lng }) => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
      const addr = results[0].formatted_address;
      setAddress(addr);
      onLocationSelect({ lat, lng, address: addr }); // <--- sends to parent
    } else {
      console.error("Geocoder failed: " + status);
    }
  });
};

  // ✅ Initialize map + autocomplete
  useEffect(() => {
    if (!window.google || !mapRef.current || !searchInputRef.current) return;

    const defaultPosition = { lat: 28.6139, lng: 77.2090 }; // Delhi default

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: defaultPosition,
      zoom: 15,
      disableDefaultUI: true,
    });

    // ✅ Map "idle" event — update location state
    mapInstance.current.addListener("idle", () => {
      const center = mapInstance.current.getCenter();
      const latLng = {
        lat: center.lat(), // Convert to number
        lng: center.lng(),
      };
      getAddressFromCoords(latLng);
    });

    // ✅ Autocomplete setup
    autocomplete.current = new window.google.maps.places.Autocomplete(
      searchInputRef.current,
      {
        fields: ["geometry", "formatted_address"],
        types: ["geocode"],
      }
    );

    autocomplete.current.addListener("place_changed", () => {
      const place = autocomplete.current.getPlace();
      if (!place.geometry) return;

      const location = place.geometry.location;
      const lat = location.lat();
      const lng = location.lng();

      mapInstance.current.setCenter({ lat, lng });
      getAddressFromCoords({ lat, lng });
    });

    // ✅ Use browser geolocation if allowed
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          mapInstance.current.setCenter(coords);
          getAddressFromCoords(coords);
        },
        () => console.warn("Geolocation permission denied.")
      );
    }
  }, []);

  return (
    <div className="relative w-full h-72 rounded-lg overflow-hidden border border-gray-300">
      {/* Search Input */}
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search a place..."
        className="absolute top-2 left-2 right-2 z-20 p-2 rounded-md shadow bg-white text-sm outline-none"
      />

      {/* Map */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Static pin */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
        <img
          src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
          alt="Pin"
          className="w-8 h-8"
        />
      </div>

      {/* Address display */}
      {address && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 text-sm p-2 rounded-md shadow">
          📍 <span className="font-medium">{address}</span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
