import Block from "../../utils/Block";
import template from "./settingsFormInput.hbs";
import LabeledInput from "../LabeledInput/labeledInput";

interface SettingsFormInputProps {
  icon: string;
  label: string;
  value: string;
  inputClass?: string;
  type: string;
  validationPattern: string;
  errorText: string;
  name: string;
  errorVisibilityClass?: string;
}

export default class SettingsFormInput extends Block<SettingsFormInputProps> {
  constructor(props: SettingsFormInputProps) {
    super(props);
  }

  init() {
    this.children.input = new LabeledInput({
      name: this.props.name,
      type: this.props.type,
      errorText: this.props.errorText,
      errorVisibilityClass: this.props.errorVisibilityClass,
      validationPattern: this.props.validationPattern,
      label: "",
      value: this.props.value,
    });
  }

  getInputValue(): string {
    return (this.children.input as LabeledInput).getInputValue();
  }

  getName(): string {
    return this.props.name;
  }

  validate(): boolean {
    return (this.children.input as LabeledInput).validate();
  }

  render() {
    return this.compile(template, this.props);
  }
}
