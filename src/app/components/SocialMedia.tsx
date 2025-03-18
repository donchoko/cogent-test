import React from "react";

import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandX,
    IconWorldWww,
} from "@tabler/icons-react";
import { Flex } from "@mantine/core";

type SocialMediaProps = {
    facebook_id?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
};

const SocialMedia: React.FC<SocialMediaProps> = ({
    facebook_id,
    instagram,
    twitter,
    website,
}) => {
    return (
        <Flex gap="lg">
            {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                    <IconWorldWww />
                </a>
            )}
            {facebook_id && (
                <a
                    href={`https://facebook.com/${facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconBrandFacebook />
                </a>
            )}
            {instagram && (
                <a
                    href={`https://instagram.com/${instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconBrandInstagram />
                </a>
            )}
            {twitter && (
                <a
                    href={`https://x.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconBrandX />
                </a>
            )}
        </Flex>
    );
};

export default SocialMedia;
