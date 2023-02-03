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
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DeleteWorkButtonComponent from "../../components/DeleteWorkButton";
import Auth from "../../hooks/_auth";
import {
    loadWorkItem_jwtfn,
    updateWorkItem_jwtfn,
} from "../../hooks/_func.jwt";
import { UserContext } from "../../hooks/_state";

export default function MyShowWork() {
    const toast = useToast();
    let fin = false;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [data, setData] = useState<null | LoadWorkItem>(null);
    const [token, settoken] = useState<null | string>(null);
    const { isAuth, setIsAuth } = useContext(UserContext);
    const navigate = useNavigate();

    const { workId } = useParams();
    const loadData = async (AuthToken: string) => {
        if (fin) {
            return;
        }
        fin = true;
        setIsLoading(true);
        const res = await loadWorkItem_jwtfn(
            `/auth/jwt/task/${workId}`,
            AuthToken
        );
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
        loadData(`${token}`);
    };

    const updateData = async (AuthToken: string) => {
        if (data?.success && data.data) {
            setIsLoadingButton(true);
            const res = await updateWorkItem_jwtfn(
                "/auth/jwt/tasks",
                data?.data?.id,
                data?.data?.completed,
                data?.data?.title,
                AuthToken
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
        new Auth(
            (e: Auth) => {
                settoken(e.token);
                loadData(`${e.token}`);
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
            <Stack direction={"row"} gap={4} alignContent={"center"}>
                <Link to={"/meine/aufgaben"}>
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
                <Link to={"/meine/aufgabe/hinzufuegen"}>
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
                                        onClick={() => updateData(`${token}`)}
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
                                            jwt={true}
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
