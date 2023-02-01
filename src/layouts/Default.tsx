import { Link, Outlet } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";

import {
    HamburgerIcon,
    AddIcon,
    ExternalLinkIcon,
    EditIcon,
    RepeatIcon,
} from "@chakra-ui/icons";

export default function DefaultLayout() {
    return (
        <>
            <h1>Willkommen zu ...</h1>
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
                    <Link to={"/work"}>
                        <MenuItem>Work</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            <Outlet />
        </>
    );
}
