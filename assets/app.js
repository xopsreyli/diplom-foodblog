// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            {/** * - all other routes*/}
            {/*<Route path="*" element={<NotFoundPage />}></Route>*/}
        </Routes>
    </BrowserRouter>
);