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
    {
        id: "21",
        name: "Goldfinch Neighborhood",
        address: "2503 Goldfinch Dr, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.47227,
                lng: -97.82806,
            },
        },
        filter: {
            parking: false,
            restroom: false,
            trail: true,
            water: false,
            sand: false,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small", "big"],
        },
        show: false,
    },
    {
        id: "22",
        name: "Forest Oaks Park",
        address: "521 S Lynnwood Trail, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.50872,
                lng: -97.80406,
            },
        },
        filter: {
            parking: false,
            restroom: false,
            trail: true,
            water: false,
            sand: false,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small"],
        },
        show: false,
    },
    {
        id: "23",
        name: "Kay Redden Park",
        address: "Buttercup Creek Blvd, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.4929,
                lng: -97.8413,
            },
        },
        filter: {
            parking: true,
            restroom: false,
            trail: true,
            water: false,
            sand: false,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small", "big"],
        },
        show: false,
    },
    {
        id: "24",
        name: "Park Place Park",
        address: "101 Vale Dr, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.51408,
                lng: -97.82446,
            },
        },
        filter: {
            parking: false,
            restroom: false,
            trail: false,
            water: false,
            sand: true,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["big"],
        },
        show: false,
    },
    {
        id: "25",
        name: "Champion Park",
        address: "3830 Brushy Creek Rd, Cedar Park, TX 78613",
        geometry: {
            location: {
                lat: 30.50992577698729,
                lng: -97.75843230087638,
            },
        },
        filter: {
            parking: true,
            restroom: true,
            trail: true,
            water: true,
            sand: true,
            sp_needs_swings: false,
            surface: ["mulch"],
            structure: ["small"],
        },
        show: false,
    },
];

export default playgroundsList;
