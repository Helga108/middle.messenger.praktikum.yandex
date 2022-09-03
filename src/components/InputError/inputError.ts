import Block from "../../utils/Block";
import template from "./inputError.hbs";

interface InputErrorProps {
  errorText: string;
  error: boolean;
}

export default class InputError extends Block {
  constructor(props: InputErrorProps) {
    super(props);
    // if (props.error) {
    //   this.show();
    // } else {
    //   this.hide();
    // }
  }

  render() {
    return this.compile(template, this.props);
  }
}
