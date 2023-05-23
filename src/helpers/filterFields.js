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
        title: "Water (lake, river)",
        type: FILTER_FIELD_BOOLEAN,
    },
    sand: {
        name: "sand",
        title: "Sand pit",
        type: FILTER_FIELD_BOOLEAN,
    },
    splash: {
        name: "splash",
        title: "Splash pad",
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
            { title: "Any", name: RADIO_DEFAULT_VALUE },
            { title: "Rubber", name: "rubber" },
            { title: "Gravel", name: "gravel" },
            { title: "Mulch", name: "mulch" },
        ],
    },
    structure: {
        name: "structure",
        title: "Structure for",
        type: FILTER_FIELD_MULTI_CHECKBOX,
        values: [
            { title: "Smaller kids", name: "small" },
            { title: "Bigger kids", name: "big" },
        ],
    },
};

const filterGroups = {
    playground: {
        title: "Playground",
        items: ["sp_needs_swings", "structure", "surface"],
    },
    amenities: {
        title: "Amenities",
        items: ["parking", "restroom", "sand", "splash"],
    },
    nature: {
        title: "Nature",
        items: ["trail", "water"],
    },
};

export {
    filterFields,
    filterGroups,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
};
