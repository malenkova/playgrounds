import MapInfo from "./MapInfo";

const MapMarker = ({ show = false, place, i }) => {
    return (
        <>
            <div className="map-marker">{i + 1}</div>
            {show && <MapInfo place={place} />}
        </>
    );
};

export default MapMarker;
