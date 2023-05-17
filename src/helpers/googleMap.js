const getPhotos = (googlePlaceId, map, limit = -1) => {
    return new Promise(function (resolve, reject) {
        if (!map || !googlePlaceId) return null;
        const request = {
            placeId: googlePlaceId,
            fields: ["photos"],
        };
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                place &&
                place.photos
            ) {
                if (limit > 0) place.photos = place.photos.slice(0, limit);
                resolve(place.photos);
            } else {
                reject([]);
            }
        });
    });
};

export { getPhotos };
