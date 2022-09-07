import Block from "../../utils/Block";
import template from "./error.hbs";

interface ErrorPageProps {
  code: string;
  text: string;
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
