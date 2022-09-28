import Block from "../../utils/Block";
import template from "./signup.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";
import { VALIDATION_PATTERN_LIB } from "../../utils/ValidationPatternsLib";
import { formData } from "../../utils/formData";
import AuthController from "../../controllers/AuthController";
import ChatsController from "../../controllers/ChatsController";

export default class Signup extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  init() {
    this.children.inputEmail = new LabeledInput({
      name: "email",
      type: "text",
      label: "Email",
      events: {
        click: () => console.log("Email event"),
      },
      error: false,
      errorText: "Wrong email",
      validationPattern: VALIDATION_PATTERN_LIB.email,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputLogin = new LabeledInput({
      name: "login",
      type: "text",
      label: "Login",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong login",
      validationPattern: VALIDATION_PATTERN_LIB.login,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputName = new LabeledInput({
      name: "first_name",
      type: "text",
      label: "Name",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong name",
      validationPattern: VALIDATION_PATTERN_LIB.username,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputLastName = new LabeledInput({
      name: "second_name",
      type: "text",
      label: "Last name",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong last name",
      validationPattern: VALIDATION_PATTERN_LIB.username,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputPhone = new LabeledInput({
      name: "phone",
      type: "text",
      label: "Phone",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong phone",
      validationPattern: VALIDATION_PATTERN_LIB.phone,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputPassword = new LabeledInput({
      name: "password",
      type: "password",
      label: "Password",
      events: {
        click: () => console.log("password event"),
      },
      error: false,
      errorText: "Wrong password",
      validationPattern: VALIDATION_PATTERN_LIB.password,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.inputRepeatPassword = new LabeledInput({
      name: "repeat-password",
      type: "password",
      label: "Repeat password",
      events: {
        click: () => console.log("password event"),
      },
      error: false,
      errorText: "Wrong password",
      validationPattern: VALIDATION_PATTERN_LIB.password,
      errorVisibilityClass: "",
      value: "",
    });
    this.children.button = new Button({
      label: "Create account",
      events: {
        click: (e: Event) => this.submitSignupForm(e, this.children),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  submitSignupForm = (e: Event, children: any) => {
    const data = formData(e, children, LabeledInput);
    AuthController.signup(data);
    ChatsController.fetchCats();
  };
}
