
import { MantineProvider } from "@mantine/core";
import { fetchPlaces } from "./actions/fetchPlaces";
import App from "./components/App";
import Provider from "./store/provider";
import { Place } from "./types/places";
import { getGoogleMapsKey } from "./actions/fetchMaps";

export default async function Page() {
    let places: Place[] = [];
    try {
        places = await fetchPlaces();
    } catch (error) {
        console.error(error);
    }
    const mapsKey = await getGoogleMapsKey();
    return (
        <Provider places={places}>
            <MantineProvider defaultColorScheme="auto">
              <App mapsKey={mapsKey} />
            </MantineProvider>
        </Provider>
    );
}
