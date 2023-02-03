import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { useContext } from "react";
import ApplicationMenu from "../components/ApplicationMenu";
import Auth from "../hooks/_auth";
import { UserContext } from "../hooks/_state";

export default function DefaultLayout() {
    const { isAuth, setIsAuth } = useContext(UserContext);
    new Auth(() => {}, isAuth, setIsAuth);

    return (
        <>
            <Stack m={4} gap={4} direction="column" align="start">
                <ApplicationMenu />
                <Outlet />
            </Stack>
        </>
    );
}
