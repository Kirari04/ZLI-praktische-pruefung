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
import { useContext, useEffect, useState } from "react";
import Auth from "../_auth";
import ApplicationMenu from "../components/ApplicationMenu";
import { UserContext } from "../hooks/_state";

export default function DefaultLayout() {
    const { isAuth, setIsAuth } = useContext(UserContext);
    new Auth((e: Auth) => {}, isAuth, setIsAuth);

    return (
        <>
            <Stack m={4} gap={4} direction="column" align="start">
                <ApplicationMenu />
                <Outlet />
            </Stack>
        </>
    );
}
