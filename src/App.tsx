import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/Default";
import DefaultError from "./layouts/DefaultError";

import AddWork from "./pages/AddWork";
import Index from "./pages/Index";
import ShowWork from "./pages/ShowWork";
import ShowWorks from "./pages/ShowWorks";

import { UserContext } from "./hooks/_state";
import LoginPage from "./pages/Login";
import MyAddWork from "./pages/my/MyAddWork";
import MyShowWork from "./pages/my/MyShowWork";
import MyShowWorks from "./pages/my/MyShowWorks";

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
                path: "meine/aufgabe/hinzufuegen",
                element: <MyAddWork />,
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
