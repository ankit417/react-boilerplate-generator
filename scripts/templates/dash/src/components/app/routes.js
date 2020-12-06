import LoginPage from "../loginPage/LoginPage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import NewsPage from "../newsPage/NewsPage";
import AddNewsPage from "../newsPage/addNewsPage/AddNewsPage";
import EditNewsPage from "../newsPage/editNewsPage/EditNewsPage";

export const publicPaths = [
  {
    name: "Root",
    path: "/",
    component: LoginPage,
    restricted: true,
  },
  {
    name: "Login",
    path: "/log-in",
    component: LoginPage,
    restricted: true,
  },
  {
    path: null,
    component: NotFoundPage,
  },
];

export const privatePaths = [
  {
    name: "News",
    path: "/news",
    component: NewsPage,
    subPaths: [
      {
        name: "Add News",
        path: "/add",
        component: AddNewsPage,
        props: "isSub",
      },
      {
        name: "Edit News",
        path: "/edit/:id",
        component: EditNewsPage,
        props: "isSub",
      },
    ],
  },
];
