import React from "react";
import { Auth, Navigation } from "react-uicomp";

import LoginPage from "../loginPage/LoginPage";
import SigninPage from "../signinPage/SigninPage";
import DashboardPage from "../dashboardPage/DashboardPage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import Header from "../common/header/Header.common";

// return `Auth.Provider` with `Auth.Screens` inside it
const App = () => {

    const config = { isLoggedIn: true, userRole: "admin" };

    return (
        <Navigation.Provider 
            publicPaths={[
                {
                    key: "Login",
                    name: "Login",
                    path: "/log-in",
                    component: LoginPage,
                    restricted: true
                }, 
                {
                    key: "Signin",
                    name: "Signin",
                    path: "/sign-in",
                    component: SigninPage,
                    restricted: true
                },
                {
                    path: null,
                    component: NotFoundPage,
                }
            ]}
            privatePaths={
                [
                    {
                        key: "Dashboard",
                        name: "Dashboard",
                        path: "/dashboard",
                        component: DashboardPage
                    }
                ]
            }
            userRoles={{
                "admin": {
                    access: [
                        "/", 
                        "/log-in", 
                        "/sign-in", 
                        "/dashboard", 
                        "/home"
                    ]
                  },
                "user": {
                    access: [
                        "/", 
                        "/log-in", 
                        "/sign-in"
                    ]
                }
            }}
        >
            <Auth.Provider config={config}>
                <Header />
                <Auth.Screens />
            </Auth.Provider>
        </Navigation.Provider>
    )
}

export default App;