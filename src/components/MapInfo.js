const MapInfo = ({place}) => {
    return (
        <div className="map-info">
            <h3>{place.name}</h3>
            <p>{place.address}</p>
        </div>
    );
};

export default MapInfo;