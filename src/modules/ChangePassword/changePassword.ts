import Block from "../../utils/Block";
import template from "./changePassword.hbs";
import Button from "../../components/Button/button";
import settingsFormInput from "../../components/SettingsFormInput/settingsFormInput";
import lockIcon from "../../../static/icons/lock.svg";
import { VALIDATION_PATTERN_LIB as validation } from "../../utils/ValidationPatternsLib";
import SettingsFormInput from "../../components/SettingsFormInput/settingsFormInput";
import { submitForm } from "../../utils/SubmitForm";

interface ChangePasswordProps {
  title: string;
}
export default class ChangePassword extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super(props);
  }

  init() {
    this.children.inputPassword = new settingsFormInput({
      icon: lockIcon,
      label: "Old password",
      value: "",
      type: "password",
      validationPattern: validation.password,
      errorText: "Wrong password",
      name: "old-password",
    });
    this.children.inputRepeatPassword = new settingsFormInput({
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
        click: (e: Event) => this.submitChanges(e, this.children),
      },
    });
    this.children.buttonCancel = new Button({
      label: "Cancel",
    });
  }

  submitChanges = (e: Event, children: any) =>
    submitForm(e, children, SettingsFormInput);

  render() {
    return this.compile(template, this.props);
  }
}
