import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Button,
    Checkbox,
    IconButton,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addWorkItem_fn } from "../hooks/_func";

export default function AddWorkPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);

    const AddData = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingButton(true);
        if (title) {
            const res = await addWorkItem_fn("/tasks", completed, title);

            if (!res.success) {
                toast({
                    title: "Failed to Fetch.",
                    description: res.error,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                navigate(`/aufgabe/${res.data?.id}`);
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

    return (
        <>
            <Link to={"/aufgaben"}>
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
