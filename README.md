## Running the application (Docker)
```bash
docker-compose up
```
To run the file you require setting up following environment variables in an `.env` file:

```
FOURSQUARE_API_KEY="your-api-key"
GOOGLE_MAPS_API_KEY="your-api-key"
```

## Running the development server

First, run the development server:

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

## Use case

This applications provides a list of venues near the Cogent Labs offices. A list of restaurants is queries from the Foursquare Places API. When the page loads the first time it will pull 15 random restaurants from queries results. A list will be populated with cards showing the main information for each restaurant, on this version the available information is:

- Name
- Description
- Food types
- Rating
- Reviews
- Location
- Website
- Social media
- Open hours

Through each card a map can be accessed that will display the location for the venue and the location of the office for reference.

A search field is available that allows to search for keyword specific restaurants and sort them by name or rating.

## Tools

- TypeScript
- Next.js
- Mantine UI
- Redux
- Jest

## Issues

- The API calls are set on server side actions, but for future would be nice to have an API that could serve as a proxy for this calls and return pre-sorted results, sanitized data and cached, leaving the frontend only to display data.
- Ended up using redux to capture the list places, this probably could have been done passing the results from props but I think it's a much cleaner solution, specially when adding other functionality like search that would update this list.
- Didn't have time to finish writing more unit tests, I will try to add them in a few days just so this is completed but there's a lot that requires to be tested, specially the server side actions.
- I usually add some snapshot testing for consistency, Mantine caused some issue as it generates random IDs for inner elements for some components, this probably can be solved by a serializer but didn't have enough time to fix it.
- Styling some of the components more and adding a proper theme would be nice too.

## Improvements

As a list of possible improvements to this app:

- Caching for search results
- Improve markers displayed on map
- Search for venus directly on map, instead of render marker
- Switch Foursquare API for Google Places API
- Add pagination for search
- Save favorite places

Recently updated
- Fixed mobile view
- Swapped sort selector to use a radio group as it worked better than the previous selector from mantine
- Fixed component structure to a bit
- Added sidebar on mobile view to display search field and sorting


## Note

I also deployed this through vercel, and can be accessed on the following url: cogent-test.vercel.app
