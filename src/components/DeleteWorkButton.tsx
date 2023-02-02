import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast,
    Spinner,
    Button,
    Checkbox,
    Input,
    IconButton,
    Stack,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    Code,
} from "@chakra-ui/react";
import { ArrowBackIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { RefObject, useEffect, useState } from "react";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
import {
    deleteWorkItem_fn,
    loadWorkItem_fn,
    updateWorkItem_fn,
} from "../_func";
import React from "react";
import { Interface } from "readline";

export default function DeleteWorkButtonComponent(props: {
    data: LoadWorkItem;
    callback?: Function;
}) {
    const data = props.data;
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const toast = useToast();

    const deleteData = async () => {
        if (data?.success && data.data) {
            setIsLoadingButton(true);
            let res = await deleteWorkItem_fn("/task", data?.data?.id);
            setIsLoadingButton(false);
            if (!res.success) {
                toast({
                    title: "Failed to Fetch.",
                    description: res.error,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Success",
                    description: `${data.data.title} wurde gelöscht`,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                if (!props.callback) {
                    navigate("/aufgaben");
                }
                if(props.callback){
                    props.callback()
                }
            }
        }
    };
    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme={"red"}
                isLoading={isLoadingButton}
            >
                Delete
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef as any}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Work
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete{" "}
                            <Code>{data.data?.title}</Code>? You can't undo this
                            action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    onClose();
                                    deleteData();
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
