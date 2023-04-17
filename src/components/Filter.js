import { useState } from "react";
import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
} from "./filterFields";

const Filter = ({ onSelectFilter }) => {
    const initFilter = {};
    for (let field in filterFields) {
        if (filterFields[field].type === FILTER_FIELD_BOOLEAN)
            initFilter[field] = false;
        else if (filterFields[field].type === FILTER_FIELD_MULTI_CHECKBOX) {
            initFilter[field] = {};
            for (let v of filterFields[field].values)
                initFilter[field][v.value] = false;
        }
    }

    const [filter, setFilter] = useState(initFilter);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <>
            <button
                className="filter-button md:hidden"
                onClick={(e) => setShowFilter(!showFilter)}
            >
                Filter
            </button>
            <div
                id="filter-container"
                className={
                    showFilter
                        ? "flex flex-row flex-wrap md:block"
                        : "hidden md:block"
                }
            >
                {Object.values(filterFields).map((f) => {
                    if (f.type === FILTER_FIELD_BOOLEAN) {
                        let id = f.name + "_field";
                        return (
                            <div key={id} className="w-1/2 md:w-full">
                                <input
                                    id={id}
                                    className="mr-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                                    type="checkbox"
                                    checked={filter[f.name]}
                                    onChange={(e) => {
                                        setFilter({
                                            ...filter,
                                            [f.name]: e.target.checked,
                                        });
                                    }}
                                />
                                <label htmlFor={id}>{f.title}</label>
                            </div>
                        );
                    } else if (f.type === FILTER_FIELD_MULTI_CHECKBOX) {
                        return (
                            <div
                                key={f.name + "_field"}
                                className="w-1/2 md:w-full"
                            >
                                <h2 className="text-lg font-bold mt-1">
                                    {f.title}
                                </h2>
                                {f.values.map((v) => {
                                    let id = f.name + "_" + v.value + "_field";
                                    return (
                                        <div key={id}>
                                            <input
                                                id={id}
                                                className="mr-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                                                type="checkbox"
                                                checked={
                                                    filter[f.name][v.value]
                                                }
                                                onChange={(e) => {
                                                    setFilter({
                                                        ...filter,
                                                        [f.name]: {
                                                            ...filter[f.name],
                                                            [v.value]:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    });
                                                }}
                                            />
                                            <label htmlFor={id}>
                                                {v.title}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                    return <></>;
                })}
                <button
                    className="filter-button mt-1"
                    onClick={(e) => onSelectFilter(filter)}
                >
                    Apply Filter
                </button>
                <button
                    className="filter-button mt-1"
                    onClick={(e) => {
                        setFilter(initFilter);
                        onSelectFilter(initFilter);
                    }}
                >
                    Clear Filter
                </button>
            </div>
        </>
    );
};

export default Filter;
