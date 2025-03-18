import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app.slice";
import { Place } from "../types/places";

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export const makeStore = (places?: Place[]) => {
    return configureStore({
        reducer: {
            app: appReducer,
        },
        preloadedState: {
            app: {
                places: places || [],
            },
        },
    });
};

// Types for Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
