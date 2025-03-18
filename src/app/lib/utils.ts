import { Place } from "../types/places";

const LIST_LENGTH = 15;

export const COGENT_LAB_LOCATION = {
    lat: 35.6646782,
    lng: 139.7352395,
};

export const getRandom = (places: Place[]) =>
    places
        .sort(() => Math.random() - 0.5)
        .slice(0, places.length > LIST_LENGTH ? LIST_LENGTH : places.length);
