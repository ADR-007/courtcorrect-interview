import {CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {ComponentPreviews, useInitial} from "./dev";
import reportWebVitals from './reportWebVitals';
import {theme} from "./theme";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            networkMode: 'always',
        },
    },
});

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline/>
                <React.StrictMode>
                    <DevSupport
                        ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </React.StrictMode>
            </LocalizationProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
