import Block from "../../utils/Block";
import template from "./editUserSettings.hbs";
import Button from "../../components/Button/button";
import settingsForm from "../../components/SettingsForm/settingsForm";
import nameIcon from "../../../static/icons/name.svg";
import atIcon from "../../../static/icons/at.svg";
import loginIcon from "../../../static/icons/login.svg";
import mailIcon from "../../../static/icons/mail.svg";
import phoneIcon from "../../../static/icons/phone.svg";
import { validationPatternsLib as validation } from "../../utils/ValidationPatternsLib";
import SettingsForm from "../../components/SettingsForm/settingsForm";

interface EditUserSettingsProps {
  title: string;
}
export default class EditUserSettings extends Block {
  constructor(props: EditUserSettingsProps) {
    super(props);
  }

  init() {
    this.children.inputName = new settingsForm({
      icon: nameIcon,
      label: "Name",
      value: "Packman",
      type: "text",
      validationPattern: validation.username,
      errorText: "Wrong name",
    });
    this.children.inputLastName = new settingsForm({
      icon: nameIcon,
      label: "Last name",
      value: "Packmanovich",
      type: "text",
      validationPattern: validation.username,
      errorText: "Wrong last name",
    });
    this.children.inputHandle = new settingsForm({
      icon: atIcon,
      label: "Handle",
      value: "pkmn",
      type: "text",
      validationPattern: validation.login,
      errorText: "Wrong handle",
    });
    this.children.inputLogin = new settingsForm({
      icon: loginIcon,
      label: "pkmnLogin",
      value: "pkmn",
      type: "text",
      validationPattern: validation.login,
      errorText: "Wrong login",
    });
    this.children.inputEmail = new settingsForm({
      icon: mailIcon,
      label: "Email",
      value: "pkmn@prtnml.com",
      type: "text",
      validationPattern: validation.email,
      errorText: "Wrong email",
    });
    this.children.inputPhone = new settingsForm({
      icon: phoneIcon,
      label: "Phone",
      value: "pkmn@prtnml.com",
      type: "text",
      validationPattern: validation.phone,
      errorText: "Wrong phone",
    });
    this.children.buttonSave = new Button({
      label: "Save changes",
      events: {
        click: (e: Event) => this.submitChanges(e),
      },
    });
    this.children.buttonCancel = new Button({
      label: "Cancel",
    });
  }

  submitChanges(e: Event) {
    e.preventDefault();

    const formResult: any = {};

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof SettingsForm) {
        (this.children[child] as SettingsForm).validate();
      }
    });

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof SettingsForm) {
        formResult[(this.children[child] as SettingsForm).getLabel()] = (
          this.children[child] as SettingsForm
        ).getInputValue();
      }
    });

    console.log(formResult);
  }

  render() {
    return this.compile(template, this.props);
  }
}
