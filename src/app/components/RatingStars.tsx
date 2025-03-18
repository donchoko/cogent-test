import React from "react";

import { IconStar } from "@tabler/icons-react";
import { Flex, Text } from "@mantine/core";

type RatingStarsProps = {
    rating: number;
};

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    const getRatingColor = (rating: number) => {
        const colors = [
            { threshold: 0.0, color: "#C7CDCF" }, // LightMediumGrey
            { threshold: 4.0, color: "#E6092C" }, // Red
            { threshold: 5.0, color: "#FF6701" }, // DarkOrange
            { threshold: 6.0, color: "#FF9600" }, // Orange
            { threshold: 7.0, color: "#FFC800" }, // Yellow
            { threshold: 8.0, color: "#C5DE35" }, // LightGreen
            { threshold: 9.0, color: "#73CF42" }, // Green
            { threshold: Infinity, color: "#00B551" }, // DarkGreen
        ];

        for (let i = colors.length - 1; i >= 0; i--) {
            if (rating >= colors[i].threshold) {
                return colors[i].color;
            }
        }

        return "#C7CDCF"; // Default to LightMediumGrey
    };

    return (
        <Flex gap="xs" align="center" style={{ color: getRatingColor(rating) }}>
            <Text size="xl">
                {rating?.toFixed(1) ?? '--'}
            </Text>
            <IconStar />
        </Flex>
    );
};

export default RatingStars;
