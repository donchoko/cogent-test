import React, { Suspense, useState } from "react";
import { Place, Review } from "../types/places";
import PlaceCard from "./PlaceCard";
import { Flex, Stack } from "@mantine/core";
import ReviewsDialog from "./ReviewsDialog";
import { MapMarkerData } from "../types/maps";

interface CardListProps {
    places: Place[];
    setSelectedMarkerData: (data: MapMarkerData) => void;
    openMapDrawer: () => void;
}

const CardList = ({
    places,
    openMapDrawer,
    setSelectedMarkerData,
}: CardListProps) => {
    const [reviewsOpen, setReviewsOpen] = useState<boolean>(false);
    const [selectedReviews, setSelectedReviews] = useState<Review[] | null>(
        null
    );

    const openReviews = () => setReviewsOpen(true);
    return (
        <>
            <Flex justify={"center"}>
                <Suspense>
                    {places && places.length > 0 && (
                        <Stack
                            bg="var(--mantine-color-body)"
                            align="center"
                            gap="lg"
                            w="100%"
                            style={{ margin: "30px" }}
                        >
                            {places.map((place) => (
                                <PlaceCard
                                    key={place.fsq_id}
                                    place={place}
                                    openReviews={openReviews}
                                    setSelectedReviews={setSelectedReviews}
                                    openMapDrawer={openMapDrawer}
                                    setSelectedMarkerData={
                                        setSelectedMarkerData
                                    }
                                />
                            ))}
                        </Stack>
                    )}
                </Suspense>
            </Flex>
            {selectedReviews && selectedReviews.length > 0 && (
                <ReviewsDialog
                    selectedReviews={selectedReviews}
                    open={reviewsOpen}
                    setIsOpen={setReviewsOpen}
                />
            )}
        </>
    );
};

export default CardList;
