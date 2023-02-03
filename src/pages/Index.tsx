import {
    Badge,
    Box,
    Button,
    Divider,
    Heading,
    Link,
    ListItem,
    Spinner,
    UnorderedList,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import Auth from "../hooks/_auth";
import { UserContext } from "../hooks/_state";

export default function Index() {
    const [isLoading, setisLoading] = useState(false);
    const [email, setemail] = useState<null | string>(null);
    const { isAuth, setIsAuth } = useContext(UserContext);

    useEffect(() => {
        setisLoading(true);
        new Auth(
            (e: Auth) => {
                setemail(e.user.email);
                setisLoading(false);
            },
            isAuth,
            setIsAuth,
            true
        );
    }, []);

    return (
        <>
            <Heading as="h1">Home</Heading>
            {isAuth ? (
                <Box
                    p="40px"
                    color={"blackAlpha.800"}
                    mt="4"
                    bg="whiteAlpha.800"
                    rounded="md"
                    shadow="md"
                >
                    {isLoading ? <Spinner /> : null}
                    <Heading as="p" size="md">
                        Wellcome back{" "}
                        <Badge
                            fontSize="md"
                            colorScheme="blue"
                        >{`${email}`}</Badge>
                    </Heading>
                    <br />
                    <Divider />
                    <br />
                    <Heading as="p" size="md">
                        Public:
                    </Heading>
                    <UnorderedList>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/aufgaben"}
                            >
                                Aufgaben
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/aufgabe/hinzufuegen"}
                            >
                                Aufgaben Hinzufügen
                            </Link>
                        </ListItem>
                    </UnorderedList>
                    <Heading as="p" size="md">
                        Protected:
                    </Heading>
                    <UnorderedList>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/meine/aufgaben"}
                            >
                                Meine Aufgaben
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/meine/aufgabe/hinzufuegen"}
                            >
                                Zu meinen Aufgaben hinzufügen
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            ) : (
                <Box
                    p="40px"
                    color={"blackAlpha.800"}
                    mt="4"
                    bg="whiteAlpha.800"
                    rounded="md"
                    shadow="md"
                >
                    {isLoading ? <Spinner /> : null}
                    <Heading as="p" size="md">
                        Melde dich jetzt an:{" "}
                        <Link as={ReachLink} to={"/login"}>
                            <Button colorScheme={"blue"}>Anmelden</Button>
                        </Link>
                    </Heading>
                    <br />
                    <Divider />
                    <br />
                    <Heading as="p" size="md">
                        Public:
                    </Heading>
                    <UnorderedList>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/aufgaben"}
                            >
                                Aufgaben
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                as={ReachLink}
                                color="teal.500"
                                to={"/aufgabe/hinzufuegen"}
                            >
                                Aufgaben hinzufügen
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            )}
        </>
    );
}
