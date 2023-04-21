const FILTER_FIELD_BOOLEAN = "boolean";
const FILTER_FIELD_MULTI_CHECKBOX = "multi-checkbox";
const FILTER_FIELD_RADIO = "radio";
const RADIO_DEFAULT_VALUE = "any";

const filterFields = {
    parking: {
        name: "parking",
        title: "Parking",
        type: FILTER_FIELD_BOOLEAN,
    },
    restroom: {
        name: "restroom",
        title: "Restroom",
        type: FILTER_FIELD_BOOLEAN,
    },
    trail: {
        name: "trail",
        title: "Trail",
        type: FILTER_FIELD_BOOLEAN,
    },
    water: {
        name: "water",
        title: "Water",
        type: FILTER_FIELD_BOOLEAN,
    },
    sand: {
        name: "sand",
        title: "Sand pit",
        type: FILTER_FIELD_BOOLEAN,
    },
    sp_needs_swings: {
        name: "sp_needs_swings",
        title: "Special needs swings",
        type: FILTER_FIELD_BOOLEAN,
    },
    surface: {
        name: "surface",
        title: "Surface",
        type: FILTER_FIELD_RADIO,
        values: [
            { title: "Any", value: RADIO_DEFAULT_VALUE },
            { title: "Rubber", value: "rubber" },
            { title: "Gravel", value: "gravel" },
            { title: "Mulch", value: "mulch" },
        ],
    },
    structure: {
        name: "structure",
        title: "Structure for",
        type: FILTER_FIELD_MULTI_CHECKBOX,
        values: [
            { title: "Smaller kids", value: "small" },
            { title: "Bigger kids", value: "big" },
        ],
    },
};

export {
    filterFields,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
};
