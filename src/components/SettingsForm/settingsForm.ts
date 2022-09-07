import Block from "../../utils/Block";
import template from "./settingsForm.hbs";
import LabeledInput from "../LabeledInput/labeledInput";

interface SettingsFormProps {
  icon: string;
  label: string;
  value: string;
  inputClass?: string;
  type: string;
  validationPattern: string;
  errorText: string;
  name?: string;
  errorVisibilityClass?: string;
}

export default class SettingsForm extends Block {
  constructor(props: SettingsFormProps) {
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
    });
  }

  getInputValue(): string {
    return (this.children.input as LabeledInput).getInputValue();
  }

  getLabel(): string {
    return this.props.label;
  }

  validate(): boolean {
    return (this.children.input as LabeledInput).validate();
  }

  render() {
    return this.compile(template, this.props);
  }
}
