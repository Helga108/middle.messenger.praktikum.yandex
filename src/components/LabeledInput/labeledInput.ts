import Block from "../../utils/Block";
import template from "./labeledInput.hbs";
import InputError from "../InputError/inputError";

interface LabeledInputProps {
  name: string;
  label: string;
  type: string;
  events?: object;
  error?: boolean;
  errorText?: string;
  errorVisibilityClass?: string;
  validationPattern?: string;
}

export default class LabeledInput extends Block {
  value: string = "";

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
    this.children.errorMessage = new InputError({
      errorText: this.props.errorText,
      error: this.props.error,
      errorVisibilityClass: "errorHidden",
    });
  }

  getInputValue() {
    return this.value;
  }

  onFocus() {
    this.children.errorMessage.setProps({
      errorVisibilityClass: "errorHidden",
    });
  }

  onBlur() {
    const validatationResult = this.validate();
    if (!validatationResult) {
      this.children.errorMessage.setProps({
        errorVisibilityClass: "errorVisible",
      });
    }
  }

  validate() {
    const reg = new RegExp(this.props.validationPattern);
    const res = reg.test(this.value);
    console.log("regextest", res);
    return res;
  }

  onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.children.errorMessage.setProps({
      errorVisibilityClass: "errorHidden",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
