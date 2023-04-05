import GoogleMapReact from 'google-map-react';
import MapMarkerComponent from './MapMarkerComponent';
import './Map.css';
import { useState } from 'react';

const MapComponent = ({ playgrounds = [] }) => {
  const defaultProps = {
    center: {
      lat: 30.5052,
      lng: -97.8203
    },
    zoom: 13
  };

  const [places, setPlaces] = useState(playgrounds);

  // Hide info about all playgrounds
  const onMapClick = () => {
    places.forEach(place => {
      place.show = false;
    });
    setPlaces([...places]);
  }

  // Show info about the playground that was clicked
  const onChildClickCallback = (key) => {
    places.forEach(place => {
      if (place.id === key) place.show = true;
      else place.show = false;
    });
    setPlaces([...places]);
  };

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyApvFYldWTB_D9x2IOptP11JL-n9PjxXcM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onChildClick={onChildClickCallback}
        onClick={onMapClick}
      >
        {places.map((place) => (
              <MapMarkerComponent
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                show={place.show}
                place={place}
              />
            ))}
        
      </GoogleMapReact>
    </div>
  )
};

export default MapComponent;