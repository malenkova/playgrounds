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
            parking: true,
            restroom: true,
            trail: true,
            water: true,
            sand: false,
            sp_needs_swings: true,
            surface: ["rubber"],
            structure: ["small", "big"],
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
            parking: true,
            restroom: true,
            trail: true,
            water: false,
            sand: true,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small", "big"],
        },
        show: false,
    },
];

export default playgroundsList;
