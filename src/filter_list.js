import {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
} from "./components/filterFields";

export const filterList = (playgroundsList, filter) => {
    if (filter === null) return playgroundsList;

    return playgroundsList.filter((place) => {
        for (let field_name in filterFields) {
            const field = filterFields[field_name];
            if (field.name in filter) {
                if (field.type === FILTER_FIELD_BOOLEAN) {
                    if (filter[field_name] === true) {
                        if (place.filter[field_name] !== true) return false;
                    }
                } else if (field.type === FILTER_FIELD_MULTI_CHECKBOX) {
                    for (let v of field.values) {
                        if (
                            v.value in filter[field_name] &&
                            filter[field_name][v.value] === true
                        ) {
                            if (!place.filter[field_name].includes(v.value))
                                return false;
                        }
                    }
                } else if (field.type === FILTER_FIELD_RADIO) {
                    if (
                        filter[field_name] !== RADIO_DEFAULT_VALUE &&
                        !place.filter[field_name].includes(filter[field_name])
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    });
};
