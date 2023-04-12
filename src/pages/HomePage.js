import { useState } from "react";
import Filter from "../components/Filter";
import Map from "../components/Map";
import PlaygroundsList from "../components/PlaygroundsList";

import playgroundsList from "../data/playgrounds";
import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
} from "../components/filterFields";

const HomePage = () => {
    const [playgrounds, setPlaygrounds] = useState(playgroundsList);

    const filterList = (filter) => {
        let list = playgroundsList.filter((place) => {
            for (let field_name in filterFields) {
                const field = filterFields[field_name];
                if (field.name in filter) {
                    if (field.type === FILTER_FIELD_BOOLEAN) {
                        if (filter[field_name] === true) {
                            if (place.filter[field_name] !== true) return false;
                        }
                    } else if (field.type === FILTER_FIELD_MULTI_CHECKBOX) {
                        let found = false;
                        let any = true;
                        for (let v of field.values) {
                            if (
                                v.value in filter[field_name] &&
                                filter[field_name][v.value] === true
                            ) {
                                any = false;
                                if (place.filter[field_name].includes(v.value))
                                    found = true;
                            }
                        }
                        if (!found && !any) return false;
                    }
                }
            }
            return true;
        });
        setPlaygrounds(list);
    };

    return (
        <div className="flex-grow container mx-auto mt-4 flex flex-col md:flex-row bg-white">
            <div className="w-full md:w-1/4 p-4">
                <Filter onSelectFilter={filterList} />
            </div>
            <div className="w-full md:w-3/4 p-4">
                <Map playgrounds={playgrounds} />
                <PlaygroundsList playgrounds={playgrounds} />
            </div>
        </div>
    );
};

export default HomePage;
