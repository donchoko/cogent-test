"use client";

import { Flex, MantineSize, Radio, StyleProp } from '@mantine/core';
import { SortType } from "../types/search";

type SearchFieldProps = {
    sort: SortType;
    visibleFrom?: MantineSize;
    width?: StyleProp<React.CSSProperties['width']>;
    setSort: (value: SortType) => void;
};

const SortOptions = ({ sort, visibleFrom, width, setSort }: SearchFieldProps) => {
    const sortOptions = Object.entries(SortType);
    const handleChangeSort = (value: string) => {
        const newVal = SortType[value as keyof typeof SortType];
        if (newVal !== sort) {
            setSort(newVal);
        }
        
    };
    return (
        <Flex gap="xl" justify="center" w={width} visibleFrom={visibleFrom}>
            <Radio.Group defaultValue={sort} onChange={handleChangeSort} required style={{ alignContent: 'center' }}>
                <Flex columnGap="lg">
                {sortOptions.map(entry => (
                    <Radio key={entry[0]} value={entry[1]} label={entry[0]}/>
                ))}
                </Flex>
            </Radio.Group>
        </Flex>
    );
};

export default SortOptions;
