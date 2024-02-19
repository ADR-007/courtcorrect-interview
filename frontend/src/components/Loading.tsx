import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const LoadingScreen = () =>
    // mui loading screen on center of page
    (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <CircularProgress/>
        </Box>
    )


export default LoadingScreen;