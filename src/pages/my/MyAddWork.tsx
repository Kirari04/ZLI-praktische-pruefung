import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Button,
    Checkbox,
    IconButton,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumArray from "../../components/BreadCrumbArray";

import Auth from "../../hooks/_auth";
import { addWorkItem_jwtfn } from "../../hooks/_func.jwt";
import { UserContext } from "../../hooks/_state";

export default function MyAddWork() {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [token, settoken] = useState<null | string>(null);
    const { isAuth, setIsAuth } = useContext(UserContext);

    const AddData = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingButton(true);
        if (title) {
            const res = await addWorkItem_jwtfn(
                "/auth/jwt/tasks",
                completed,
                title,
                `${token}`
            );

            if (!res.success) {
                toast({
                    title: "Failed to Fetch.",
                    description: res.error,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                navigate(`/meine/aufgabe/${res.data?.id}`);
                toast({
                    title: "Success",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "Fill out the title",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }

        setIsLoadingButton(false);
    };

    useEffect(() => {
        new Auth(
            (e: Auth) => {
                settoken(e.token);
                if (!e.isAuth) {
                    navigate("/login");
                }
            },
            isAuth,
            setIsAuth,
            true
        );
    }, []);

    return (
        <>
            <BreadCrumArray
                list={[
                    {
                        title: "Home",
                        path: "/",
                    },
                    {
                        title: "Meine Aufgaben",
                        path: "/meine/aufgaben",
                    },
                    {
                        title: "Hinzufügen",
                        path: "/meine/aufgabe/hinzufuegen",
                    },
                ]}
            />
            <Link to={"/meine/aufgaben"}>
                <IconButton
                    colorScheme={"blue"}
                    icon={<ArrowBackIcon />}
                    aria-label={"Go Back"}
                ></IconButton>
            </Link>
            <form action="#" onSubmit={AddData}>
                <Stack>
                    <label htmlFor="title">
                        <Stack
                            direction={"row"}
                            gap={4}
                            align={"center"}
                            justify={"start"}
                        >
                            <p>Title</p>
                            <Input
                                autoFocus
                                id="title"
                                variant="filled"
                                placeholder="Fische giessen"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Stack>
                    </label>
                    <label htmlFor="completed">
                        <Stack
                            direction={"row"}
                            gap={4}
                            alignContent={"center"}
                        >
                            <p>Completed</p>
                            <Checkbox
                                id="completed"
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                        </Stack>
                    </label>
                    <Button
                        type="submit"
                        colorScheme={"blue"}
                        isLoading={isLoadingButton}
                    >
                        Add
                    </Button>
                </Stack>
            </form>
        </>
    );
}
