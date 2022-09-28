import Block from "../../utils/Block";
import template from "./labeledInput.hbs";
import ErrorText from "../ErrorText/errorText";

interface LabeledInputProps {
  name: string;
  label: string;
  type: string;
  events?: object;
  error?: boolean;
  errorText?: string;
  errorVisibilityClass?: string;
  validationPattern?: string;
  value: string;
}

export default class LabeledInput extends Block<LabeledInputProps> {
  constructor(props: LabeledInputProps) {
    super(props);
    this.props.events = {
      change: (e: Event) => this.onChange(e),
      focusin: () => this.onFocus(),
      focusout: () => this.onBlur(),
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  init() {
    this.children.errorMessage = new ErrorText({
      errorText: this.props.errorText,
      error: this.props.error,
      errorVisibilityClass: "error-hidden",
    });
  }

  public getInputValue() {
    return this.props.value;
  }

  getName(): string {
    return this.props.name;
  }

  onFocus() {
    this.children.errorMessage.setProps({
      errorVisibilityClass: "error-hidden",
    });
  }

  onBlur() {
    const validatationResult = this.validate();
    if (!validatationResult) {
      this.children.errorMessage.setProps({
        errorVisibilityClass: "error-visible",
      });
    }
  }

  public validate() {
    const pattern = this.props.validationPattern || "";
    const reg = new RegExp(pattern);
    const res = reg.test(this.props.value);
    return res;
  }

  onChange(e: Event) {
    this.setProps({ value: (e.target as HTMLInputElement).value });

    this.children.errorMessage.setProps({
      errorVisibilityClass: "error-hidden",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
