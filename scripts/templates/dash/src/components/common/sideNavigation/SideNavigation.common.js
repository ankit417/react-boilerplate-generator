/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAuth, useNavigation } from "react-auth-navigation";

import { CSSTransition } from "react-transition-group";
import { MdClose, FaNewspaper } from "react-icons/all";

import LOGO from "../../../assets/logo192.jpg";

const ICONS = {
  News: <FaNewspaper size={20} />,
};

const SideNav = () => {
  const { navigation } = useNavigation();
  const { setSideNavVisible } = useAuth();
  const { routes } = navigation;

  return (
    <div className="sidenavigation-container">
      <div className="sidenavigation">
        <div
          className="sidenavigation-header"
          onClick={() => navigation.navigate("/")}>
          <img src={LOGO} alt="NIRC Logo" />
        </div>

        <ul
          className="sidenavigation-list"
          onClick={() => setSideNavVisible(false)}>
          {Object.keys(routes).map(
            (route, index) =>
              routes[route].props !== "isSub" && (
                <li className="sidenavigation-list-item" key={index}>
                  <a
                    href={routes[route].path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigation.navigate(routes[route].path);
                    }}
                    className={routes[route].active ? "active" : ""}>
                    <span className="icon">{ICONS[routes[route].name]}</span>
                    <span className="title">{routes[route].name}</span>
                  </a>
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default function SideNavigation(props) {
  const { mobileSideNavVisible, setMobileSideNavVisible } = props;
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <>
        <CSSTransition
          in={mobileSideNavVisible}
          timeout={200}
          classNames="sidenavigation-node"
          unmountOnExit>
          <div className="sidenavigation-mobile-container">
            <div className="sidenavigation-mobile">
              <SideNav />

              <div
                className="close-sidenav"
                onClick={() => setMobileSideNavVisible(false)}>
                <MdClose />
              </div>
            </div>
          </div>
        </CSSTransition>

        <div className="sidenavigation-web">
          <SideNav />
        </div>
      </>
    );
  } else {
    return null;
  }
}
