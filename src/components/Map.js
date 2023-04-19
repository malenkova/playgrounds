import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import MapInfo from "./MapInfo";

// size of map
const containerStyle = {
    width: "100%",
    height: "500px",
};

// hide all points of interest
let myStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

const defaultProps = {
    center: {
        lat: 30.49,
        lng: -97.82,
    },
    zoom: 13,
    maxZoom: 16,
    styles: myStyles,
};

const Map = ({ playgrounds = [], currentPage, pageSize }) => {
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyApvFYldWTB_D9x2IOptP11JL-n9PjxXcM",
    });

    const onLoad = useCallback((map) => setMap(map), []);

    // change scale/position when playgrounds list changes
    useEffect(() => {
        if (map) {
            setSelectedPlace(null);
            const bounds = new window.google.maps.LatLngBounds();
            playgrounds.forEach((marker) => {
                bounds.extend({
                    lat: marker.geometry.location.lat,
                    lng: marker.geometry.location.lng,
                });
            });
            map.fitBounds(bounds, { right: 50, left: 50, top: 50, bottom: 50 });
        }
    }, [map, playgrounds]);

    if (!isLoaded) {
        return <></>;
    }

    return (
        <div id="map_container" style={{ height: "500px", width: "100%" }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                options={defaultProps}
                onLoad={onLoad}
            >
                {playgrounds.map((place, i) => {
                    return (
                        <Marker
                            key={place.id}
                            position={place.geometry.location}
                            onClick={(props, marker) => {
                                setSelectedPlace(place);
                            }}
                            label={{
                                text: (
                                    (currentPage - 1) * pageSize +
                                    i +
                                    1
                                ).toString(),
                                color: "#fff",
                            }}
                        />
                    );
                })}
                {selectedPlace ? (
                    <InfoWindow
                        position={selectedPlace.geometry.location}
                        options={{ disableAutoPan: false }}
                        onCloseClick={() => {
                            setSelectedPlace(null);
                        }}
                    >
                        <MapInfo place={selectedPlace} />
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};

export default Map;
