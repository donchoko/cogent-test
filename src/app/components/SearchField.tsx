"use client";

import { Flex, SegmentedControl, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { KeyboardEvent, useState } from "react";
import { SortType } from "../types/search";

type SearchFieldProps = {
    onSearch: (value: string) => void;
    setSort: (value: SortType) => void;
};

const SearchField = ({ onSearch, setSort }: SearchFieldProps) => {
    const sortOptions = Object.keys(SortType);
    const [searchValue, setSearchValue] = useState<string>("");
    const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchValue);
        }
    };

    const handleOnClick = () => {
        onSearch(searchValue);
    };

    const handleChangeSort = (value: string) => {
        const option = value as keyof typeof SortType;
        setSort(SortType[option]);
    };

    return (
        <Flex gap="xl">
            <SegmentedControl
                id="sort-selector"
                data={sortOptions}
                defaultValue={sortOptions[1]}
                onChange={handleChangeSort}
                itemID="sort-button"
            />
            <TextInput
                id="mantine-search-bar"
                placeholder="Search..."
                rightSection={
                    <IconSearch onClick={handleOnClick} size="1.2rem" />
                }
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
