const MapInfo = ({ place }) => {
    return (
        <>
            <h3 className="font-semibold">{place.name}</h3>
            <p>{place.address}</p>
        </>
    );
};

export default MapInfo;
