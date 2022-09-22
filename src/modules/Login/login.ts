import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";
import { VALIDATION_PATTERN_LIB } from "../../utils/ValidationPatternsLib";
import { formData } from "../../utils/formData";
import AuthController from "../../controllers/AuthController";

export default class Login extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  init() {
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
    });
    this.children.button = new Button({
      label: "Log in",
      events: {
        click: (e: Event) => this.submitLoginForm(e, this.children),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  submitLoginForm = (e: Event, children: any) => {
    const data = formData(e, children, LabeledInput);
    AuthController.signin(data);
  };
}
