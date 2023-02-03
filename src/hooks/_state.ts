import React from "react";

const UserContext = React.createContext({
    isAuth: false,
    setIsAuth: (isAuth: boolean): void => {
        console.log("default-isAuth", isAuth);
    },
});

export { UserContext };
