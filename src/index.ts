import ChatList from "./modules/ChatList/chatList";
import HomePage from "./modules/Home/home";
import Login from "./modules/Login/login";
import Signup from "./modules/Signup/signup";
import ErrorsPage from "./modules/Errors/errors";
import UserSettings from "./modules/UserSettings/userSettings";
import avatar from "../static/images/generic-avatar.png";
import EditUserSettings from "./modules/EditUserSettings/editUserSettings";
import ChangePassword from "./modules/ChangePassword/changePassword";

const views = [
  { name: "Login", link: "./modules/Login/login.hbs" },
  { name: "Sign up", link: "./modules/Signup/signup.hbs" },
  { name: "Chat list", link: "./modules/ChatList/chatList.hbs" },
  { name: "User settings", link: "./modules/UserSettings/userSettings.hbs" },
  {
    name: "Edit settings",
    link: "./modules/EditUserSettings/editUserSettings.hbs",
  },
  {
    name: "Change password",
    link: "./modules/ChangePassword/changePassword.hbs",
  },
  { name: "404", link: "./modules/Errors/404.hbs" },
  { name: "500", link: "./modules/Errors/500.hbs" },
];

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app")!;
  const path = document.location.pathname;
  const homePage = new HomePage({ title: "Home page", views });

  switch (path) {
    case "/": {
      root.append(homePage.getContent()!);
      homePage.dispatchComponentDidMount();
      break;
    }
    case "/modules/Login/login.hbs": {
      const loginPage = new Login({ title: "Login" });
      root.append(loginPage.getContent()!);
      loginPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/Signup/signup.hbs": {
      const signupPage = new Signup({ title: "Signup" });
      root.append(signupPage.getContent()!);
      signupPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/ChatList/chatList.hbs": {
      const chatListPage = new ChatList({ title: "Chat list" });
      root.append(chatListPage.getContent()!);
      chatListPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/UserSettings/userSettings.hbs": {
      const userSettingsPage = new UserSettings({
        title: "User Settings",
        name: "Packman",
        handle: "@pkmn",
        phone: "+133224343",
        avatar: avatar,
      });
      root.append(userSettingsPage.getContent()!);
      userSettingsPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/EditUserSettings/editUserSettings.hbs": {
      const editUserSettingsPage = new EditUserSettings({
        title: "Edit User Settings",
      });
      root.append(editUserSettingsPage.getContent()!);
      editUserSettingsPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/ChangePassword/changePassword.hbs": {
      const changePasswordPage = new ChangePassword({
        title: "Change Password",
      });
      root.append(changePasswordPage.getContent()!);
      changePasswordPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/Errors/404.hbs": {
      const errorPage = new ErrorsPage({
        code: "404",
        text: "Oops!",
        backLink: "../ChatList/chatList.hbs",
        backLinkText: "Back to chats",
      });
      root.append(errorPage.getContent()!);
      errorPage.dispatchComponentDidMount();
      break;
    }
    case "/modules/Errors/500.hbs": {
      const errorPage = new ErrorsPage({
        code: "500",
        text: "Something went wrong :(",
        backLink: "../ChatList/chatList.hbs",
        backLinkText: "Back to chats",
      });
      root.append(errorPage.getContent()!);
      errorPage.dispatchComponentDidMount();
      break;
    }
    default: {
      root.append(homePage.getContent()!);
      homePage.dispatchComponentDidMount();
    }
  }
});
