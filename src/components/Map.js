import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import "./Map.css";
import { useState } from "react";

const Map = ({ playgrounds = [], update = false }) => {
    const defaultProps = {
        center: {
            lat: 30.5052,
            lng: -97.8203,
        },
        zoom: 13,
    };

    const [date, setDate] = useState(Date.now());

    // Hide info about all playgrounds
    const onMapClick = () => {
        playgrounds.forEach((place) => {
            place.show = false;
        });
        setDate(Date.now()); // re-render markers
    };

    // Show info about the playground that was clicked
    const onChildClickCallback = (key) => {
        playgrounds.forEach((place) => {
            if (place.id === key) place.show = true;
            else place.show = false;
        });
        setDate(Date.now()); // re-render markers
    };

    return (
        <div style={{ height: "500px", width: "500px" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyApvFYldWTB_D9x2IOptP11JL-n9PjxXcM",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onChildClick={onChildClickCallback}
                onClick={onMapClick}
            >
                {playgrounds.map((place, i) => (
                    <MapMarker
                        i={i}
                        key={place.id}
                        lat={place.geometry.location.lat}
                        lng={place.geometry.location.lng}
                        show={place.show}
                        place={place}
                        update={date}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
