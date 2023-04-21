import { useState } from "react";
import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
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
        } else if (filterFields[field].type === FILTER_FIELD_RADIO) {
            initFilter[field] = RADIO_DEFAULT_VALUE;
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
            <h2 className="text-lg font-bold mt-1">Features</h2>
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
                                        let new_filter = {
                                            ...filter,
                                            [f.name]: e.target.checked,
                                        };
                                        setFilter(new_filter);
                                        onSelectFilter(new_filter);
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
                                                    let new_filter = {
                                                        ...filter,
                                                        [f.name]: {
                                                            ...filter[f.name],
                                                            [v.value]:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    };
                                                    setFilter(new_filter);
                                                    onSelectFilter(new_filter);
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
                    } else if (f.type === FILTER_FIELD_RADIO) {
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
                                                name={f.name}
                                                className="mr-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                                                type="radio"
                                                value={v.value}
                                                checked={
                                                    filter[f.name] === v.value
                                                }
                                                onChange={(e) => {
                                                    let new_filter = {
                                                        ...filter,
                                                        [f.name]: v.value,
                                                    };
                                                    setFilter(new_filter);
                                                    onSelectFilter(new_filter);
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
                    className="filter-button mt-1 mr-2 md:hidden"
                    onClick={(e) => setShowFilter(!showFilter)}
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
