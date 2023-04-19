import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import MapInfo from "./MapInfo";

const Map = ({ playgrounds = [], currentPage, pageSize }) => {
    const [map, setMap] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyApvFYldWTB_D9x2IOptP11JL-n9PjxXcM",
    });

    const onLoad = useCallback((map) => setMap(map), []);

    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    const defaultProps = {
        center: {
            lat: 30.49,
            lng: -97.82,
        },
        zoom: 13,
        maxZoom: 16,
    };

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

    if (!isLoaded) {
        return <></>;
    }

    return (
        <div
            id="map_container"
            style={{ height: "500px", width: "100%", overflow: "hidden" }}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                options={defaultProps}
                onLoad={onLoad}
            >
                {playgrounds.map((place, i) => {
                    const marker_div = document.createElement("div");

                    marker_div.className = "price-tag";
                    marker_div.textContent = "$2.5M";

                    return (
                        <Marker
                            key={place.id}
                            position={place.geometry.location}
                            content={marker_div}
                            onClick={(props, marker) => {
                                setSelectedPlace(place);
                            }}
                            label={(
                                (currentPage - 1) * pageSize +
                                i +
                                1
                            ).toString()}
                        />
                    );
                })}
                {selectedPlace ? (
                    <InfoWindow
                        position={selectedPlace.geometry.location}
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
