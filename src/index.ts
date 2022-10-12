import { ChatList } from "./modules/ChatList/chatList";
import HomePage from "./modules/Home/home";
import Login from "./modules/Login/login";
import Signup from "./modules/Signup/signup";
//import ErrorsPage from "./modules/Errors/errors";
import { UserSettings } from "./modules/UserSettings/userSettings";
//import avatar from "../static/images/generic-avatar.png";
import { EditUserSettings } from "./modules/EditUserSettings/editUserSettings";
import ChangePassword from "./modules/ChangePassword/changePassword";
import Router from "./utils/Router";
import Block from "./utils/Block";
import AuthController from "./controllers/AuthController";

// const errorPage404 = new ErrorsPage({
//   code: "404",
//   text: "Oops!",
//   backLink: "../ChatList/chatList.hbs",
//   backLinkText: "Back to chats",
// });

// const errorPage500 = new ErrorsPage({
//   code: "500",
//   text: "Something went wrong :(",
//   backLink: "../ChatList/chatList.hbs",
//   backLinkText: "Back to chats",
// });

window.addEventListener("DOMContentLoaded", async () => {
  Router.use("/", HomePage as typeof Block)
    .use("/login", Login as typeof Block)
    .use("/sign-up", Signup as typeof Block)
    .use("/messenger", ChatList as typeof Block)
    .use("/settings", UserSettings as typeof Block)
    .use("/editusersettings", EditUserSettings as typeof Block)
    .use("/change-password", ChangePassword as typeof Block);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case "/":
    case "/sign-up":
    case "/login":
      isProtectedRoute = false;
      break;
  }
  try {
    await AuthController.fetchUser();
    Router.start();
    if (!isProtectedRoute) {
      Router.go("/messenger");
    }
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go("/");
    }
  }
});
