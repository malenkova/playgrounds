const MapInfo = ({ place }) => {
    return (
        <div className="w-40">
            <h3 className="font-semibold">{place.name}</h3>
            <p>{place.address}</p>
        </div>
    );
};

export default MapInfo;
