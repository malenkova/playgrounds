import {
    GiTrail,
    GiSpade,
    GiWaterSplash,
    GiStoneStack,
    GiTreeBranch,
    GiPuzzle,
} from "react-icons/gi";
import { FaRestroom, FaParking, FaBaby, FaChild } from "react-icons/fa";
import { BsWater } from "react-icons/bs";
import { TbDisabled } from "react-icons/tb";

const FILTER_FIELD_BOOLEAN = "boolean";
const FILTER_FIELD_MULTI_CHECKBOX = "multi-checkbox";
const FILTER_FIELD_RADIO = "radio";
const RADIO_DEFAULT_VALUE = "any";

const filterBlueColor = "rgb(59 130 246)";
const filterBrownColor = "brown";
const filterOrangeColor = "orange";

const filterFields = {
    parking: {
        name: "parking",
        title: "Parking",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <FaParking />, color: filterBlueColor },
    },
    restroom: {
        name: "restroom",
        title: "Restroom",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <FaRestroom /> },
    },
    trail: {
        name: "trail",
        title: "Trail",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <GiTrail />, color: filterBrownColor },
    },
    water: {
        name: "water",
        title: "Water (lake, river)",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <BsWater />, color: filterBlueColor },
    },
    sand: {
        name: "sand",
        title: "Sand pit",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <GiSpade />, color: filterOrangeColor },
    },
    splash: {
        name: "splash",
        title: "Splash pad",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <GiWaterSplash />, color: filterBlueColor },
    },
    sp_needs_swings: {
        name: "sp_needs_swings",
        title: "Special swings",
        type: FILTER_FIELD_BOOLEAN,
        icon: { component: <TbDisabled /> },
    },
    surface: {
        name: "surface",
        title: "Surface",
        type: FILTER_FIELD_RADIO,
        values: [
            { title: "Any", name: RADIO_DEFAULT_VALUE, icon: {} },
            {
                title: "Rubber",
                name: "rubber",
                icon: { component: <GiPuzzle />, color: filterBlueColor },
            },
            {
                title: "Gravel",
                name: "gravel",
                icon: { component: <GiStoneStack /> },
            },
            {
                title: "Mulch",
                name: "mulch",
                icon: { component: <GiTreeBranch />, color: filterBrownColor },
            },
        ],
    },
    structure: {
        name: "structure",
        title: "Structure for",
        type: FILTER_FIELD_MULTI_CHECKBOX,
        values: [
            {
                title: "Smaller kids",
                name: "small",
                icon: { component: <FaBaby /> },
            },
            {
                title: "Bigger kids",
                name: "big",
                icon: { component: <FaChild /> },
            },
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

const filterKeys = [];
for (let field_name in filterFields) {
    if (!filterFields[field_name].values) filterKeys.push(field_name);
    else {
        filterFields[field_name].values.map((v) =>
            filterKeys.push(field_name + "_" + v.name)
        );
    }
}

// Build URL with query string for filter
const filterObjectToQueryString = (filter) => {
    const filterForQuery = {};
    for (let field_name in filter) {
        if (filter[field_name] === true) {
            filterForQuery[field_name] = 1;
        }
    }
    return new URLSearchParams(filterForQuery).toString();
};

// Build filter object from URL params
const queryStringToFilterObject = (query) => {
    const filter = {};
    for (let field in filterFields) {
        if (filterFields[field].type === FILTER_FIELD_RADIO) {
            filter[`${field}_${RADIO_DEFAULT_VALUE}`] = true;
        }
    }
    const searchParams = new URLSearchParams(query);
    for (const [name, value] of searchParams.entries()) {
        if (filterKeys.includes(name) && value === "1") {
            filter[name] = true;
        }
    }
    return filter;
};

export {
    filterFields,
    filterGroups,
    filterKeys,
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    RADIO_DEFAULT_VALUE,
    filterObjectToQueryString,
    queryStringToFilterObject,
};
