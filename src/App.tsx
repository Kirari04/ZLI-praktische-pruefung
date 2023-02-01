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

import Index from "./pages/Index";
import ListWork from "./pages/ListWork";

import _data from "./_data";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "work/",
                element: <ListWork />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
