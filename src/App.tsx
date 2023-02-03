import {
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    ScaleFade,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import DefaultLayout from "./layouts/Default";
import DefaultError from "./layouts/DefaultError";

import Index from "./pages/Index";
import ShowWorks from "./pages/ShowWorks";
import ShowWork from "./pages/ShowWork";
import AddWork from "./pages/AddWork";

import _data from "./_data";
import LoginPage from "./pages/Login";
import React from "react";
import { UserContext } from "./hooks/_state";
import MyShowWorks from "./pages/my/MyShowWorks";
import MyShowWork from "./pages/my/MyShowWork";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <DefaultError />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "login/",
                element: <LoginPage />,
            },
            {
                path: "aufgaben/",
                element: <ShowWorks />,
            },
            {
                path: "aufgabe/:workId",
                element: <ShowWork />,
            },
            {
                path: "aufgabe/hinzufuegen",
                element: <AddWork />,
            },
            {
                path: "meine/aufgaben/",
                element: <MyShowWorks />,
            },
            {
                path: "meine/aufgabe/:workId",
                element: <MyShowWork />,
            },
            {
                path: "aufgabe/hinzufuegen",
                element: <AddWork />,
            },
        ],
    },
]);

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const setIsAuthState = (isAuth: boolean) => {
        setIsAuth(isAuth);
    };
    return (
        <UserContext.Provider
            value={{ isAuth: isAuth, setIsAuth: setIsAuthState }}
        >
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}

export { App };
