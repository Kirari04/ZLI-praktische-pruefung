import React from "react"

const UserContext = React.createContext({
	isAuth: false,
	setIsAuth: (isAuth: boolean) => {}
})

export {UserContext}