import React from "react";
import {
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    filterFields,
    filterGroups,
} from "../helpers/filterFields";
import FilterIcon from "./FilterIcon";

const getFeaturesByGroups = (features) => {
    /*
    Groups is a structure like this:
    [
    {
        "title": "Playground",
        "display": true,
        "items": [
            {
                "type": "multi-checkbox",
                "name": "structure",
                "title": "Structure for",
                "items": [
                    {
                        "title": "smaller kids",
                        "icon" : {component: <GiPuzzle />, color: "blue"}
                    },
                    {
                        "title": "bigger kids",
                        "icon" : {component: <GiPuzzle />, color: "blue"}
                    }
                ]
            },
            {
                "type": "radio",
                "name": "surface",
                "title": "Surface",
                "items": [
                    {
                        "title": "mulch",
                        "icon" : {component: <GiPuzzle />, color: "blue"}
                    }
                ]
            }
        ]
    },
    {
        "title": "Amenities",
        "display": true,
        "items": [
            {
                "type": "boolean",
                "name": "parking",
                "title": "Parking",
                "icon" : {component: <GiPuzzle />, color: "blue"}
            },
        ]
    },
]
    */

    let groups = [];
    Object.values(filterGroups).forEach((group) => {
        let newGroup = { title: group.title, display: false, items: [] };
        group.items.forEach((field_name) => {
            const field = filterFields[field_name];
            if (
                field.type === FILTER_FIELD_MULTI_CHECKBOX ||
                field.type === FILTER_FIELD_RADIO
            ) {
                let multiParams = [];
                Object.keys(features).forEach((f_name) => {
                    if (
                        f_name.substring(0, field_name.length) === field_name &&
                        features[f_name] === true
                    ) {
                        newGroup.display = true;
                        let value = field.values.find(
                            (x) =>
                                x.name ===
                                f_name.substring(field_name.length + 1)
                        );
                        multiParams.push({
                            title: value.title.toLowerCase(),
                            icon: value.icon,
                        });
                    }
                });
                newGroup.items.push({
                    type: field.type,
                    name: field_name,
                    title: filterFields[field_name].title,
                    items: multiParams,
                });
            } else {
                if (features[field_name] === true) {
                    newGroup.display = true;
                    newGroup.items.push({
                        type: field.type,
                        name: field_name,
                        title: filterFields[field_name].title,
                        icon: field.icon,
                    });
                }
            }
        });
        if (newGroup.display === true) groups.push(newGroup);
    });
    return groups;
};

const FeaturesListShort = ({ features }) => {
    const groups = getFeaturesByGroups(features);
    return (
        <>
            {groups.map((group, i) => {
                if (!group.display) return null;
                return (
                    <React.Fragment key={group.title}>
                        {group.items.map((field) => {
                            if (field.type === FILTER_FIELD_BOOLEAN) {
                                return (
                                    <FilterIcon
                                        key={field.name}
                                        component={field.icon.component}
                                        color={field.icon.color}
                                        title={field.title}
                                    />
                                );
                            } else if (
                                field.type === FILTER_FIELD_RADIO ||
                                field.type === FILTER_FIELD_MULTI_CHECKBOX
                            ) {
                                return (
                                    <React.Fragment key={field.name}>
                                        {field.items.map((v) => (
                                            <FilterIcon
                                                key={v.title}
                                                component={v.icon.component}
                                                color={v.icon.color}
                                                title={
                                                    field.title + ": " + v.title
                                                }
                                            />
                                        ))}
                                    </React.Fragment>
                                );
                            } else return null;
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
};

const FeaturesListFull = ({ features }) => {
    const groups = getFeaturesByGroups(features);

    return (
        <>
            {groups.map((group, i) => {
                if (!group.display) return null;
                return (
                    <div key={group.title} className="area">
                        <h3>{group.title}</h3>
                        {group.items.map((field) => {
                            if (field.type === FILTER_FIELD_BOOLEAN) {
                                return (
                                    <p key={field.name} className="flex">
                                        <FilterIcon
                                            component={field.icon.component}
                                            color={field.icon.color}
                                            title={field.title}
                                        />
                                        {field.title}
                                    </p>
                                );
                            } else if (
                                field.type === FILTER_FIELD_RADIO ||
                                field.type === FILTER_FIELD_MULTI_CHECKBOX
                            ) {
                                return (
                                    <React.Fragment key={field.name}>
                                        {field.items.map((v) => (
                                            <p key={v.title} className="flex">
                                                <FilterIcon
                                                    component={v.icon.component}
                                                    color={v.icon.color}
                                                    title={
                                                        field.title +
                                                        ": " +
                                                        v.title
                                                    }
                                                />
                                                {field.title}:&nbsp;
                                                {v.title}
                                            </p>
                                        ))}
                                    </React.Fragment>
                                );
                            } else return null;
                        })}
                    </div>
                );
            })}
        </>
    );
};

export { FeaturesListFull, FeaturesListShort };
