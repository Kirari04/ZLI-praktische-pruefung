import { EmailIcon } from "@chakra-ui/icons";
import {
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../hooks/_auth";
import { UserContext } from "../hooks/_state";
import KeyIcon from "../icons/KeyIcon";

export default function LoginPage() {
    const { isAuth, setIsAuth } = useContext(UserContext);
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logout = () => {
        new Auth(() => null, isAuth, setIsAuth, false).signout((e: boolean) => {
            setIsAuth(e);
        });
    };

    const login = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const auth = new Auth(() => null, isAuth, setIsAuth);
        auth.sign(email, password, isAuth, setIsAuth)
            .then(() => {
                toast({
                    title: "Success",
                    description: "Du wurdest angemeldet",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setIsLoading(false);
                navigate("/");
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    toast({
                        title: "Error",
                        description: `${err.response.data.message}`,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Error",
                        description: `${err.message}`,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }

                setIsLoading(false);
            });
    };

    if (isAuth) {
        return (
            <Stack direction={"column"} alignItems="start" gap={4}>
                <p>
                    Du bist bereits angemeldet. Um mit einem anderen Account
                    anzumelden musst du dich zuerst abmelden.
                </p>
                <Button autoFocus onClick={logout} colorScheme={"red"}>
                    Abmelden
                </Button>
            </Stack>
        );
    }

    return (
        <form action="#" onSubmit={login}>
            <Stack direction={"column"} alignItems="start">
                <h1>Login / Register your Account</h1>
                <label htmlFor="email">
                    <strong>Email</strong>
                    <InputGroup>
                        <InputLeftAddon children={<EmailIcon />} />
                        <Input
                            autoFocus
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>
                </label>
                <label htmlFor="password">
                    <strong>Password</strong>
                    <InputGroup>
                        <InputLeftAddon children={<KeyIcon />} />
                        <Input
                            id="password"
                            type="password"
                            placeholder="SuperSecure123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputGroup>
                </label>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    colorScheme={"blue"}
                >
                    Login
                </Button>
            </Stack>
        </form>
    );
}
