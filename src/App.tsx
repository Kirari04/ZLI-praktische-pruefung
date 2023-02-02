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
                path: "aufgaben/",
                element: <ShowWorks />,
            },
            {
                path: "aufgabe/:workId",
                element: <ShowWork />
            },
            {
                path: "aufgabe/hinzufuegen",
                element: <AddWork />
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
