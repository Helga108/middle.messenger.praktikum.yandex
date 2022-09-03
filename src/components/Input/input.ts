import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  events: object;
  blur: () => void;
  focus: () => void;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
    this.props.value = "";
    this.props.events = {
      change: () => this.onChange(),
      focus: props.focus,
      blur: () => props.blur(),
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    //this.props.value = this.element?.lastElementChild?.value;
    console.log(this.props.value);
  }

  onFocus(ev: Event) {
    console.log(ev);
    // if error was there, clear it
  }

  // onBlur(ev: Event) {
  //   //validate field
  //   this.validate();
  // }

  validate() {
    //take value
    const pattern = new RegExp([0 - 9]);
    if (pattern.test(this.props.value)) {
      return;
    } else {
      console.log(this.element?.nextElementSibling);
      //classList.add('visible')
    }
    //evaluate against pattern
    //if true => do nothing
    //if false => show error message
  }

  render() {
    return this.compile(template, this.props);
  }
}
