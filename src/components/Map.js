import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import MapInfo from "./MapInfo";

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
    maxZoom: 18,
    styles: myStyles,
};

const Map = ({
    playgrounds = [],
    currentPage,
    pageSize,
    hoverPlace = null,
    onMouseOverMarker = null,
    containerStyle = { width: "100%", height: "500px" },
    maxZoom = null,
}) => {
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const onLoad = useCallback((map) => setMap(map), []);

    if (maxZoom !== null) defaultProps.maxZoom = maxZoom;

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

    let pinSVGFilled =
        "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
    let markerImage = {
        path: pinSVGFilled,
        anchor: new window.google.maps.Point(10, 23),
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "white",
        scale: 2,
        labelOrigin: new window.google.maps.Point(12, 9),
    };
    return (
        <div id="map_container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                options={defaultProps}
                onLoad={onLoad}
            >
                {playgrounds.map((place, i) => {
                    markerImage = {
                        ...markerImage,
                        fillColor:
                            hoverPlace && place.id === hoverPlace.id
                                ? "red"
                                : "green",
                    };
                    return (
                        <Marker
                            key={place.id}
                            position={place.geometry.location}
                            onClick={(props, marker) => {
                                setSelectedPlace(place);
                            }}
                            onMouseOver={() =>
                                onMouseOverMarker
                                    ? onMouseOverMarker(place)
                                    : ""
                            }
                            icon={markerImage}
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
