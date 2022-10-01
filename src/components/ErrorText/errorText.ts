import Block from "../../utils/Block";
import template from "./errorText.hbs";

interface ErrorTextProps {
  errorText?: string;
  error?: boolean;
  errorVisibilityClass: string;
}

export default class ErrorText extends Block<ErrorTextProps> {
  constructor(props: ErrorTextProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
