import Block from "../../utils/Block";
import template from "./home.hbs";

const views = [
  { name: "Login", link: "/login" },
  { name: "Sign up", link: "/sign-up" },
  { name: "Chat list", link: "/messenger" },
  { name: "User settings", link: "/settings" },
  {
    name: "Edit settings",
    link: "/editusersettings",
  },
  {
    name: "Change password",
    link: "/change-password",
  },
  { name: "404", link: "/404" },
  { name: "500", link: "/500" },
];

type HomePageProps = {
  views: [];
};

export default class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    super(props);
    this.props.views = views;
    this.props.title = "Home page";
  }

  render() {
    return this.compile(template, this.props);
  }
}
