export const accessToken = "pk.eyJ1IjoiYXd6aGFuZyIsImEiOiJjbGdhZzFzYmwwMGNuM2xxZnUxbmRhYmp2In0.NrQ0ntJG2js320eduAOkdA";

export const geoData = [
    {
      name: 'Honduras',
      description: 'Meet Soledad Castillo, a Honduras native who undertook a long and difficult journey to cross the United State’s border without documentation out of desperation and hope for a better life, escaping the physical and sexual abuse, medical malpractice, and abandonment she faced at home in Tegucigalpa, Honduras.',
      coordinates: [-87.2040447848108, 14.101140777424902]
    },
    {
        name: 'Guatemala',
        description: 'The first leg of her journey was a bus ride to Guatemala. During this bus ride, she was assaulted and robbed by gangsters. Assault and robbery is sadly a faced by many migrants. In fact, an estimated 11.3% of migrants from Honduras are assaulted or robbed while illegally migrating to the United States.',
        coordinates: [-90.38999088481194, 15.604394640594833]
    },
    {
        name: 'Mexico',
        description: 'Next, she took van after van to get to Mexico. During the trip, she was crammed into hidden spaces, left with no food and difficulty breathing. All of this suffering happened because she had to migrate illegally, leaving her journey in the hands of coyotes, or migrant smugglers.',
        coordinates: [-102.56264168750192, 24.02861450641076]
    },
    {
        name: 'Texas',
        description: 'For the next part of the journey, she walked. She walked for 7 hours through a scorching desert, briefly finding shelter in a ranch house. The walking seemed to be endless—she walked for three days straight. Some people even died. Finally, after an exhausting journey, they made it across the border.',
        coordinates: [-98.97333902989601, 31.313912784675594]
    },
    {
        name: 'California',
        description: 'Now inside of the United States, she was almost at her final destination. She took a van from Texas to California to Sacramento, where her father had migrated previously. However, her life wouldn\'t get easy so soon. For a few years, she worked 18 hours a day to pay off her debt. But fast forward to present day, and she\'s thriving as she gives back to struggling youth after obtaining a college degree.',
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