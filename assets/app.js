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
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ArticleCreationPage from "./pages/ArticleCreationPage";
import ProfilePage from "./pages/ProfilePage";
import ArticlePage from "./pages/ArticlePage";


const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/article/create" element={<ArticleCreationPage />}></Route>
            <Route path="/profile/:id" element={<ProfilePage />}></Route>
            <Route path="/article/:id" element={<ArticlePage />}></Route>
            {/** * - all other routes*/}
            {/*<Route path="*" element={<NotFoundPage />}></Route>*/}
        </Routes>
    </BrowserRouter>
);