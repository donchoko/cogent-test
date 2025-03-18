"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from ".";
import { Place } from "../types/places";

export default function StoreProvider({
    children,
    places,
}: {
    children: React.ReactNode;
    places: Place[];
}) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore(places);
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
