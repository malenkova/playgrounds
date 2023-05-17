import { Link } from "react-router-dom";

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
                        rounded-md mb-3 px-3 py-2 shadow-sm 
                        hover:cursor-pointer
                        hover:border-gray-400
                         border`}
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
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PlaygroundsList;
