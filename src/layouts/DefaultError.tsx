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
} from "@chakra-ui/icons";
import ApplicationMenu from "../components/ApplicationMenu";

export default function DefaultLayout() {
    return (
        <>
            <h1>Unknow Error happend</h1>
            <ApplicationMenu />
            
        </>
    );
}
