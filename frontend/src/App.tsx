import Cookies from "js-cookie";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import {Helmet} from "react-helmet";
import {RouterProvider} from "react-router-dom";

import {OpenAPI} from "./api/requests";
import {router} from "./routes";

import "./index.css";

momentDurationFormatSetup(moment);

export default function App() {
    if (process.env.REACT_APP_API_URL) {
        OpenAPI.BASE = process.env.REACT_APP_API_URL
    } else if (process.env.NODE_ENV === 'development') {
        OpenAPI.BASE = 'http://localhost:8000'
    } else {
        OpenAPI.BASE = '/'
    }
    OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI.HEADERS = async ({headers}) => (
        {'x-csrftoken': Cookies.get('csrftoken') || '', ...headers}
    )
    return (
        <>
            <Helmet>
                <title>courtcorrect</title>
            </Helmet>
            <RouterProvider router={router}/>
        </>
    );
}
