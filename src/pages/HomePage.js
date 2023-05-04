import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Filter from "../components/Filter";
import Map from "../components/Map";
import PlaygroundsList from "../components/PlaygroundsList";

import playgroundsList from "../data/playgrounds";
import Pagination from "rc-pagination";
import { filterList } from "../filter_list";

const PAGE_SIZE = 5;

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPageNumber = parseInt(queryParams.get("page")) || 1;

    const [currentPage, setCurrentPage] = useState(initialPageNumber);
    const [totalCount, setTotalCount] = useState(playgroundsList.length);
    const [allFilteredPlaygrounds, setAllFilteredPlaygrounds] =
        useState(playgroundsList);
    const [paginatedPlaygrounds, setPaginatedPlaygrounds] = useState(
        playgroundsList.slice(
            (initialPageNumber - 1) * PAGE_SIZE,
            initialPageNumber * PAGE_SIZE
        )
    );
    const [hoverPlace, setHoverPlace] = useState(null);

    // Listen for changes to the `page` parameter in the URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get("page")) || 1;
        if (page !== currentPage) {
            PaginationChange(page, PAGE_SIZE);
        }
    }, [location.search, currentPage]);

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
        navigate(`?page=${page}`);
    };

    const onMouseOverPlayground = (place) => {
        setHoverPlace(place);
    };

    return (
        <div className="flex-grow container mx-auto flex flex-col md:flex-row">
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
                            hoverPlace={hoverPlace}
                            onMouseOverPlaygroundInList={onMouseOverPlayground}
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
                        onMouseOverMarker={onMouseOverPlayground}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default HomePage;
