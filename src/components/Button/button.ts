import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  label: string;
  events: () => void;
}
export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
