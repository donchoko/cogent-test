"use server";

import { Place } from "../types/places";
import { SEARCH_DEFAULTS } from "./searchDefaults";
import { getRandom } from "../lib/utils";
import { SortType } from "../types/search";

export async function fetchPlaces(): Promise<Place[]> {
    const apiKey = process.env.FOURSQUARE_API_KEY as string;

    const params = new URLSearchParams({
        ...SEARCH_DEFAULTS,
    });
    const url = `https://api.foursquare.com/v3/places/search?${params.toString()}`;

    const response = await fetch(url, {
        headers: {
            Authorization: apiKey,
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }

    const data = await response.json();

    return data?.results ? getRandom(data.results) : [];
}

export async function searchPlaces(
    keyword: string,
    sorting: SortType
): Promise<Place[]> {
    const apiKey = process.env.FOURSQUARE_API_KEY as string;

    const params = new URLSearchParams({
        ...SEARCH_DEFAULTS,
        query: keyword,
    });
    const url = `https://api.foursquare.com/v3/places/search?${params.toString()}`;

    const response = await fetch(url, {
        headers: {
            Authorization: apiKey,
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }

    let data = (await response.json()).results;
    console.log(data);
    switch (sorting) {
        case SortType.Name:
            data = data?.sort((a: Place, b: Place) => b?.name < a?.name ? 1 : -1);
            break;
        case SortType.Rating:
            data = data?.sort((a: Place, b: Place) => (b?.rating ?? 0) > (a?.rating ?? 0) ? 1 : -1);
            break;
        default:
            data = data?.sort((a: Place, b: Place) => b?.name < a?.name ? 1 : -1);
            break;
    }

    return data ?? [];
}
