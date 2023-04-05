import MapInfoComponent from "./MapInfoComponent";

const MapMarkerComponent = ({ show = false, place }) => {
    return (
        <>
            <div className="map-marker"></div>
            {show && <MapInfoComponent place={place} />}
        </>
    );
}

export default MapMarkerComponent;