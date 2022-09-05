import ChatList from "./modules/ChatList/chatList";
import HomePage from "./modules/Home/home";
import Login from "./modules/Login/login";
import Signup from "./modules/Signup/signup";

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
    default: {
      root.append(homePage.getContent()!);
      homePage.dispatchComponentDidMount();
    }
  }
});
