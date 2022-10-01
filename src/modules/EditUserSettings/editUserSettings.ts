import Block from "../../utils/Block";
import template from "./editUserSettings.hbs";
import Button from "../../components/Button/button";
import settingsFormInput from "../../components/SettingsFormInput/settingsFormInput";
import nameIcon from "../../../static/icons/name.svg";
import atIcon from "../../../static/icons/at.svg";
import loginIcon from "../../../static/icons/login.svg";
import mailIcon from "../../../static/icons/mail.svg";
import phoneIcon from "../../../static/icons/phone.svg";
import { VALIDATION_PATTERN_LIB as validation } from "../../utils/ValidationPatternsLib";
import { formData } from "../../utils/formData";
import { withStore } from "../../utils/Store";
import { UserData } from "../../api/UserAPI";
import UserController from "../../controllers/UserController";

interface EditUserSettingsProps {
  title: string;
}
class EditUserSettingsBase extends Block<EditUserSettingsProps> {
  constructor(props: EditUserSettingsProps) {
    super(props);
  }

  init() {
    this.children.inputName = new settingsFormInput({
      name: "first_name",
      icon: nameIcon,
      label: "Name",
      value: this.props.first_name,
      type: "text",
      validationPattern: validation.username,
      errorText: "Wrong name",
    });
    this.children.inputLastName = new settingsFormInput({
      name: "second_name",
      icon: nameIcon,
      label: "Last name",
      value: this.props.second_name,
      type: "text",
      validationPattern: validation.username,
      errorText: "Wrong last name",
    });
    this.children.inputHandle = new settingsFormInput({
      name: "display_name",
      icon: atIcon,
      label: "Full name",
      value: this.props.display_name,
      type: "text",
      validationPattern: validation.login,
      errorText: "Wrong handle",
    });
    this.children.inputLogin = new settingsFormInput({
      name: "login",
      icon: loginIcon,
      label: "Login",
      value: this.props.login,
      type: "text",
      validationPattern: validation.login,
      errorText: "Wrong login",
    });
    this.children.inputEmail = new settingsFormInput({
      name: "email",
      icon: mailIcon,
      label: "Email",
      value: this.props.email,
      type: "text",
      validationPattern: validation.email,
      errorText: "Wrong email",
    });
    this.children.inputPhone = new settingsFormInput({
      name: "phone",
      icon: phoneIcon,
      label: "Phone",
      value: this.props.phone,
      type: "text",
      validationPattern: validation.phone,
      errorText: "Enter a valid phone number",
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

  async submitChanges(e: Event, children: any) {
    const data: UserData = formData(e, children, settingsFormInput);
    console.log(data);
    UserController.updateProfile(data);
  }

  render() {
    console.log(this.props);
    return this.compile(template, this.props);
  }
}
const withUser = withStore((state) => ({ ...state.user }));
export const EditUserSettings = withUser(EditUserSettingsBase as typeof Block);
