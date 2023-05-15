export const accessToken = "pk.eyJ1IjoiYXd6aGFuZyIsImEiOiJjbGdhZzFzYmwwMGNuM2xxZnUxbmRhYmp2In0.NrQ0ntJG2js320eduAOkdA";

export const geoData = [
    {
      name: 'Honduras',
      description: 'Meet Soledad Castillo, a resident of San Francisco, California who plays an important role in her community as a housing case manager for homeless youth. She’s thriving in the present, but hidden in the past are many years of struggle. Soledad was born in Tegucigalpa, Honduras, and her life there was full of physical and sexual abuse, medical malpractice, and abandonment. Her own mother sent her to be a servant for her stepfather’s relatives, and when she was incorrectly diagnosed with lupus, her medication nearly killed her. Every night, she wished, \n\n“I don’t want to wake up tomorrow. I don’t want to wake up”. Fortunately she recovered, but driven by desperation, she undertook a long and difficult journey to cross the United State’s border without documentation in hopes of a better life. She details her illegal migration journey to the United States in the book Solito, Solita, and today, we’ll follow her along on this journey.',
      coordinates: [-87.2040447848108, 14.101140777424902]
    },
    {
        name: 'Guatemala',
        description: 'Flying from Tegucigalpa to San Francisco only takes 10 hours, but since Soledad, like many other migrants, failed to obtain proper documentation, she embarked on an illegal migration journey that took over a month to get to the United States. The first leg of her journey was a bus ride to Guatemala. During this bus ride, she was assaulted and robbed by gangsters. Assault and robbery is sadly a faced by many migrants. In fact, an estimated 11.3% of migrants from Honduras are assaulted or robbed while illegally migrating to the United States.',
        coordinates: [-90.38999088481194, 15.604394640594833]
    },
    {
        name: 'Mexico',
        description: 'To get to Mexico, Soledad found herself crammed into van after van. She was forced to lie in hidden spaces, sandwiched between other people and squished to the point she could barely breath. On top of that, she had no food for this whole part of the journey. All of this suffering happened because she had to migrate illegally, leaving her journey in the hands of coyotes, or migrant smugglers.',
        coordinates: [-102.56264168750192, 24.02861450641076]
    },
    {
        name: 'Texas',
        description: 'For the next part of the journey, she walked for what seemed like an eternity. Through the scorchingly hot desert, she walked. She walked and walked, first for seven hours, and then for another three days. She watched as the coyotes—the very people that she and the other migrants paid to transport them safely—abandoned an Asian girl to die. Soledad herself became too weak to continue, only finding the energy to finish the journey by buying a pill from the coyotes. Eventually, after an exhausting journey, they made it across the border into the United States.',
        coordinates: [-98.97333902989601, 31.313912784675594]
    },
    {
        name: 'California',
        description: 'Now inside of the United States, she was almost at her final destination. She took a van from Texas to California to Sacramento, where her father had migrated previously. However, her life wouldn\'t get easy so soon. For a few years, she worked tirelessly, frequently working for 18 hours a day to pay off her debt. But fast forward to present day, and she\'s thriving. She successfully obtained a college degree, and now, she gives back to struggling youth and actively brings awareness to human rights, hoping to help those facing the similar problems as she did.',
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