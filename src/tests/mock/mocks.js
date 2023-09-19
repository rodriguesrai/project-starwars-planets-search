import { rest } from 'msw';

export const handlers = [
  rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: 'Tatooine',
            climate: 'Arid',
            diameter: '10465',
            gravity: '1 Standard',
            orbital_period: '304',
            population: '200000',
            rotation_period: '23.5',
            surface_water: '1',
            terrain: 'Desert',
            films: ['https://swapi.dev/api/films/1/'],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T20:58:18.411000Z',
            url: 'https://swapi.dev/api/planets/1/'
          }
        ]
      })
    );
  }),
];
