import React, { useState } from "react";
import {
    filterFields,
    filterGroups,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
} from "../helpers/filterFields";
import FilterGroup from "./FilterGroup";
import FilterCheckbox from "./FilterCheckbox";
import FilterRadio from "./FilterRadio";

const Filter = ({ filter, onSelectFilter }) => {
    const [showFilter, setShowFilter] = useState(false);

    const onFilterChange = (name, value, prefixName = "") => {
        if (prefixName) {
            // for radio buttons put all values to false
            for (let f in filter) {
                if (f.slice(0, prefixName.length) === prefixName) {
                    filter[f] = false;
                }
            }
        }
        let new_filter = {
            ...filter,
            [name]: value,
        };
        onSelectFilter(new_filter);
    };

    return (
        <>
            <button
                className="button md:hidden"
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
                {Object.values(filterGroups).map((fieldFroup) => (
                    <FilterGroup
                        title={fieldFroup.title}
                        key={fieldFroup.title}
                    >
                        {fieldFroup.items.map((field_name) => {
                            const field = filterFields[field_name];
                            if (field.type === FILTER_FIELD_BOOLEAN) {
                                return (
                                    <FilterCheckbox
                                        key={field_name}
                                        title={field.title}
                                        name={field.name}
                                        value={filter[field_name]}
                                        onChange={onFilterChange}
                                    />
                                );
                            } else if (
                                field.type === FILTER_FIELD_MULTI_CHECKBOX
                            ) {
                                return (
                                    <React.Fragment key={field_name}>
                                        <p className="mt-1 font-semibold">
                                            {field.title}
                                        </p>
                                        {field.values.map((v) => {
                                            const v_name = `${field_name}_${v.name}`;
                                            return (
                                                <FilterCheckbox
                                                    key={v_name}
                                                    title={v.title}
                                                    name={v_name}
                                                    value={filter[v_name]}
                                                    onChange={onFilterChange}
                                                />
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            } else if (field.type === FILTER_FIELD_RADIO) {
                                return (
                                    <React.Fragment key={field_name}>
                                        <p className="mt-1 font-semibold">
                                            {field.title}
                                        </p>
                                        {field.values.map((v) => {
                                            const v_name = `${field_name}_${v.name}`;
                                            return (
                                                <FilterRadio
                                                    key={v_name}
                                                    title={v.title}
                                                    name={field_name}
                                                    value={v.name}
                                                    checked={
                                                        filter[v_name] === true
                                                    }
                                                    onChange={onFilterChange}
                                                />
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            }
                            return null;
                        })}
                    </FilterGroup>
                ))}
                <button
                    className="button mt-1 mr-2 md:hidden"
                    onClick={(e) => setShowFilter(!showFilter)}
                >
                    Apply Filter
                </button>
                <button
                    className="button mt-1"
                    onClick={(e) => {
                        onSelectFilter(null);
                    }}
                >
                    Clear Filter
                </button>
            </div>
        </>
    );
};

export default Filter;
