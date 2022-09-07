import Block from "../../utils/Block";
import template from "./signup.hbs";
import Button from "../../components/Button/button";
import LabeledInput from "../../components/LabeledInput/labeledInput";
import { validationPatternsLib } from "../../utils/ValidationPatternsLib";

interface SignupProps {
  title: string;
}
export default class Signup extends Block {
  constructor(props: SignupProps) {
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
      validationPattern: validationPatternsLib.email,
      errorVisibilityClass: "",
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
      validationPattern: validationPatternsLib.login,
      errorVisibilityClass: "",
    });
    this.children.inputName = new LabeledInput({
      name: "name",
      type: "text",
      label: "Name",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong name",
      validationPattern: validationPatternsLib.username,
      errorVisibilityClass: "",
    });
    this.children.inputLastName = new LabeledInput({
      name: "last-name",
      type: "text",
      label: "Last name",
      events: {
        click: () => console.log("login event"),
      },
      error: false,
      errorText: "Wrong last name",
      validationPattern: validationPatternsLib.username,
      errorVisibilityClass: "",
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
      validationPattern: validationPatternsLib.phone,
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
    this.children.inputRepeatPassword = new LabeledInput({
      name: "repeat-password",
      type: "password",
      label: "Repeat password",
      events: {
        click: () => console.log("password event"),
      },
      error: false,
      errorText: "Wrong password",
      validationPattern: validationPatternsLib.password,
      errorVisibilityClass: "",
    });
    this.children.button = new Button({
      label: "Create account",
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

    const formResult: any = {};

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof LabeledInput) {
        (this.children[child] as LabeledInput).validate();
      }
    });

    Object.keys(this.children).forEach((child) => {
      if (this.children[child] instanceof LabeledInput) {
        formResult[(this.children[child] as LabeledInput).getName()] = (
          this.children[child] as LabeledInput
        ).getInputValue();
      }
    });

    console.log(formResult);
  }
}
