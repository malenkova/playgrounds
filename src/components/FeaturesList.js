import {
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    filterFields,
    filterGroups,
} from "../helpers/filterFields";

const FeaturesList = ({ features }) => {
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
                        "title": "smaller kids"
                    },
                    {
                        "title": "bigger kids"
                    }
                ]
            },
            {
                "type": "radio",
                "name": "surface",
                "title": "Surface",
                "items": [
                    {
                        "title": "mulch"
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
                "title": "Parking"
            },
            {
                "type": "boolean",
                "name": "restroom",
                "title": "Restroom"
            },
            {
                "type": "boolean",
                "name": "sand",
                "title": "Sand pit"
            }
        ]
    },
    {
        "title": "Nature",
        "display": true,
        "items": [
            {
                "type": "boolean",
                "name": "trail",
                "title": "Trail"
            }
        ]
    }
]
    */

    let groups = [];
    Object.values(filterGroups).map((group) => {
        let newGroup = { title: group.title, display: false, items: [] };
        group.items.map((field_name) => {
            const field = filterFields[field_name];
            if (
                field.type === FILTER_FIELD_MULTI_CHECKBOX ||
                field.type === FILTER_FIELD_RADIO
            ) {
                let multiParams = [];
                Object.keys(features).map((f_name) => {
                    if (
                        f_name.substring(0, field_name.length) === field_name &&
                        features[f_name] === true
                    ) {
                        newGroup.display = true;
                        multiParams.push({
                            title: field.values
                                .find(
                                    (x) =>
                                        x.name ===
                                        f_name.substring(field_name.length + 1)
                                )
                                .title.toLowerCase(),
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
                    });
                }
            }
        });
        if (newGroup.display === true) groups.push(newGroup);
    });

    return (
        <div className="flex area">
            {groups.map((group, i) => {
                if (!group.display) return null;
                const style =
                    i < groups.length - 1
                        ? "w-1/3 mr-3 border border-r border-l-0 border-t-0 border-b-0"
                        : "w-1/3";
                return (
                    <div className={style} key={group.title}>
                        <h3>{group.title}</h3>
                        {group.items.map((field) => {
                            if (field.type == FILTER_FIELD_BOOLEAN) {
                                return <p key={field.title}>{field.title}</p>;
                            } else if (
                                field.type === FILTER_FIELD_RADIO ||
                                field.type === FILTER_FIELD_MULTI_CHECKBOX
                            ) {
                                return (
                                    <p key={field.title}>
                                        <span className="font-semibold">
                                            {field.title}:&nbsp;
                                        </span>
                                        {field.items
                                            .map((v) => v.title)
                                            .join(", ")}
                                    </p>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default FeaturesList;
