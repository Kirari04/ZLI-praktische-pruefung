import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface BreadCrumArrayProps {
    title: string;
    path: string;
}

export default function BreadCrumArray(props: { list: BreadCrumArrayProps[] }) {
    return (
        <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            {props.list.map((el, i) => (
                <BreadcrumbItem key={i}>
                    <BreadcrumbLink
                        to={el.path}
                        as={Link}
                        isCurrentPage={Boolean(i + 1 == props.list.length)}
                    >
                        {el.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
}
