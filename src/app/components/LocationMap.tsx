import React from "react";
import { Flex } from "@mantine/core";
import { COGENT_LAB_LOCATION } from "../lib/utils";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { MapMarkerData } from "../types/maps";
import { IconHome } from '@tabler/icons-react'

const center = {
    lat: COGENT_LAB_LOCATION.lat,
    lng: COGENT_LAB_LOCATION.lng,
};

const ZOOM_LEVEL_5KM = 14;

type LocationMapProps = {
    location?: MapMarkerData;
};

const LocationMap = ({ location }: LocationMapProps) => {
    return (
        <Flex w="100%" h="100%" justify="center">
            <Map
                mapId="place-maps"
                defaultCenter={center}
                defaultZoom={ZOOM_LEVEL_5KM}
                style={{ width: "100%", height: "50vh" }}
            >
                m
                <AdvancedMarker position={center} title="Cogent Lab">
                    <Pin
                        background={"#22ccff"}
                        borderColor={"#1e89a1"}
                        glyphColor={"#0f677a"}
                    >
                        <IconHome />
                    </Pin>
                </AdvancedMarker>
                {location && (
                    <AdvancedMarker title={location.name} position={location} />
                )}
            </Map>
        </Flex>
    );
};

export default LocationMap;
