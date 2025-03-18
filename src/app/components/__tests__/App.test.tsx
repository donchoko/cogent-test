import React from "react";
import App from "../App";
import { placesApiResponse } from "@/app/lib/mockResponses";
import { renderWithProviders } from "@/app/lib/utilsTest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe("App Component", () => {
    const mapsKey = "test-maps-key";

    it("renders the App component without crashing", () => {
        renderWithProviders(<App mapsKey={mapsKey} />, {}, placesApiResponse);
        expect(screen.getByAltText("logo")).toBeInTheDocument();
    });
});
