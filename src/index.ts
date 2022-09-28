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
import Store from "../src/utils/Store";

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
  window.store = Store;

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

  // .use("/login", Login).use("/signup", Signup);
});

// window.addEventListener("DOMContentLoaded", () => {
//   const root = document.querySelector("#app")!;
//   const path = document.location.pathname;
//   const homePage = new HomePage({ title: "Home page", views });

//   switch (path) {
//     case "/": {
//       root.append(homePage.getContent()!);
//       homePage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/Login/login.hbs": {
//       const loginPage = new Login({ title: "Login" });
//       root.append(loginPage.getContent()!);
//       loginPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/Signup/signup.hbs": {
//       const signupPage = new Signup({ title: "Signup" });
//       root.append(signupPage.getContent()!);
//       signupPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/ChatList/chatList.hbs": {
//       const chatListPage = new ChatList({ title: "Chat list" });
//       root.append(chatListPage.getContent()!);
//       chatListPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/UserSettings/userSettings.hbs": {
//       const userSettingsPage = new UserSettings({
//         title: "User Settings",
//         name: "Packman",
//         handle: "@pkmn",
//         phone: "+133224343",
//         avatar: avatar,
//       });
//       root.append(userSettingsPage.getContent()!);
//       userSettingsPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/EditUserSettings/editUserSettings.hbs": {
//       const editUserSettingsPage = new EditUserSettings({
//         title: "Edit User Settings",
//       });
//       root.append(editUserSettingsPage.getContent()!);
//       editUserSettingsPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/ChangePassword/changePassword.hbs": {
//       const changePasswordPage = new ChangePassword({
//         title: "Change Password",
//       });
//       root.append(changePasswordPage.getContent()!);
//       changePasswordPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/Errors/404.hbs": {
//       const errorPage = new ErrorsPage({
//         code: "404",
//         text: "Oops!",
//         backLink: "../ChatList/chatList.hbs",
//         backLinkText: "Back to chats",
//       });
//       root.append(errorPage.getContent()!);
//       errorPage.dispatchComponentDidMount();
//       break;
//     }
//     case "/modules/Errors/500.hbs": {
//       const errorPage = new ErrorsPage({
//         code: "500",
//         text: "Something went wrong :(",
//         backLink: "../ChatList/chatList.hbs",
//         backLinkText: "Back to chats",
//       });
//       root.append(errorPage.getContent()!);
//       errorPage.dispatchComponentDidMount();
//       break;
//     }
//     default: {
//       root.append(homePage.getContent()!);
//       homePage.dispatchComponentDidMount();
//     }
//   }
// });
