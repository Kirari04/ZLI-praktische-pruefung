import React, { Dispatch, SetStateAction, useState } from "react";

const UserContext = React.createContext({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => {}
})

export {UserContext}