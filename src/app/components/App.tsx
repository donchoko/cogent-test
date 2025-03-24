"use client";
import logo from "../logo.png";
import { AppShell, Container, Drawer, Flex, Image } from "@mantine/core";
import { useState } from "react";
import CardList from "./CardList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import SearchField from "./SearchField";
import { searchPlaces, fetchPlaces } from "../actions/fetchPlaces";
import { setPlaces } from "../store/app.slice";
import LocationMap from "./LocationMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import { MapMarkerData } from "../types/maps";
import { SortType } from "../types/search";
import { useDisclosure } from "@mantine/hooks";
import BurgerMenu from "./BurgerMenu";
import SortOptions from "./SortOptions";

const App = ({ mapsKey }: { mapsKey: string }) => {
    const places = useSelector((state: RootState) => state.app.places);
    const [lastSearch, setLastSearch] = useState<string>("");
    const [sort, setSort] = useState<SortType>(SortType.Rating);
    const [isMapDrawerOpen, setIsMapDrawerOpen] = useState<boolean>(false);
    const [opened, { toggle }] = useDisclosure();
    const [selectedLocationData, setSelectLocationData] =
        useState<MapMarkerData>();
    const dispatch = useDispatch();
    const handleSearchPlaces = async (searchValue: string) => {
        if (
            searchValue &&
            searchValue.length > 0 &&
            lastSearch !== searchValue
        ) {
            const places = await searchPlaces(searchValue, sort);
            dispatch(setPlaces(places));
            setLastSearch(searchValue);
        }

        if (searchValue.length == 0 && lastSearch !== searchValue) {
            const places = await fetchPlaces();
            dispatch(setPlaces(places));
            setLastSearch(searchValue);
        }
    };

    const closeMapDrawer = () => setIsMapDrawerOpen(false);
    const openMapDrawer = () => setIsMapDrawerOpen(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: { xs: 100, sm: 0 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header style={{ alignContent: "center" }}>
                <Flex
                    align="center"
                    justify="space-between"
                    style={{ margin: 10 }}
                >
                    <Flex
                        style={{ width: 300 }}
                        justify="space-evenly"
                        align="center"
                    >
                        <Image alt="logo" src={logo.src} />
                    </Flex>
                    <Flex gap="5rem">
                        <BurgerMenu opened={opened} toggle={toggle} />
                        <SortOptions sort={sort} visibleFrom="sm" setSort={setSort} />
                        <SearchField
                            visibleFrom="sm"
                            onSearch={handleSearchPlaces}
                        />
                    </Flex>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar hiddenFrom="sm">
                <SearchField
                    onSearch={handleSearchPlaces}
                    width="80%"
                />
                <SortOptions sort={sort} setSort={setSort} width="100%" />
            </AppShell.Navbar>

            <AppShell.Main style={{ width: "100%" }}>
                <Container fluid style={{ padding: "0" }}>
                    <CardList
                        places={places}
                        openMapDrawer={openMapDrawer}
                        setSelectedMarkerData={setSelectLocationData}
                    />
                </Container>
                <APIProvider apiKey={mapsKey}>
                    <Drawer
                        opened={isMapDrawerOpen}
                        position="bottom"
                        offset={10}
                        size="60vh"
                        onClose={closeMapDrawer}
                    >
                        <LocationMap location={selectedLocationData} />
                    </Drawer>
                </APIProvider>
            </AppShell.Main>
        </AppShell>
    );
};

export default App;
