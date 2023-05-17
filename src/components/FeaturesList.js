import {
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    filterFields,
} from "../helpers/filterFields";

const FeaturesList = ({ features }) => {
    let featuresString = [];
    Object.values(filterFields).map((field) => {
        let field_value = null;
        switch (field.type) {
            case FILTER_FIELD_BOOLEAN:
                field_value = features[field.name] ? "Yes" : "No";
                break;
            case FILTER_FIELD_MULTI_CHECKBOX:
            case FILTER_FIELD_RADIO:
                field_value = features[field.name]
                    .map((v) => field.values.find((x) => x.value === v).title)
                    .join(", ");
                break;
            default:
                break;
        }

        featuresString.push(
            field_value ? (
                <p key={field.name}>
                    <strong>{field.title}: </strong>
                    {field_value}
                </p>
            ) : (
                ""
            )
        );
    });

    return featuresString;
};

export default FeaturesList;
