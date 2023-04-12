const MapInfo = ({ place }) => {
    return (
        <div className="relative bottom-[150px] left-[-45px] w-56 bg-white p-2 text-sm z-10 shadow-md shadow-gray-300">
            <h3 className="font-semibold">{place.name}</h3>
            <p>{place.address}</p>
        </div>
    );
};

export default MapInfo;
