import { useState } from "react";
import Filter from "../components/Filter";
import Map from "../components/Map";
import PlaygroundsList from "../components/PlaygroundsList";

import playgroundsList from "../data/playgrounds";
import Pagination from "rc-pagination";
import { filterList } from "../filter_list";

const PAGE_SIZE = 5;

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(playgroundsList.length);
    const [allFilteredPlaygrounds, setAllFilteredPlaygrounds] =
        useState(playgroundsList);
    const [paginatedPlaygrounds, setPaginatedPlaygrounds] = useState(
        playgroundsList.slice(0, PAGE_SIZE)
    );
    const [hoverPlace, setHoverPlace] = useState(null);

    const onSelectFilter = (filter) => {
        let list = filterList(playgroundsList, filter);
        setTotalCount(list.length);
        setAllFilteredPlaygrounds(list);
        PaginationChange(1, PAGE_SIZE, list);
    };

    const PaginationChange = (page, pageSize, list = null) => {
        if (list === null) list = allFilteredPlaygrounds;
        setCurrentPage(page);
        list = list.slice((page - 1) * pageSize, page * pageSize);
        setPaginatedPlaygrounds(list);
    };

    const onMouseOverPlaygroundInList = (place) => {
        setHoverPlace(place);
    };

    return (
        <div className="flex-grow container mx-auto mt-4 flex flex-col md:flex-row bg-white">
            <div className="w-full md:w-1/4 p-4">
                <Filter onSelectFilter={onSelectFilter} />
            </div>
            <div className="w-full md:w-1/2 p-4">
                {paginatedPlaygrounds.length ? (
                    <>
                        <PlaygroundsList
                            playgrounds={paginatedPlaygrounds}
                            pageSize={PAGE_SIZE}
                            currentPage={currentPage}
                            onMouseOverPlaygroundInList={
                                onMouseOverPlaygroundInList
                            }
                        />
                        <Pagination
                            total={totalCount}
                            pageSize={PAGE_SIZE}
                            hideOnSinglePage={true}
                            showTotal={(total, range) =>
                                `Showing ${range[0]}-${range[1]} of ${total}`
                            }
                            current={currentPage}
                            onChange={PaginationChange}
                        />
                    </>
                ) : (
                    "Playgrounds not found."
                )}
            </div>
            <div className="w-full md:w-1/2 p-4">
                {paginatedPlaygrounds.length ? (
                    <Map
                        playgrounds={paginatedPlaygrounds}
                        pageSize={PAGE_SIZE}
                        currentPage={currentPage}
                        hoverPlace={hoverPlace}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default HomePage;
