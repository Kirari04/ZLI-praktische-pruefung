import { Button, Code, Heading, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../hooks/_auth";
import { UserContext } from "../hooks/_state";

export default function Index() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [email, setemail] = useState<null | string>(null);
    const { isAuth, setIsAuth } = useContext(UserContext);

    useEffect(() => {
        setisLoading(true);
        new Auth(
            (e: Auth) => {
                setemail(e.user.email);
                setisLoading(false);
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
            <Heading as="h1">Home</Heading>
            {isLoading ? <Spinner /> : null}
            {isAuth ? (
                <Heading as="p" size="md">
                    Wellcome back <Code>{`${email}`}</Code>
                </Heading>
            ) : (
                <Heading as="p" size="md">
                    Melde dich jetzt an:{" "}
                    <Link to={"/login"}>
                        <Button colorScheme={"blue"}>Anmelden</Button>
                    </Link>
                </Heading>
            )}
        </>
    );
}
