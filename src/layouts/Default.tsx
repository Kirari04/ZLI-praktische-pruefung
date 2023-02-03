import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { useContext } from "react";
import ApplicationMenu from "../components/ApplicationMenu";
import { UserContext } from "../hooks/_state";
import Auth from "../_auth";

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
