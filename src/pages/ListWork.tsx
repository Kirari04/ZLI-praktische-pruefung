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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import loadWorkList from "../_func";

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
        let res = await loadWorkList("/tasks");
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
            <Button onClick={reloadData} isLoading={isLoading} colorScheme={"blue"}>
                Reload
            </Button>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Work</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Completed</Th>
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
                                    <Checkbox defaultChecked={el.completed}>
                                        {el.completed ? "Done" : "Todo"}
                                    </Checkbox>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}