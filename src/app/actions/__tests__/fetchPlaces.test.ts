import { Place } from "@/app/types/places";
import { fetchPlaces, searchPlaces } from "../fetchPlaces";
import { SEARCH_DEFAULTS } from "../searchDefaults";
import { SortType } from "@/app/types/search";

const mockSearchDefaults = {
    ll: 35.6646782 + "," + 139.7352395,
    radius: "1000",
    categories: "4d4b7105d754a06374d81259",
    fields: "name,description,fsq_id,tips,geocodes,location,link,categories,distance,closed_bucket,description,tel,email,social_media,hours,hours_popular,price,photos,rating,website",
    sort: "DISTANCE",
    limit: "50",
};

jest.mock("../searchDefaults", () => () => mockSearchDefaults);

jest.mock("../../lib/utils", () => ({
    getRandom: jest.fn((results: Place[]) => results.slice(0, 5)),
}));

global.fetch = jest.fn();

describe("fetchPlaces", () => {
    const mockApiKey = "mock-api-key";
    const mockResponse = {
        results: [
            { id: "1", name: "Place 1" },
            { id: "2", name: "Place 2" },
        ],
    };

    beforeEach(() => {
        process.env.FOURSQUARE_API_KEY = mockApiKey;
        (fetch as jest.Mock).mockClear();
    });

    it("should fetch places successfully", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const places = await fetchPlaces();

        expect(fetch).toHaveBeenCalledWith(
            `https://api.foursquare.com/v3/places/search?${new URLSearchParams(
                SEARCH_DEFAULTS
            ).toString()}`,
            {
                headers: {
                    Authorization: mockApiKey,
                    Accept: "application/json",
                },
            }
        );
        expect(places).toEqual(mockResponse.results.slice(0, 5));
    });

    it("should throw an error if the fetch fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchPlaces()).rejects.toThrow("Failed to fetch places");
    });

    it("should return an empty array if no results are found", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ results: [] }),
        });

        const places = await fetchPlaces();

        expect(places).toEqual([]);
    });
});

describe("searchPlaces", () => {
    const mockApiKey = "mock-api-key";
    const mockResponse = {
        results: [
            { id: "1", name: "Place 1" },
            { id: "2", name: "Place 2" },
        ],
    };

    beforeEach(() => {
        process.env.FOURSQUARE_API_KEY = mockApiKey;
        (fetch as jest.Mock).mockClear();
    });

    it("should search places successfully with a keyword", async () => {
        const keyword = "coffee";
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const places = await searchPlaces(keyword, SortType.Name);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.foursquare.com/v3/places/search?${new URLSearchParams({
                ...SEARCH_DEFAULTS,
                query: keyword,
            }).toString()}`,
            {
                headers: {
                    Authorization: mockApiKey,
                    Accept: "application/json",
                },
            }
        );
        expect(places).toEqual(mockResponse.results);
    });

    it("should throw an error if the fetch fails", async () => {
        const keyword = "coffee";
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(searchPlaces(keyword, SortType.Name)).rejects.toThrow(
            "Failed to fetch places"
        );
    });

    it("should return an empty array if no results are found", async () => {
        const keyword = "coffee";
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ results: [] }),
        });

        const places = await searchPlaces(keyword, SortType.Name);

        expect(places).toEqual([]);
    });
});
