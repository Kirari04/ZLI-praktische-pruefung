import { PlusSquareIcon } from "@chakra-ui/icons";
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
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteWorkButtonComponent from "../components/DeleteWorkButton";
import { LoadWorkItems_fn } from "../_func";

export default function ListWorkPage() {
    const toast = useToast();
    let fin = false;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        success: false,
        data: [],
        error: null,
    } as LoadWorkItems);

    const loadData = async () => {
        if (fin) {
            return;
        }
        fin = true;
        setIsLoading(true);
        let res = await LoadWorkItems_fn("/tasks");
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

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Stack direction={"row"} gap={4} alignContent={'center'}>
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
                        {data.data.map((el, i) => (
                            <Tr key={i}>
                                <Td>{el.id}</Td>
                                <Td>{el.title}</Td>
                                <Td>
                                    <Checkbox
                                        disabled
                                        defaultChecked={el.completed}
                                    >
                                        {el.completed ? "Done" : "Todo"}
                                    </Checkbox>
                                </Td>
                                <Td>
                                    <Link to={`/aufgabe/${el.id}`}>
                                        <Button colorScheme={"blue"}>
                                            Edit
                                        </Button>
                                    </Link>
                                </Td>
                                <Td>
                                    {data.success && data.data ? (
                                        <DeleteWorkButtonComponent
                                            data={{
                                                success: true,
                                                error: '',
                                                data: el
                                            }}
                                            callback={reloadData}
                                        />
                                    ) : null}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
