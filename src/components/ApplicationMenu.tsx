import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { HamburgerIcon, UnlockIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import Auth from "../hooks/_auth";
import { UserContext } from "../hooks/_state";

export default function ApplicationMenu() {
    const navigate = useNavigate();
    const toast = useToast();
    const { isAuth, setIsAuth } = useContext(UserContext);
    const logout = () => {
        new Auth(() => {}, isAuth, setIsAuth, false).signout((e: boolean) => {
            setIsAuth(e);
            toast({
                title: "Logged out.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            navigate("/");
        });
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
                                Alle meine Aufgaben
                            </MenuItem>
                        </Link>
                        <Link to={"/meine/aufgabe/hinzufuegen"}>
                            <MenuItem icon={<UnlockIcon />}>
                                Zu meinen Aufgaben hinzufügen
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <Button onClick={logout} colorScheme={"red"}>
                                Abmelden
                            </Button>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem bgColor={"blue.400"}>
                        <Link to={"/login"}>
                            <Button colorScheme={"blue"}>Anmelden</Button>
                        </Link>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
}
