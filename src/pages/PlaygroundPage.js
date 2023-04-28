import { Link, useParams } from "react-router-dom";
import playgroundsList from "../data/playgrounds";
import NotFoundPage from "./NotFoundPage";
import Map from "../components/Map";
import {
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    filterFields,
} from "../components/filterFields";

const PlaygroundPage = () => {
    const { playgroundId } = useParams();

    const playground = playgroundsList.find((a) => a.id === playgroundId);
    if (!playground) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{playground.name}</h1>
            <div className="flex flex-row">
                <div className="w-1/3">
                    <Link
                        target="_blank"
                        to={`https://www.google.com/maps/dir//${encodeURIComponent(
                            playground.name + " " + playground.address
                        )}`}
                    >
                        <button className="filter-button float-right mb-2">
                            Get directions
                        </button>
                    </Link>
                    <p className="pt-2">{playground.address}</p>
                    <Map
                        playgrounds={[playground]}
                        pageSize={1}
                        currentPage={1}
                        containerStyle={{ width: "100%", height: "250px" }}
                        maxZoom={14}
                    />
                </div>
                <div className="px-6 pt-7">
                    <h2>Features</h2>
                    {Object.values(filterFields).map((field) => {
                        let field_value = null;
                        switch (field.type) {
                            case FILTER_FIELD_BOOLEAN:
                                field_value = playground.filter[field.name]
                                    ? "Yes"
                                    : "No";
                                break;
                            case FILTER_FIELD_MULTI_CHECKBOX:
                            case FILTER_FIELD_RADIO:
                                field_value = playground.filter[field.name]
                                    .map(
                                        (v) =>
                                            field.values.find(
                                                (x) => x.value === v
                                            ).title
                                    )
                                    .join(", ");
                                break;
                        }
                        return field_value ? (
                            <p key={field.name}>
                                <strong>{field.title}: </strong>
                                {field_value}
                            </p>
                        ) : (
                            ""
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default PlaygroundPage;
