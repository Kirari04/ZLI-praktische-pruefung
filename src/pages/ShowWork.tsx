import { ArrowBackIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
    Button,
    Checkbox,
    IconButton,
    Input,
    Spinner,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumArray from "../components/BreadCrumbArray";
import DeleteWorkButtonComponent from "../components/DeleteWorkButton";
import { loadWorkItem_fn, updateWorkItem_fn } from "../hooks/_func";

export default function ListWorkPage() {
    const toast = useToast();
    let fin = false;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [data, setData] = useState<null | LoadWorkItem>(null);

    const { workId } = useParams();
    const loadData = async () => {
        if (fin) {
            return;
        }
        fin = true;
        setIsLoading(true);
        const res = await loadWorkItem_fn(`/task/${workId}`);
        setData(res);
        setIsLoading(false);
        if (!res.success) {
            toast({
                title: "Failed to Fetch.",
                description: res.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };
    const reloadData = () => {
        fin = false;
        loadData();
    };

    const updateData = async () => {
        if (data?.success && data.data) {
            setIsLoadingButton(true);
            const res = await updateWorkItem_fn(
                "/tasks",
                data?.data?.id,
                data?.data?.completed,
                data?.data?.title
            );
            setIsLoadingButton(false);
            if (!res.success) {
                toast({
                    title: "Failed to Fetch.",
                    description: res.error,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                setData({
                    success: data.success,
                    error: res.error,
                    data: data.data,
                });
            } else {
                toast({
                    title: "Success",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setData({
                    success: data.success,
                    error: data.error,
                    data: res.data,
                });
            }
        }
    };

    useEffect(() => {
        loadData();
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
                        title: "Aufgaben",
                        path: "/aufgaben",
                    },
                    {
                        title: `${data?.data?.title}`,
                        path: `/aufgabe/${data?.data?.title}`,
                    },
                ]}
            />
            <Stack direction={"row"} gap={4} alignContent={"center"}>
                <Link to={"/aufgaben"}>
                    <IconButton
                        onClick={reloadData}
                        isLoading={isLoading}
                        colorScheme={"blue"}
                        icon={<ArrowBackIcon />}
                        aria-label={"Go Back"}
                    ></IconButton>
                </Link>
                <Button
                    onClick={reloadData}
                    isLoading={isLoading}
                    colorScheme={"blue"}
                >
                    Reload
                </Button>
                <Link to={"/aufgabe/hinzufuegen"}>
                    <IconButton
                        isLoading={isLoading}
                        colorScheme={"blue"}
                        icon={<PlusSquareIcon />}
                        aria-label={"Add Work"}
                    />
                </Link>
            </Stack>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Work</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Completed</Th>
                            <Th colSpan={2}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan={3}>
                                    <Spinner />
                                </Td>
                            </Tr>
                        ) : null}
                        {data?.success && data.data ? (
                            <Tr>
                                <Td>{data.data.id}</Td>
                                <Td>
                                    <Input
                                        variant="filled"
                                        value={data.data.title}
                                        onInput={(e) => {
                                            setData({
                                                success: data.success,
                                                error: data.error,
                                                data: !data.data
                                                    ? null
                                                    : {
                                                          id: Number(
                                                              data.data.id
                                                          ),
                                                          completed: Boolean(
                                                              data.data
                                                                  ?.completed
                                                          ),
                                                          title: (
                                                              e.target as HTMLInputElement
                                                          ).value,
                                                      },
                                            });
                                        }}
                                    />
                                </Td>
                                <Td>
                                    <Checkbox
                                        defaultChecked={data.data.completed}
                                        onInput={(e) => {
                                            setData({
                                                success: data.success,
                                                error: data.error,
                                                data: !data.data
                                                    ? null
                                                    : {
                                                          id: Number(
                                                              data.data.id
                                                          ),
                                                          completed: Boolean(
                                                              (
                                                                  e.target as HTMLInputElement
                                                              ).checked
                                                          ),
                                                          title: data.data
                                                              ?.title,
                                                      },
                                            });
                                        }}
                                    >
                                        {data.data.completed ? "Done" : "Todo"}
                                    </Checkbox>
                                </Td>
                                <Td>
                                    <Button
                                        onClick={updateData}
                                        colorScheme={"orange"}
                                        isLoading={isLoadingButton}
                                    >
                                        Update
                                    </Button>
                                </Td>
                                <Td>
                                    {data.success && data.data ? (
                                        <DeleteWorkButtonComponent
                                            data={data}
                                        />
                                    ) : null}
                                </Td>
                            </Tr>
                        ) : null}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
