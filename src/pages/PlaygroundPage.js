import { Link, useParams } from "react-router-dom";
import playgroundsList from "../data/playgrounds";
import NotFoundPage from "./NotFoundPage";
import Map from "../components/Map";
import PhotoGallery from "../components/PhotoGallery";
import {
    FILTER_FIELD_BOOLEAN,
    FILTER_FIELD_MULTI_CHECKBOX,
    FILTER_FIELD_RADIO,
    filterFields,
} from "../components/filterFields";
import { useEffect, useState } from "react";

const PlaygroundPage = () => {
    const { playgroundId } = useParams();
    const [playground, setPlayground] = useState(
        playgroundsList.find((a) => a.id === playgroundId)
    );
    const [map, setMap] = useState(null);

    useEffect(() => {
        async function updatePlayground() {
            let newPlayground = playgroundsList.find(
                (a) => a.id === playgroundId
            );
            const photos = await getPhotos(newPlayground.googlePlaceId, map);
            setPlayground({ ...newPlayground, photos: photos });
        }
        if (map) updatePlayground();
    }, [playgroundId, map]);

    const getPhotos = (googlePlaceId, map) => {
        return new Promise(function (resolve, reject) {
            if (!map || !googlePlaceId) return null;
            const request = {
                placeId: googlePlaceId,
                fields: ["photos"],
            };
            const service = new window.google.maps.places.PlacesService(map);
            service.getDetails(request, (place, status) => {
                if (
                    status ===
                        window.google.maps.places.PlacesServiceStatus.OK &&
                    place &&
                    place.photos
                ) {
                    resolve(place.photos);
                } else {
                    reject([]);
                }
            });
        });
    };

    const onMapLoad = (map) => setMap(map);

    if (!playground) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{playground.name}</h1>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                    <Link
                        target="_blank"
                        to={`https://www.google.com/maps/dir//${encodeURIComponent(
                            playground.name + " " + playground.address
                        )}`}
                    >
                        <button className="button md:float-right mb-2">
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
                        onMapLoad={onMapLoad}
                    />
                </div>
                <div className="w-full md:w-2/3 px-6 pt-7">
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
                            default:
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

            <div className="my-6">
                {playground.photos && playground.photos.length && (
                    <PhotoGallery photos={playground.photos} />
                )}
            </div>
        </>
    );
};

export default PlaygroundPage;
