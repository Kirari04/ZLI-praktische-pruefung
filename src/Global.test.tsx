import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddWork from "./pages/AddWork";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import MyAddWork from "./pages/my/MyAddWork";
import MyShowWork from "./pages/my/MyShowWork";
import MyShowWorks from "./pages/my/MyShowWorks";
import ShowWork from "./pages/ShowWork";
import ShowWorks from "./pages/ShowWorks";

const routes = [
    {
        path: "/",
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
        path: "aufgabe/1",
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
        path: "meine/aufgabe/1",
        element: <MyShowWork />,
    },
    {
        path: "meine/aufgabe/hinzufuegen",
        element: <MyAddWork />,
    },
];

describe("Routes", () => {
    it("should be accessible without error", () => {
        routes.forEach(({ path, element }) => {
            render(
                <MemoryRouter initialEntries={[`${path}`]}>
                    {element}
                </MemoryRouter>
            );
            expect(screen.queryByText("Error")).not.toBeInTheDocument();
        });
    });
});
