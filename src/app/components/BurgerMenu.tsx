import { Burger } from '@mantine/core';

type BurgerMenuProps = {
    opened: boolean,
    toggle: () => void,
}

const BurgerMenu  = ({ opened, toggle }: BurgerMenuProps) => {
  
  return <Burger hiddenFrom="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}

export default BurgerMenu;