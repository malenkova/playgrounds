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

    const sendForm = () => {
        onSelectFilter(filter);
    };

    return (
        <>
            <div>Filter:</div>
            {Object.values(filterFields).map((f) => {
                if (f.type === FILTER_FIELD_BOOLEAN) {
                    return (
                        <div key={f.name + "_field"}>
                            <label>{f.title}:</label>
                            <input
                                type="checkbox"
                                checked={filter[f.name]}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        [f.name]: e.target.checked,
                                    });
                                }}
                            />
                            <br />
                        </div>
                    );
                } else if (f.type === FILTER_FIELD_MULTI_CHECKBOX) {
                    return (
                        <div key={f.name + "_field"}>
                            <label>{f.title}:</label>
                            {f.values.map((v) => (
                                <span key={v.value + "_field"}>
                                    <input
                                        type="checkbox"
                                        checked={filter[f.name][v.value]}
                                        onChange={(e) => {
                                            setFilter({
                                                ...filter,
                                                [f.name]: {
                                                    ...filter[f.name],
                                                    [v.value]: e.target.checked,
                                                },
                                            });
                                        }}
                                    />{" "}
                                    {v.title}
                                </span>
                            ))}
                        </div>
                    );
                }
                return <></>;
            })}
            <br />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={sendForm}
            >
                Apply Filter
            </button>
        </>
    );
};

export default Filter;
