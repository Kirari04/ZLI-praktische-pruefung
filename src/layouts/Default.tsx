import { Link, Outlet } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Stack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

export default function DefaultLayout() {
    return (
        <>
            <Stack m={4} gap={4} direction="column" align="start">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="outline"
                    />
                    <MenuList>
                        <Link to={"/"}>
                            <MenuItem>Home</MenuItem>
                        </Link>
                        <Link to={"/aufgaben"}>
                            <MenuItem>Alle Aufgaben</MenuItem>
                        </Link>
                        <Link to={"/aufgabe/hinzufuegen"}>
                            <MenuItem>Aufgaben Hinzufügen</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                <Outlet />
            </Stack>
        </>
    );
}
