import Block from "../../utils/Block";
import template from "./changePassword.hbs";
import Button from "../../components/Button/button";
import settingsForm from "../../components/SettingsForm/settingsForm";
import lockIcon from "../../../static/icons/lock.svg";
import { validationPatternsLib as validation } from "../../utils/ValidationPatternsLib";
import SettingsForm from "../../components/SettingsForm/settingsForm";

interface ChangePasswordProps {
  title: string;
}
export default class ChangePassword extends Block {
  constructor(props: ChangePasswordProps) {
    super(props);
  }

  init() {
    this.children.inputPassword = new settingsForm({
      icon: lockIcon,
      label: "Old password",
      value: "",
      type: "password",
      validationPattern: validation.password,
      errorText: "Wrong password",
      name: "old-password",
    });
    this.children.inputRepeatPassword = new settingsForm({
      name: "new-password",
      icon: lockIcon,
      label: "New password",
      value: "",
      type: "password",
      validationPattern: validation.password,
      errorText: "Wrong password",
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
