import MapInfo from "./MapInfo";

const MapMarker = ({ show = false, place }) => {
    return (
        <>
            <div className="map-marker"></div>
            {show && <MapInfo place={place} />}
        </>
    );
}

export default MapMarker;