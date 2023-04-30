export const accessToken = "pk.eyJ1IjoiYXd6aGFuZyIsImEiOiJjbGdhZzFzYmwwMGNuM2xxZnUxbmRhYmp2In0.NrQ0ntJG2js320eduAOkdA";

export const geoData = [
    {
      name: 'Honduras',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      coordinates: [-87.2040447848108, 14.101140777424902]
    },
    {
        name: 'Guatemala',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coordinates: [-90.38999088481194, 15.604394640594833]
    },
    {
        name: 'Mexico',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coordinates: [-102.56264168750192, 24.02861450641076]
    },
    {
        name: 'Texas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coordinates: [-98.97333902989601, 31.313912784675594]
    },
    {
        name: 'California',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coordinates: [-121.49502179257237, 38.58978634596377]
    }
];

var countryData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Honduras" },
        geometry: {
          coordinates: [-87.2040447848108, 14.101140777424902],
          type: "Point",
        },
        id: 0,
      },
      {
        type: "Feature",
        properties: { name: "Guatemala" },
        geometry: {
          coordinates: [-90.38999088481194, 15.604394640594833],
          type: "Point",
        },
        id: 1,
      },
      {
        type: "Feature",
        properties: { name: "Mexico" },
        geometry: {
          coordinates: [-102.56264168750192, 24.02861450641076],
          type: "Point",
        },
        id: 2,
      },
      {
        type: "Feature",
        properties: { name: "Texas" },
        geometry: {
          coordinates: [-98.97333902989601, 31.313912784675594],
          type: "Point",
        },
        id: 3,
      },
      {
        type: "Feature",
        properties: { name: "California" },
        geometry: {
          coordinates: [-121.49502179257237, 38.58978634596377],
          type: "Point",
        },
        id: 4,
      },
    ],
  };