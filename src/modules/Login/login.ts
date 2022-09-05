import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";
import { validationPatternsLib } from "../../utils/ValidationPatternsLib";

interface LoginProps {
  title: string;
}
export default class Login extends Block {
  constructor(props: LoginProps) {
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
      validationPattern: validationPatternsLib.login,
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
      validationPattern: validationPatternsLib.password,
      errorVisibilityClass: "",
    });
    this.children.button = new Button({
      label: "Log in",
      events: {
        click: (e: Event) => this.submitLiginForm(e),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  submitLiginForm(e: Event) {
    e.preventDefault();

    const formResult = {};

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof LabeledInput) {
        this.children[child].validate(this.children[child].getInputValue());
      }
    });

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof LabeledInput) {
        formResult[this.children[child].props.name] =
          this.children[child].getInputValue();
      }
    });

    console.log(formResult);
  }
}
