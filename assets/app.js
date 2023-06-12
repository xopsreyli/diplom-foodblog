// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css'

// start the Stimulus application
import './bootstrap'
import * as React from "react"
import { createRoot } from "react-dom/client"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegistrationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage"
import ArticleCreationPage from "./pages/ArticleCreationPage"
import ProfilePage from "./pages/ProfilePage"
import ArticlePage from "./pages/ArticlePage"
import SettingsPage from "./pages/SettingsPage"
import UserRedactPage from "./pages/UserRedactPage"
import ArticleUpdatePage from "./pages/ArticleUpdatePage"
import SearchPage from "./pages/SearchPage"
import FollowersPage from "./pages/FollowersPage"
import FollowsPage from "./pages/FollowsPage"
import UpdatePasswordPage from "./pages/UpdatePasswordPage"
import NotFoundPage from "./pages/NotFoundPage";


const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/article/create" element={<ArticleCreationPage />}></Route>
            <Route path="/profile/:id" element={<ProfilePage />}></Route>
            <Route path="/profile/:id/followers" element={<FollowersPage />}></Route>
            <Route path="/profile/:id/follows" element={<FollowsPage />}></Route>
            <Route path="/settings" element={<SettingsPage />}></Route>
            <Route path="/settings/update" element={<UserRedactPage />}></Route>
            <Route path="/password/update" element={<UpdatePasswordPage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/article/:id" element={<ArticlePage />}></Route>
            <Route path="/article/:id/update" element={<ArticleUpdatePage />}></Route>
            <Route path="/404" element={<NotFoundPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    </BrowserRouter>
);