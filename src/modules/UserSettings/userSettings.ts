import Block from "../../utils/Block";
import template from "./userSettings.hbs";
import Button from "../../components/Button/button";
import ProfileInfo from "../../components/ProfileInfo/profileInfo";
import nameIcon from "../../../static/icons/name.svg";
import atIcon from "../../../static/icons/at.svg";
import loginIcon from "../../../static/icons/login.svg";
import mailIcon from "../../../static/icons/mail.svg";
import phoneIcon from "../../../static/icons/phone.svg";
import { withStore } from "../../utils/Store";
import Router from "../../utils/Router";

interface UserSettingsProps {
  title: string;
  name: string;
  phone: string;
  handle: string;
  avatar: string;
}
class UserSettingsBase extends Block<UserSettingsProps> {
  constructor(props: UserSettingsProps) {
    super(props);
  }

  init() {
    this.children.infoName = new ProfileInfo({
      icon: nameIcon,
      label: "Name",
      value: this.props.first_name,
    });
    this.children.infoLastName = new ProfileInfo({
      icon: nameIcon,
      label: "Last name",
      value: this.props.second_name,
    });
    this.children.infoHandle = new ProfileInfo({
      icon: atIcon,
      label: "Full name",
      value: this.props.display_name,
    });
    this.children.infoLogin = new ProfileInfo({
      icon: loginIcon,
      label: "Login",
      value: this.props.login,
    });
    this.children.infoEmail = new ProfileInfo({
      icon: mailIcon,
      label: "Email",
      value: this.props.email,
    });
    this.children.infoPhone = new ProfileInfo({
      icon: phoneIcon,
      label: "Phone",
      value: this.props.phone,
    });
    this.children.buttonEdit = new Button({
      label: "Edit profile",
      events: {
        click: () => {
          Router.go("/editusersettings");
        },
      },
    });
    this.children.buttonNewPassword = new Button({
      label: "New password",
      events: {
        click: () => {
          Router.go("/change-password");
        },
      },
    });
  }

  render() {
    console.log("+++", this.props);
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const UserSettings = withUser(UserSettingsBase as typeof Block);
