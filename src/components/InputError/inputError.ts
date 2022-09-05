import Block from "../../utils/Block";
import template from "./inputError.hbs";

interface InputErrorProps {
  errorText: string;
  error: boolean;
  errorVisibilityClass: string;
}

export default class InputError extends Block {
  constructor(props: InputErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
