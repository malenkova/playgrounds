import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

const PhotoGallery = ({ photos }) => {
    const [index, setIndex] = useState(-1);
    const gallery_photos = gallery(photos);

    return (
        <>
            <PhotoAlbum
                photos={gallery_photos}
                layout="columns"
                onClick={({ index }) => setIndex(index)}
            />
            {
                <Lightbox
                    slides={gallery_photos}
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    // enable optional lightbox plugins
                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                />
            }
        </>
    );
};

const gallery = (photos) => {
    return photos.map((photo) => {
        const width = breakpoints[0];
        const height = (photo.height / photo.width) * width;

        return {
            src:
                photo.src ??
                photo.getUrl({ maxHeight: height, maxWidth: width }),
            width,
            height,
            srcSet: breakpoints.map((breakpoint) => {
                const height = Math.round(
                    (photo.height / photo.width) * breakpoint
                );
                return {
                    src:
                        photo.src_thumbnail ??
                        photo.getUrl({
                            maxHeight: height,
                            maxWidth: breakpoint,
                        }),
                    width: breakpoint,
                    height,
                };
            }),
        };
    });
};

export default PhotoGallery;
