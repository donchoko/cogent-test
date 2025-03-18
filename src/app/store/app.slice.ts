import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../types/places";

interface mainState {
    places: Place[];
}

const initialState: mainState = {
    places: [],
};

const appSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<Place[]>) => {
            state.places = action.payload;
        },
    },
});

export const { setPlaces } = appSlice.actions;
export default appSlice.reducer;
