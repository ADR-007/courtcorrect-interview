import {Box} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as React from 'react';


function Index() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                padding: 2,
                paddingRight: 8,
            }}
        >
            <Typography>Name Surname</Typography>
            <Avatar
                sx={{
                    height: 48,
                    width: 48,
                    marginLeft: 2,

                }}
            >CC</Avatar>
        </Box>
    );
}

export default Index;
