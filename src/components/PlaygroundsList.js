import { Link } from "react-router-dom";
import { FeaturesListShort } from "./FeaturesList";

const PlaygroundsList = ({
    playgrounds = [],
    currentPage,
    pageSize,
    hoverPlace = null,
    onMouseOverPlaygroundInList,
}) => {
    return (
        <>
            <ul>
                {playgrounds.map((place, i) => (
                    <li
                        key={place.id}
                        className={`${
                            hoverPlace && hoverPlace.id === place.id
                                ? "border-gray-400"
                                : "border-gray-200"
                        }
                        area
                        hover:cursor-pointer`}
                        onMouseEnter={(e) => {
                            onMouseOverPlaygroundInList(place);
                            e.stopPropagation();
                        }}
                    >
                        <Link
                            key={`link_${place.id}`}
                            to={`/playgrounds/${place.id}`}
                            className="w-full flex"
                        >
                            {place.image ? (
                                <img src="{place.image}" alt={place.name}></img>
                            ) : (
                                <div className="bg-gray-200 w-28 h-20"></div>
                            )}
                            <div className="ml-3">
                                <p className="text-my-green font-bold">
                                    {(currentPage - 1) * pageSize + i + 1}.{" "}
                                    {place.name}
                                </p>
                                <p>{place.address}</p>
                                <FeaturesListShort features={place.filter} />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PlaygroundsList;
