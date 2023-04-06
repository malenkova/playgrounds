const playgroundsList = [
    {
        id: "19",
        name: "Lakeline Park",
        address: "1510 Alexis Dr, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.48782,
                lng: -97.81332,
            },
        },
        filter: {
            trail: true,
            water: true,
            surface: "rubber",
            sand: false,
        },
        show: false,
    },
    {
        id: "20",
        name: "Milburn Park",
        address: "1901 Sun Chase Blvd, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.478901,
                lng: -97.840759,
            },
        },
        filter: {
            trail: true,
            water: false,
            surface: "mulch",
            sand: true,
        },
        show: false,
    },
];

export default playgroundsList;
