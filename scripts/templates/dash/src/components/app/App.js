import React, { useState } from "react";
import { Toast, useToast } from "react-uicomp";
import { Auth, withNavigation } from "react-auth-navigation";
import { publicPaths, privatePaths } from "./routes";
import { userRoles } from "./userRoles";

import SideNavigation from "../common/sideNavigation/SideNavigation.common";

const App = () => {
  const { handler, toast } = useToast();
  const isLoggedIn = localStorage.getItem("isLoggedin") ? true : false;

  const [config, setConfig] = useState({
    isLoggedIn,
    userRole: "admin",
  });

  const [sideNavVisible, setSideNavVisible] = useState(false);

  return (
    <Auth.Provider
      config={config}
      state={{
        toast,
        setSideNavVisible,
        handleLogin: (token) => {
          localStorage.setItem("isLoggedin", true);
          localStorage.setItem("token", token);

          setConfig({
            isLoggedIn: true,
            userRole: "admin",
          });
        },
        handleLogout: () => {
          localStorage.removeItem("isLoggedin");
          localStorage.removeItem("token");
          setConfig({
            isLoggedIn: false,
            userRole: "admin",
          });
        },
      }}>
      <Auth.Screens />
      <SideNavigation
        mobileSideNavVisible={sideNavVisible}
        setMobileSideNavVisible={setSideNavVisible}
      />
      <Toast {...handler} errorColor="#ff4343" style={{ minWidth: 300 }} />
    </Auth.Provider>
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
  routerType: "hash",
});
