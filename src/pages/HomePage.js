import { useState } from "react";
import Filter from "../components/Filter";
import Map from "../components/Map";
import PlaygroundsList from "../components/PlaygroundsList";

import playgroundsList from "../data/playgrounds";
import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
} from "../components/filterFields";
import Pagination from "rc-pagination";

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

    const filterList = (filter) => {
        let list = playgroundsList;
        if (filter !== null) {
            list = playgroundsList.filter((place) => {
                for (let field_name in filterFields) {
                    const field = filterFields[field_name];
                    if (field.name in filter) {
                        if (field.type === FILTER_FIELD_BOOLEAN) {
                            if (filter[field_name] === true) {
                                if (place.filter[field_name] !== true)
                                    return false;
                            }
                        } else if (field.type === FILTER_FIELD_MULTI_CHECKBOX) {
                            for (let v of field.values) {
                                if (
                                    v.value in filter[field_name] &&
                                    filter[field_name][v.value] === true
                                ) {
                                    if (
                                        !place.filter[field_name].includes(
                                            v.value
                                        )
                                    )
                                        return false;
                                }
                            }
                        } else if (field.type === FILTER_FIELD_RADIO) {
                            if (
                                filter[field_name] !== RADIO_DEFAULT_VALUE &&
                                !place.filter[field_name].includes(
                                    filter[field_name]
                                )
                            ) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            });
        }
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
                <Filter onSelectFilter={filterList} />
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
