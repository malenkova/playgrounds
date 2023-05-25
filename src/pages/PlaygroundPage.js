import { Link, useParams } from "react-router-dom";
import playgroundsList from "../data/playgrounds";
import NotFoundPage from "./NotFoundPage";
import Map from "../components/Map";
import PhotoGallery from "../components/PhotoGallery";
import { FeaturesListFull } from "../components/FeaturesList";
import { useEffect, useState } from "react";
import { getPhotos } from "../helpers/googleMap";
import { GoLinkExternal } from "react-icons/go";

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

    const onMapLoad = (map) => setMap(map);

    if (!playground) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{playground.name}</h1>
            <div className="flex flex-col md:flex-row">
                <div className="min-w-fit mr-4">
                    <div className="area">
                        <Link
                            target="_blank"
                            className="link"
                            title="Get directions"
                            to={`https://www.google.com/maps/dir//${encodeURIComponent(
                                playground.name + " " + playground.address
                            )}`}
                        >
                            {playground.address}&nbsp;
                            <GoLinkExternal
                                style={{ display: "inline", marginTop: "-3px" }}
                            />
                        </Link>
                        <Map
                            playgrounds={[playground]}
                            pageSize={1}
                            currentPage={1}
                            containerStyle={{
                                width: "100%",
                                height: "200px",
                                marginTop: "6px",
                            }}
                            maxZoom={14}
                            onMapLoad={onMapLoad}
                        />
                    </div>
                    <FeaturesListFull features={playground.filter} />
                </div>
                <div className="w-full">
                    {playground.photos && playground.photos.length && (
                        <PhotoGallery photos={playground.photos} />
                    )}
                </div>
            </div>
        </>
    );
};

export default PlaygroundPage;
