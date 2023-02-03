import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Stack,
    useConst,
    useToast,
} from "@chakra-ui/react";

import { HamburgerIcon, UnlockIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import Auth from "../_auth";
import { UserContext } from "../hooks/_state";

export default function ApplicationMenu() {
    const navigate = useNavigate();
    const toast = useToast();
    const { isAuth, setIsAuth } = useContext(UserContext);
    const logout = () => {
        new Auth((e: Auth) => null, isAuth, setIsAuth, false).signout(
            (e: boolean) => {
                setIsAuth(e);
                toast({
                    title: "Logged out.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                navigate("/");
            }
        );
    };
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
            />
            <MenuList>
                <Link to={"/"}>
                    <MenuItem>Home</MenuItem>
                </Link>
                <Link to={"/aufgaben"}>
                    <MenuItem>Alle Aufgaben</MenuItem>
                </Link>
                <Link to={"/aufgabe/hinzufuegen"}>
                    <MenuItem>Aufgaben Hinzufügen</MenuItem>
                </Link>
                {isAuth ? (
                    <>
                        <Link to={"/meine/aufgaben"}>
                            <MenuItem icon={<UnlockIcon />}>
                                Alle Aufgaben
                            </MenuItem>
                        </Link>
                        <Link to={"/meine/aufgabe/hinzufuegen"}>
                            <MenuItem icon={<UnlockIcon />}>
                                Aufgaben Hinzufügen
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={logout} bgColor={"red.400"}>
                            Abmelden
                        </MenuItem>
                    </>
                ) : (
                    <Link to={"/login"}>
                        <MenuItem bgColor={"blue.400"}>Anmelden</MenuItem>
                    </Link>
                )}
            </MenuList>
        </Menu>
    );
}
