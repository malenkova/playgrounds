import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Map from "./components/Map";
import PlaygroundsList from "./components/PlaygroundsList";
import playgroundsList from "./data/playgrounds";
import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
} from "./components/filterFields";

function App() {
    const [playgrounds, setPlaygrounds] = useState(playgroundsList);

    const filterList = (filter) => {
        console.log("filterList", filter);
        console.log(filterFields);
        let list = playgroundsList.filter((place) => {
            for (let field_name in filterFields) {
                const field = filterFields[field_name];
                console.log(field);
                console.log(`field_name=${field_name}`);
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
                                if (place.filter[field_name] === v.value)
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
        <>
            <header></header>
            <main>
                <h1>Home page</h1>
                <Filter onSelectFilter={filterList} />
                <Map playgrounds={playgrounds} />
                <PlaygroundsList playgrounds={playgrounds} />
            </main>
            <footer></footer>
        </>
    );
}

export default App;
