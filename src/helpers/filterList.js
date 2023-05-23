export const filterList = (playgroundsList, filter) => {
    if (filter === null) return playgroundsList;

    return playgroundsList.filter((place) => {
        for (let field_name in filter) {
            if (
                field_name in place.filter &&
                filter[field_name] === true &&
                place.filter[field_name] !== true
            ) {
                return false;
            }
        }
        return true;
    });
};
