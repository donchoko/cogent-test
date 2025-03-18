import { COGENT_LAB_LOCATION } from "../lib/utils";

export const SEARCH_DEFAULTS = {
    ll: COGENT_LAB_LOCATION.lat + "," + COGENT_LAB_LOCATION.lng,
    radius: "1000",
    categories: "4d4b7105d754a06374d81259",
    fields: "name,description,fsq_id,tips,geocodes,location,link,categories,distance,closed_bucket,description,tel,email,social_media,hours,hours_popular,price,photos,rating,website",
    sort: "DISTANCE",
    limit: "50",
};
