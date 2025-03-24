"use client";

import { Flex, MantineSize, StyleProp, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { KeyboardEvent, useState } from "react";

type SearchFieldProps = {
    visibleFrom?: MantineSize;
    width?: StyleProp<React.CSSProperties['width']>;
    onSearch: (value: string) => void;
};

const SearchField = ({ visibleFrom, width, onSearch }: SearchFieldProps) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchValue);
        }
    };

    const handleOnClick = () => {
        onSearch(searchValue);
    };

    return (
        <Flex w="100%" gap="xl" justify="center" visibleFrom={visibleFrom}>
            <TextInput
                id="mantine-search-bar"
                placeholder="Search..."
                rightSection={
                    <IconSearch onClick={handleOnClick} size="1.2rem" />
                }
                w={width}
                radius="md"
                size="md"
                variant="unstyled"
                rightSectionPointerEvents="visible"
                onKeyDown={handlePressEnter}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
            />
        </Flex>
    );
};

export default SearchField;
