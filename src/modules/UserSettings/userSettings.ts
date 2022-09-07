import Block from "../../utils/Block";
import template from "./userSettings.hbs";
import Button from "../../components/Button/button";
import ProfileInfo from "../../components/ProfileInfo/profileInfo";
import nameIcon from "../../../static/icons/name.svg";
import atIcon from "../../../static/icons/at.svg";
import loginIcon from "../../../static/icons/login.svg";
import mailIcon from "../../../static/icons/mail.svg";
import phoneIcon from "../../../static/icons/phone.svg";

interface UserSettingsProps {
  title: string;
  name: string;
  phone: string;
  handle: string;
  avatar: string;
}
export default class UserSettings extends Block {
  constructor(props: UserSettingsProps) {
    super(props);
  }

  init() {
    this.children.infoName = new ProfileInfo({
      icon: nameIcon,
      label: "Name",
      value: "Packman",
    });
    this.children.infoLastName = new ProfileInfo({
      icon: nameIcon,
      label: "Last name",
      value: "Packmanovich",
    });
    this.children.infoHandle = new ProfileInfo({
      icon: atIcon,
      label: "Handle",
      value: "@pkmn",
    });
    this.children.infoLogin = new ProfileInfo({
      icon: loginIcon,
      label: "pkmnLogin",
      value: "pkmn",
    });
    this.children.infoEmail = new ProfileInfo({
      icon: mailIcon,
      label: "Email",
      value: "pkmn@prtnml.com",
    });
    this.children.infoPhone = new ProfileInfo({
      icon: phoneIcon,
      label: "+13334214",
      value: "pkmn@prtnml.com",
    });
    this.children.buttonEdit = new Button({
      label: "Edit profile",
    });
    this.children.buttonNewPassword = new Button({
      label: "New password",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
