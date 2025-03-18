import React from "react";
import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    Flex,
    Button,
    useMantineTheme,
} from "@mantine/core";
import { Place, Review } from "../types/places";
import { Carousel } from "@mantine/carousel";
import RatingStars from "./RatingStars";
import SocialMedia from "./SocialMedia";
import { MapMarkerData } from "../types/maps";
import { IconPhone } from "@tabler/icons-react";

interface CardProps {
    place: Place;
    openReviews: () => void;
    setSelectedReviews: (reviews: Review[]) => void;
    openMapDrawer: () => void;
    setSelectedMarkerData: (data: MapMarkerData) => void;
}

const IMAGES_HEIGHT_4_5 = 576;
const IMAGES_WIDTH_4_5 = 720;

const PlaceCard = ({
    place,
    openReviews,
    setSelectedReviews,
    openMapDrawer,
    setSelectedMarkerData,
}: CardProps) => {
    const theme = useMantineTheme();
    const getPhotoUrl = (
        prefix: string,
        suffix: string,
        width: number,
        height: number
    ) => `${prefix}${width}x${height}${suffix}`;

    const handleOpenReviews = () => {
        setSelectedReviews(place?.tips);
        openReviews();
    };

    const handleOpenMap = () => {
        setSelectedMarkerData({
            lat: place.geocodes.main.latitude,
            lng: place.geocodes.main.longitude,
            name: place.name,
        });
        openMapDrawer();
    };

    const isOpenColor = place.hours?.open_now ? "green" : "red";
    const isOpenText = place.hours?.open_now ? "Open" : "Closed";

    return (
        <Card
            shadow="xl"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: theme.colors.dark[5] }}
            w={{ base: "90%", md: "50%", lg: "50%" }}
        >
            <Card.Section>
                {place?.photos && place?.photos?.length > 0 && (
                    <Carousel
                        withIndicators
                        height="auto"
                        slideGap="xs"
                        align="start"
                    >
                        {place.photos.map((photo, idx) => (
                            <Carousel.Slide key={`photo-${idx}`}>
                                <Image
                                    alt=""
                                    src={getPhotoUrl(
                                        photo.prefix,
                                        photo.suffix,
                                        IMAGES_WIDTH_4_5,
                                        IMAGES_HEIGHT_4_5
                                    )}
                                />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                )}
                <Flex direction="column" gap="md" style={{ margin: 20 }}>
                    <Flex justify="space-between" align="center">
                        <Flex gap="xs" align="center">
                            <Text size="lg" fw={900}>
                                {place.name}
                            </Text>
                            <Badge color={isOpenColor} radius="md">{isOpenText}</Badge>
                        </Flex>

                        <SocialMedia
                            {...place?.social_media}
                            website={place?.website}
                        />
                    </Flex>
                    <Flex justify="space-between" align="center">
                        {
                            <Text size="sm">{`${
                                place?.hours?.display ?? ""
                            }`}</Text>
                        }
                        <Flex gap="xs" align="center">
                            <IconPhone />
                            <Text size="lg">{place.tel}</Text>
                        </Flex>
                    </Flex>
                    <Text size="sm">{place.description}</Text>
                    <Flex align="center">
                        <Group mt="md" mb="xs">
                            {place.categories &&
                                place.categories.map((category) => (
                                    <Badge key={category.id} color="blue">
                                        {category.name}
                                    </Badge>
                                ))}
                        </Group>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Flex align={"center"} gap="sm">
                            <Button
                                onClick={handleOpenReviews}
                                disabled={
                                    !place?.tips || place?.tips?.length === 0
                                }
                            >
                                Reviews
                            </Button>
                            <RatingStars rating={place.rating} />
                        </Flex>
                        <Button onClick={handleOpenMap}>View map</Button>
                    </Flex>
                </Flex>
            </Card.Section>
        </Card>
    );
};

export default PlaceCard;
