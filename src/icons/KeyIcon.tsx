import { Icon } from "@chakra-ui/icons";
import { Box, Img } from "@chakra-ui/react";
import keyIcon from './key.png'

export default function KeyIcon() {
    return (
        <Box boxSize={6}>
            <Img 
            src={keyIcon}
        />
        </Box>
    );
}
