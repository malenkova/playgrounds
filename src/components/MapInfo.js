import { Link } from "react-router-dom";

const MapInfo = ({ place }) => {
    return (
        <div className="w-40">
            <Link to={`/playgrounds/${place.id}`}>
                <h3 className="font-semibold text-my-green">{place.name}</h3>
            </Link>
            <p>{place.address}</p>
        </div>
    );
};

export default MapInfo;
