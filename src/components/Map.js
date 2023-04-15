import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import { useState, useCallback, useEffect } from "react";

const Map = ({ playgrounds = [], currentPage, pageSize }) => {
    const [map, setMap] = useState(null);
    const onLoad = useCallback((map) => setMap(map), []);

    const defaultProps = {
        center: {
            lat: 30.49,
            lng: -97.82,
        },
        zoom: 13,
        maxZoom: 16,
    };

    const [date, setDate] = useState(Date.now());

    // change scale/position when playgrounds list changes
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            playgrounds.forEach((marker) => {
                bounds.extend({
                    lat: marker.geometry.location.lat,
                    lng: marker.geometry.location.lng,
                });
            });
            map.fitBounds(bounds);
        }
    }, [map, playgrounds]);

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

    function createMapOptions(maps) {
        return {
            maxZoom: defaultProps.maxZoom,
        };
    }

    return (
        <div style={{ height: "500px", width: "100%", overflow: "hidden" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyApvFYldWTB_D9x2IOptP11JL-n9PjxXcM",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={createMapOptions}
                onGoogleApiLoaded={({ map, maps }) => {
                    onLoad(map);
                }}
                onLoad={onLoad}
                onChildClick={onChildClickCallback}
                onClick={onMapClick}
                yesIWantToUseGoogleMapApiInternals={true}
                resetBoundsOnResize={true}
            >
                {playgrounds.map((place, i) => (
                    <MapMarker
                        label={(currentPage - 1) * pageSize + i + 1}
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
