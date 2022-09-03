import Block from "../../utils/Block";
import template from "./labeledInput.hbs";

interface LabeledInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  events: object;
  error: boolean;
  errorText: true;
  errorVisibilityClass: string;
}

export default class LabeledInput extends Block {
  constructor(props: LabeledInputProps) {
    super(props);
    this.props.value = "";
    this.props.events = {
      // change: () => this.onChange(),
      focusin: () => this.onFocus(),
      focusout: () => this.onBlur(),
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    console.log("error", this.props.error);
    this.setProps({ errorVisibilityClass: "aaaaaaa" });
  }

  onBlur() {
    console.log("bluer event");
    this.props.error = true;

    this.props.errorVisibilityClass = "errorHidden";
    this.element?.firstElementChild?.classList.add("errorHidden");
    this.element?.firstElementChild?.classList.remove("errorVisible");
    console.log(this.props.errorVisibilityClass);
  }

  render() {
    return this.compile(template, this.props);
  }
}
