import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Filter from "../components/Filter";
import Map from "../components/Map";
import PlaygroundsList from "../components/PlaygroundsList";

import playgroundsList from "../data/playgrounds";
import Pagination from "rc-pagination";
import { filterList } from "../helpers/filterList";
import {
    filterObjectToQueryString,
    queryStringToFilterObject,
} from "../helpers/filterFields";

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
    const [filter, setFilter] = useState({});

    // Listen for changes to the `page` and filter parameters in the URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get("page")) || 1;
        const filterFromURL = queryStringToFilterObject(queryParams.toString());

        // First - filter the list
        setFilter(filterFromURL);
        setCurrentPage(page);
        let list = filterList(playgroundsList, filterFromURL);
        setTotalCount(list.length);
        setAllFilteredPlaygrounds(list);

        // Second - slice list
        list = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
        setPaginatedPlaygrounds(list);
    }, [location.search]);

    // Change URL when page number of filter changes
    const handleNavigate = (page, filter) => {
        navigate(`?page=${page}&${filterObjectToQueryString(filter)}`);
    };

    // Change filter
    const onSelectFilter = (filter) => {
        handleNavigate(1, filter);
    };

    // Change page number
    const onChangePage = (page) => {
        handleNavigate(page, filter);
    };

    const onMouseOverPlayground = (place) => {
        setHoverPlace(place);
    };

    return (
        <div className="flex-grow container mx-auto flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 p-4">
                <Filter filter={filter} onSelectFilter={onSelectFilter} />
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
                            onChange={onChangePage}
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
