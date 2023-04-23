const PlaygroundsList = ({ playgrounds = [], currentPage, pageSize }) => {
    return (
        <>
            <ul>
                {playgrounds.map((place, i) => (
                    <li
                        key={place.id}
                        className="flex border border-gray-200 rounded-md mb-3 px-3 py-2 shadow-sm 
                        hover:cursor-pointer
                        hover:border-gray-400"
                    >
                        {place.image ? (
                            <img src="{place.image}" alt={place.name}></img>
                        ) : (
                            <div className="bg-gray-200 w-28 h-20"></div>
                        )}
                        <div className="ml-3">
                            <p className="text-green-600 font-bold">
                                {(currentPage - 1) * pageSize + i + 1}.{" "}
                                {place.name}
                            </p>
                            <p>{place.address}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PlaygroundsList;
