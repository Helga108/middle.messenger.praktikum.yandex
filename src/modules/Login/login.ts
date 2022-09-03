import Block from "../../utils/Block";
import template from "./login.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";
import InputError from "../../components/InputError/inputError";
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
      value: "",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong login",
    });
    this.children.inputPassword = new LabeledInput({
      name: "password",
      type: "password",
      label: "Password",
      value: "",
      events: {
        click: () => console.log("password event"),
      },
      error: false,
      errorText: "Wrong password",
    });
    this.children.button = new Button({
      label: "Log in",
      events: {
        click: this.submitLiginForm,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  submitLiginForm() {
    const loginValue = this.children.inputLogin.props.value;
    const passwordValue = this.children.inputPassword.props.value;
    console.log("Clicked!!!!", loginValue, passwordValue);
  }
}
