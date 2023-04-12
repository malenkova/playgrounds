import MapInfo from "./MapInfo";

const MapMarker = ({ show = false, place, i }) => {
    return (
        <>
            <div className="w-6 h-6 bg-red-500 rounded-full cursor-pointer">
                <div className="text-white text-center pt-1">{i + 1}</div>
            </div>
            {show && <MapInfo place={place} />}
        </>
    );
};

export default MapMarker;
