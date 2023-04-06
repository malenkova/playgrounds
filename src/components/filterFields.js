const FILTER_FIELD_BOOLEAN = "boolean";
const FILTER_FIELD_MULTI_CHECKBOX = "multi-checkbox";

const filterFields = {
    water: {
        name: "water",
        title: "Water",
        type: FILTER_FIELD_BOOLEAN,
    },
    trail: {
        name: "trail",
        title: "Trail",
        type: FILTER_FIELD_BOOLEAN,
    },
    surface: {
        name: "surface",
        title: "Surface",
        type: FILTER_FIELD_MULTI_CHECKBOX,
        values: [
            { title: "Rubber", value: "rubber" },
            { title: "Gravel", value: "gravel" },
            { title: "Mulch", value: "mulch" },
        ],
    },
};

export { filterFields, FILTER_FIELD_BOOLEAN, FILTER_FIELD_MULTI_CHECKBOX };
