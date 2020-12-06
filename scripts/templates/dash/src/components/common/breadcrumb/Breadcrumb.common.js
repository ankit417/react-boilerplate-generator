import React from "react";
import { useNavigation } from "react-auth-navigation";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const Breadcrumb = () => {
  const { navigation } = useNavigation();
  const { routes, navigate } = navigation;

  const activeTabs = Object.keys(routes)
    .filter((route) => routes[route].active)
    .map((route) => routes[route]);

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        {activeTabs.map(
          ({ name, path }, index, arr) =>
            index !== arr.length - 1 && (
              <Link
                key={index}
                color="inherit"
                href="/"
                onClick={(e) => handleClick(e, path)}>
                {name}
              </Link>
            ),
        )}
        <Typography color="textPrimary">
          {activeTabs[activeTabs.length - 1].name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
