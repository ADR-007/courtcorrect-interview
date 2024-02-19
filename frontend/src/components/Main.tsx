import {Box} from "@mui/material";
import {BoxProps} from "@mui/material/Box";


export default function Main({children}: BoxProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            maxWidth="1032px"
            width="100%"
            // "!important" is needed likely because of this issue:
            // https://github.com/mui/material-ui/issues/29703
            marginTop="120px !important"
            marginBottom="250px !important"
            marginLeft="155px !important"
            marginRight="160px !important"
        >
            {children}
        </Box>
    )
}