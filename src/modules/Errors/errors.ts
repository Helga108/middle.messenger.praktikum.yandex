import Block from "../../utils/Block";
import template from "./errors.hbs";
import ErrorPage from "../../components/Error/error";

interface ErrorsPageProps {
  code: string;
  text: string;
  backLink: string;
  backLinkText: string;
}

export default class ErrorsPage extends Block {
  constructor(props: ErrorsPageProps) {
    super(props);
  }

  init() {
    this.children.error = new ErrorPage({
      code: this.props.code,
      text: this.props.text,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
